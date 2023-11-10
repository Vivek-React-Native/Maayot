import React, {useEffect, useState} from 'react'
import {Alert, Dimensions, SafeAreaView, ScrollView, View} from "react-native";
import useTheme from "../../../themes/useTheme";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import Card from "@frameworks/mobile/components/commons/Card";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import styles from './styles';
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useMemberShip from "@frameworks/mobile/hooks/useMembership";
import {
  FeatureList,
  FreePlanFeatures,
  IAPProductConst,
  memberTypeConst,
  StandardPlanFeatures
} from "@frameworks/mobile/utils/const";
import {CheckedIcon, EyeIcon} from "@frameworks/mobile/icons";
import useIAP, {IAPItemsType} from "@frameworks/mobile/hooks/useIAP";
//@ts-ignore
import Spinner from "react-native-loading-spinner-overlay";

type ICompareHeaderProps = {
  title: string,
  isCurrent?: boolean
  price: string,
}
const CompareHeader: React.FC<ICompareHeaderProps> = (props: ICompareHeaderProps) => {
  const {
    title,
    isCurrent = false,
    price
  } = props;
  return <View style={[
    commonStyles.center,
    {height: 70,}
  ]}
  >
    {isCurrent && <MaayotText
      color={'primary'}
      fontWeight="regular"
      size="tiny11"
      style={styles.compareFeatureCurrent}
    >
      {`Current`}
    </MaayotText>
    }
    <MaayotText
      color={'gray2'}
      fontWeight="regular"
      size="smaller14"
      style={styles.compareFeatureText}
    >
      {title}
    </MaayotText>
    <MaayotText
      color={'gray1'}
      fontWeight="bold"
      size="normal18"
      style={styles.compareFeatureText}
    >
      {price}
    </MaayotText>
  </View>
}
type membershipViewType = 'free' | 'standard' | 'premium';
const ComparePlan: React.FC = () => {
  const theme = useTheme()
  const {
    name,
    displayName,
    isFree,
    isStandard,
    isPremium,
  } = useMemberShip();
  const [stateType, setStateType] = useState<membershipViewType>('free');
  useEffect(() => {
    if(name) {
      let type:membershipViewType = 'free';
      switch (name) {
        case memberTypeConst.PREMIUM.toLowerCase():
          type = 'premium'
          break
        case memberTypeConst.SCHOOL.toLowerCase():
        case memberTypeConst.STANDARD.toLowerCase():
          type = 'standard'
          break
        case memberTypeConst.FREE.toLowerCase():
          type = 'free'
          break
      }
      setStateType(type);
    }
  },[name])
  const {
    requestSubscription,
    productsMap,
    connected: IAPConnected,
    purchaseLoading
  } = useIAP();


  useEffect(() => {
    // console.log('products',productsMap);
  },[productsMap])

  const handleContinuePress =  (subscriptionType: IAPItemsType) => {
    return requestSubscription(subscriptionType)
  }

  const changeViewType = (type:membershipViewType) => {
    if(isFree) {
      //allow change when free
      setStateType(type)
    }
  }

  return (<SafeAreaView style={[
      commonStyles.fullHeight,
      {backgroundColor: theme.colors.lightest}]
    }>
      <Spinner
        visible={purchaseLoading}
        textContent={'Loading...'}
        textStyle={commonStyles.spinnerTextStyle}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
      />
      <Card
        style={commonStyles.card}
        styleContainer={{
          ...commonStyles.cardContainer, paddingRight: 0
        }}
      >
        <View style={commonStyles.fullWidth}>
          <ScrollView style={{
            maxHeight: Dimensions.get('window').height - 200,
          }}>
            <View style={[commonStyles.flxRow,{paddingVertical: 10, paddingRight: 16}]}>
              <View style={[
                styles.ceilElementNoBorder,
                {width: `${100 - Object.keys(productsMap).length * 20}%`}
              ]}>
                <CompareHeader
                  title={''}
                  price={''}
                />
                {FeatureList.map((feature: any, index: number) => {
                  return <View  key={index} style={styles.ceilElement}
                  >
                    <MaayotText
                      color={'primary3'}
                      fontWeight="regular"
                      size="smaller14"
                      style={styles.compareFeatureText}
                    >
                      {feature.label}
                    </MaayotText>
                  </View>
                })
                }
              </View>
              {
                productsMap[IAPProductConst.FREE] && <View style={[
                  styles.ceilElementNoBorder,
                  styles.columnView,
                  stateType === 'free'? styles.withShadow: {},
                ]}
                >
                  <CompareHeader
                    title={productsMap[IAPProductConst.FREE].title}
                    price={productsMap[IAPProductConst.FREE].localizedPrice}
                    isCurrent={stateType === 'free'}
                  />
                  {
                    FeatureList.map((feature: any, index: number) => {
                      return <View style={[
                        commonStyles.center,
                        styles.ceilElement
                      ]}
                       key={index}
                      >
                        {
                          FreePlanFeatures[index]?.checked &&
                          <CheckedIcon fill={'primary'} bgColor={'lightest'}/>
                          || null
                        }
                      </View>
                    })
                  }
                  <View style={commonStyles.center}>
                    <MayotButton
                      onPress={() => changeViewType('free')}
                      color={'primary'}
                      bgColor={'lightest'}
                      size={'smaller14'}
                      style={styles.compareSelectBtn}
                      fontWeight={'regular'}
                      fontWeightNumber={'600'}
                    >
                      {stateType === 'free' && <CheckedIcon/> || <CheckedIcon bgColor={'gray3'}/>}
                    </MayotButton>
                  </View>
                </View>
              }
              {
                productsMap[IAPProductConst.STANDARD] && <View style={[
                  styles.ceilElementNoBorder,
                  styles.columnView,
                  stateType === 'standard'? styles.withShadow: {},
                ]}
                >
                  <CompareHeader
                    title={productsMap[IAPProductConst.STANDARD].title}
                    price={productsMap[IAPProductConst.STANDARD].localizedPrice}
                    isCurrent={stateType === 'standard'}
                  />
                  {
                    FeatureList.map((feature: any, index: number) => {
                      return <View style={[
                        commonStyles.center,
                        styles.ceilElement
                      ]}
                      >
                        {
                          StandardPlanFeatures[index]?.checked &&
                          <CheckedIcon fill={'primary'} bgColor={'lightest'}/>
                          || null
                        }
                      </View>
                    })
                  }
                  <View style={commonStyles.center}>
                    <MayotButton
                      onPress={() => changeViewType('standard')}
                      color={'primary'}
                      bgColor={'lightest'}
                      size={'smaller14'}
                      style={styles.compareSelectBtn}
                      fontWeight={'regular'}
                      fontWeightNumber={'600'}
                    >
                      {stateType === 'standard' && <CheckedIcon/> || <CheckedIcon bgColor={'gray3'}/>}
                    </MayotButton>
                  </View>
                </View>
              }
              {
                productsMap[IAPProductConst.PREMIUM] && <View style={[
                  styles.ceilElementNoBorder,
                  styles.columnView,
                  stateType === 'premium' ? styles.withShadow: {},
                ]}
                >
                  <CompareHeader
                    title={productsMap[IAPProductConst.PREMIUM].title}
                    price={productsMap[IAPProductConst.PREMIUM].localizedPrice}
                    isCurrent={stateType === 'premium'}
                  />
                  {FeatureList.map((feature: any, index: number) => {
                    return  <View style={[
                      commonStyles.center,
                      styles.ceilElement
                    ]}
                      key={index}
                    >
                      <CheckedIcon fill={'primary'} bgColor={'lightest'}/>
                    </View>
                  })
                  }
                  <View style={commonStyles.center}>
                    <MayotButton
                      onPress={() => changeViewType('premium')}
                      color={'primary'}
                      bgColor={'lightest'}
                      size={'smaller14'}
                      style={styles.compareSelectBtn}
                      fontWeight={'regular'}
                      fontWeightNumber={'600'}
                    >
                      {stateType === 'premium' && <CheckedIcon/> || <CheckedIcon bgColor={'gray3'}/>}
                    </MayotButton>
                  </View>
                </View>
              }
            </View>
          </ScrollView>
        </View>
      </Card>
      {
        <View
          style={styles.btmButton}
        >
          {
            !isFree && <MayotButton
              onPress={() => handleContinuePress('free')}
              label={'Cancel Subscriptions'}
              color={'gray2'}
              bgColor={'lightest'}
              fontWeight={'regular'}
              fontWeightNumber={'600'}
              size='small17'
            />
          }
          {
            isFree && IAPConnected && stateType !== 'free' && <MayotButton
              onPress={() => handleContinuePress(stateType)}
              label={'Upgrade Subscription'}
              size={'small17'}
            />
          }
        </View>
      }
    </SafeAreaView>
  )
}

export default ComparePlan

