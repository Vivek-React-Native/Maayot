import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import IAP from 'react-native-iap'
import { useDispatch, useSelector } from 'react-redux'
import di from '@di'
import { navigationRoutes, screenConst } from '@frameworks/mobile/utils/const'
import useNavigation from '@frameworks/mobile/navigations/useNavigation'
import {
    IProfileEntity,
    membershipType
} from '@domains/entities/interfaces/iProfile'
import useMemberShip from '@frameworks/mobile/hooks/useMembership'
import { IIAPReceiptEntity } from '@domains/entities/interfaces/iIAP'
import { IFailureAPI } from '@adapters/infrastructures/interfaces/iHttp'
import { usePlatform } from '@frameworks/mobile/hooks/usePlatform'
import branch, { BranchEvent } from 'react-native-branch'

export type IAPItemsType = 'free' | 'standard' | 'premium'
type TAndroidReceipt = {
    purchaseToken: string
    orderId: string
    purchaseTime: number
    productId: string
    packageName: string
}
type subscriptionType = {
    productId: string
}
const items = Platform.select({
    ios: ['free', 'standard'],
    android: ['free', 'standard']
})
let purchaseUpdatedListener: any
let purchaseErrorListener: any
const useIAP = () => {
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { isIos } = usePlatform()
    const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false)
    const [connected, setConnected] = useState<boolean>(false)
    const [purchased, setPurchase] = useState(false)
    const [productsMap, setProductsMap] = useState<any>({})
    const { displayName } = useMemberShip()
    const profileState = useSelector((state: any) => state.profile)
    const { profile } = profileState || {}
    const validateReceipt = async (receipt: string) => {
        if (profile?.id) {
            try {
                let verifyReceipt: IIAPReceiptEntity | IFailureAPI
                if (isIos) {
                    verifyReceipt = await di.iap.verifyReceipt(
                        profile.id,
                        receipt as string
                    )
                    let buo = await branch.createBranchUniversalObject(
                    'Subscription',
                    {
                        locallyIndex: true
                    })
                    new BranchEvent(BranchEvent.Subscribe, buo, {
                        ProfileID: profile.id,
                        receipt: receipt as string,
                    }).logEvent()
                } else {
                    const androidReceiptObj: TAndroidReceipt = JSON.parse(
                        receipt
                    )
                    const {
                        purchaseToken,
                        orderId,
                        purchaseTime,
                        productId,
                        packageName
                    } = androidReceiptObj
                    verifyReceipt = await di.iap.verifyAndroidReceipt(
                        profile.id,
                        purchaseToken,
                        orderId,
                        purchaseTime,
                        productId,
                        packageName
                    )

                    let buo = await branch.createBranchUniversalObject(
                    'Subscription',
                    {
                        locallyIndex: true
                    })
                    new BranchEvent(BranchEvent.Subscribe, buo, {
                        ProfileID: profile.id,
                        purchaseToken: purchaseToken,
                        orderId: orderId,
                        purchaseTime: purchaseTime,
                        productId: productId,
                        packageName: packageName
                    }).logEvent()
                }
                console.log('verifyReceipt', verifyReceipt)
                setPurchaseLoading(false)
                if (
                    verifyReceipt &&
                    (verifyReceipt as IIAPReceiptEntity).isValid &&
                    (verifyReceipt as IIAPReceiptEntity).productId ===
                        'standard'
                ) {
                    //@ts-ignore
                    handlePurchaseSuccess(verifyReceipt.productId)
                } else {
                    console.log(
                        'receipt purchaseUpdatedListener free',
                        verifyReceipt
                    )
                    handlePurchaseSuccess('free')
                }
            } catch (e) {
                setPurchaseLoading(false)
                return false
            }
        }
        setPurchaseLoading(false)
        return false
    }

    const redirectToHome = () => {
        navigate(navigationRoutes.NAVIGATION_MAIN_PATH, {
            screen: screenConst.HOME
        })
    }

    const handlePurchaseSuccess = (productId: IAPItemsType) => {
        setPurchase(true)
        let membershipName: membershipType = 'maayot Free'
        switch (productId) {
            case 'free':
                break
            case 'standard':
                membershipName = 'maayot Standard'
                break
            case 'premium':
                membershipName = 'maayot Premium'
                break
        }

        dispatch(di.session.setMembershipName(membershipName))
        if (productId === 'free') {
            // redirectToHome()
            return
        } else {
            redirectToHome()
        }
    }

    useEffect(() => {
        const removeListener = () => {
            if (purchaseUpdatedListener) {
                purchaseUpdatedListener.remove()
                purchaseUpdatedListener = null
            }
            if (purchaseErrorListener) {
                purchaseErrorListener.remove()
                purchaseErrorListener = null
            }
        }
        removeListener()
        const init = async () => {
            try {
                await IAP.endConnection()
                await IAP.initConnection()
                //@ts-ignore
                const result = await IAP.getSubscriptions(items)
                console.log('===PRODUCT==CONNECTED', result)
                setConnected(true)
                const map: {} = {}
                if (result) {
                    result.forEach((subscription: subscriptionType) => {
                        // @ts-ignore
                        map[subscription.productId] = subscription
                    })
                    setProductsMap(map)
                }
            } catch (e) {
                console.error('connect error', e)
            }
            purchaseUpdatedListener = IAP.purchaseUpdatedListener(
                (purchase: any) => {
                    try {
                        console.info('Call IAP:verify be')
                        IAP.clearTransactionIOS()
                        const receipt = purchase.transactionReceipt
                        validateReceipt(receipt)
                        console.log('receipt finish', purchase.transactionId)
                        IAP.finishTransaction(purchase)
                        IAP.finishTransactionIOS(purchase.transactionId)
                    } catch (e) {
                        setPurchaseLoading(false)
                        console.error('receipt error', e)
                        IAP.finishTransaction(purchase)
                        IAP.finishTransactionIOS(purchase.transactionId)
                    }
                }
            )

            purchaseErrorListener = IAP.purchaseErrorListener((errorEvent) => {
                setPurchaseLoading(false)
                if (errorEvent.responseCode == 2) {
                    //User cancel
                } else {
                    console.error('receipt error', errorEvent.responseCode)
                    Alert.alert(
                        'Payment error',
                        'There has an error with your purchase, error code =' +
                            errorEvent.responseCode
                    )
                }
            })
        }
        init()
    }, [])

    const requestSubscription = async (product: IAPItemsType) => {
        await IAP.clearTransactionIOS()
        if (product === 'free') {
            if (isIos) {
                await Linking.openURL(
                    'https://apps.apple.com/account/subscriptions'
                )
            }
        } else {
            setPurchaseLoading(true)
            console.log('receipt requestSubscription', product)
            return IAP.requestSubscription(product)
        }
    }
    return {
        connected,
        purchaseLoading,
        requestSubscription,
        productsMap,
        purchased
    }
}

export default useIAP
