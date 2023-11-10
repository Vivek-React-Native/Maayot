import {ColorStrings, FontSizeStrings} from "@frameworks/mobile/themes/MaayotTheme";
import {DevSettings, StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import React, {useCallback, useContext, useEffect} from 'react'

import {BottomUpContext} from "../../../mobile/components";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import MayotButton from "@frameworks/mobile/components/atomic/button";
// @ts-ignore
import Spinner from "react-native-loading-spinner-overlay";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import {mapPeriodConst} from "@frameworks/mobile/utils/const";
import {usePlatform} from "@hooks";

type IUpgradeButtonProps = {
  onPress: any,
  purchaseLoading?: boolean
  bgColor?: ColorStrings,
  label?: string,
  styles?: StyleProp<ViewStyle>,
  size?: FontSizeStrings,
  product: any
}

const UpgradeButton: React.FC<IUpgradeButtonProps> = (props: IUpgradeButtonProps) => {
  const {setShow, setDescription} = useContext<any>(BottomUpContext)
  const {isIos} = usePlatform()
  const {
    label = 'Unlock Now',
    styles: propsStyles,
    onPress,
    bgColor = 'primary',
    size,
    purchaseLoading = false,
    product
  } = props
  const renewalPeriod = product ? mapPeriodConst[product.subscriptionPeriodUnitIOS] : ''
  useEffect(() => {
    if (product) {
      const des = `maayot Standard plan, ${product.localizedPrice} ${renewalPeriod} after the 7-day trial. \n \n You may cancel it anytime from your store settings. \n\n  Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period by going to your iOS Account Settings after purchase. \n\n Payment will be charged to your store account. Any unused portion of free trial period, if offered, will be forfeited when you purchase a subscription.
      \n You agree to our privacy policies and terms and conditions by using our service.`
      setDescription(des)
    }
  }, [product])

  const showBottomSheet = useCallback(() => {
    setShow()
  },[])
  return <View style={[
      propsStyles,
      styles.buttonContainer,
      commonStyles.flxCol,
    ]}>
      <Spinner
        visible={purchaseLoading}
        textContent={'Loading...'}
        textStyle={commonStyles.spinnerTextStyle}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
      />
      <MayotButton
        bgColor={bgColor}
        onPress={onPress}
        label={label}
        style={styles.button}
        size={size || 'small17'}
      />
      {
      isIos && product && <MaayotText
        color={'gray2'}
        fontWeight="regular"
        size="smallest12"
        style={{
          ...commonStyles.center,
          lineHeight: 14,
          marginTop: 5,
        }}
      >
        {
          `7-day trial, renews ${renewalPeriod} at ${product.localizedPrice}`
        }
      </MaayotText>
      || null
      }
      {
        isIos && <MayotButton
        //@ts-ignore
          onPress={showBottomSheet}
          label='see full details'
          color={'primary'}
          bgColor={'lightest'}
          size={'smallest12'}
          fontWeightNumber={'400'}
          style={styles.moreBottomBtn}
          textStyle={{ lineHeight: 21 }}
        />
      }
    </View>
}

const styles = StyleSheet.create({
  viewContainer: {},
  buttonContainer: {
    marginTop: 0,
  },
  button: {
    borderRadius: 10,
    padding: 14,
    paddingHorizontal: 40,
    marginTop: 12,
    width: '100%',
    textAlign: 'center',
  },
  moreBottomBtn: {
    padding: 0,
    marginTop: 3,
    marginLeft: 2
  },
})
export default UpgradeButton
