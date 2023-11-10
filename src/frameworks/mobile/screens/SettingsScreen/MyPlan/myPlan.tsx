import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react'
import {Dimensions, SafeAreaView, ScrollView, View} from "react-native";
import useTheme from "../../../themes/useTheme";
import useNavigation from "@frameworks/mobile/navigations/useNavigation";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import {useDispatch, useSelector} from "react-redux";
import Card from "@frameworks/mobile/components/commons/Card";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import styles from './styles';
import {IProfileEntity, levelType} from "@domains/entities/interfaces/iProfile";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import FeatureItem from "@frameworks/mobile/screens/SettingsScreen/MyPlan/featureItem";
import {
  FreePlanFeatures,
  StandardPlanFeatures,
  PremiumPlanFeatures, navigationRoutes, mapPeriodConst,
} from "@frameworks/mobile/utils/const";
import useMemberShip from "@frameworks/mobile/hooks/useMembership";
import {usePlatform} from "@hooks";
import useIAP from "@frameworks/mobile/hooks/useIAP";
//@ts-ignore
import Spinner from "react-native-loading-spinner-overlay";
import UpgradeButton from "@frameworks/mobile/components/atomic/upgradeButton";

type IPlanProps = {}
const MyPlan: React.FC<IPlanProps> = () => {
  const { isIos } = usePlatform()
  const dispatch = useDispatch()
  const theme = useTheme()
  const {navigate, setOptions} = useNavigation();
  const [activeLevel, setActiveLevel] = useState<levelType>();
  const {
    displayName,
    isFree,
    isStandard,
    isPremium,
  } = useMemberShip();
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )
  useEffect(() => {
    if (profile) {
      setActiveLevel(profile.level)
    }
  }, [profile]);

  const onLevelSelect = (level: levelType): void => {
    setActiveLevel(level);
  };
  const {
    connected: IAPConnected,
    purchaseLoading,
    requestSubscription,
    productsMap,
  } = useIAP();

  const productStandard = useMemo(() => {
    return productsMap['standard']
  },[productsMap]);
  const cancelSubscription = () => {
    return requestSubscription('free')
  }
  const upgradeSubscription = () => {
    return requestSubscription('standard')
  }

  // useLayoutEffect(() => {
  //   isIos && setOptions({
  //     headerRight: () => (
  //       <MayotButton
  //         onPress={() => navigate(navigationRoutes.NAVIGATION_SETTING_COMPARE_PLAN_PATH)}
  //         label={'Compare Plan'}
  //         color={'lightest'}
  //         bgColor={'primary'}
  //         fontWeight={'regular'}
  //         fontWeightNumber={'400'}
  //         size='small17'
  //         style={styles.rightHeader}
  //         textStyle={styles.rightHeaderText}
  //       />
  //     ),
  //   });
  // }, [])

  const handleContinuePress = async () => {
    navigate(navigationRoutes.NAVIGATION_SETTING_COMPARE_PLAN_PATH)
  }

  // @ts-ignore
  return (<SafeAreaView style={[
      commonStyles.fullHeight,
      {backgroundColor: theme.colors.lightest}]
    }>
      <Card
        style={commonStyles.card}
        styleContainer={commonStyles.cardContainer}
      >
        <View style={commonStyles.fullWidth}>
          <View style={[
            commonStyles.fullWidth,
            styles.titleContainer,
            {
              backgroundColor: isFree ?
                theme.colors.darkest :
                isStandard ? theme.colors.primary2 :
                  theme.colors.primary
            }
          ]}>
            <MaayotText
              color={'lightest'}
              fontWeight="bold"
              size="largest32"
              style={styles.title}
            >
              {displayName}
            </MaayotText>
          </View>
          <View style={[
            styles.featureContainer,
            {
              borderColor: theme.colors.gray3
            }
          ]}>
            <ScrollView style={{
              maxHeight: Dimensions.get('window').height - 400,
            }}>
              <View>
                {
                  isFree && FreePlanFeatures.map((feature: any, index: number) => {
                    return <FeatureItem
                      key={index}
                      isActive={!!feature.checked}
                      label={feature.label}
                    />
                  })
                }
                {
                  isStandard && StandardPlanFeatures.map((feature: any, index: number) => {
                    return <FeatureItem
                      key={index}
                      isActive={!!feature.checked}
                      label={feature.label}
                    />
                  })
                }
                {
                  isPremium && PremiumPlanFeatures.map((feature: any, index: number) => {
                    return <FeatureItem
                      key={index}
                      isActive={!!feature.checked}
                      label={feature.label}
                    />
                  })
                }
                {
                  !isFree && isIos && IAPConnected &&
                  <View style={[
                    commonStyles.fullWidth,
                    styles.cancelButton
                  ]}>
                    <MayotButton
                      onPress={cancelSubscription}
                      label={'Cancel Subscription'}
                      color={'gray2'}
                      bgColor={'lightest'}
                      fontWeight={'regular'}
                      fontWeightNumber={'600'}
                      size='small17'
                    />
                    {
                      productStandard && <MaayotText
                        color={'gray2'}
                        fontWeight="regular"
                        size="smallest12"
                        style={{
                          ...commonStyles.center,
                          lineHeight: 14
                        }}
                      >
                        {
                         //@ts-ignore
                          `renews ${mapPeriodConst[productStandard.subscriptionPeriodUnitIOS]} at ${productStandard.localizedPrice} after the trial`
                        }
                      </MaayotText>
                    }
                  </View>
                }
              </View>
            </ScrollView>
          </View>
        </View>
      </Card>
      {
        isFree && IAPConnected && <UpgradeButton
          onPress={upgradeSubscription}
          styles={{
            ...styles.btmButton,
            ...commonStyles.fullWidth
          }}
          purchaseLoading={purchaseLoading}
          product={productStandard}
          label={'Upgrade Subscription'}
          size={'small17'}
        />
      }
    </SafeAreaView>
  )
};
export default MyPlan

