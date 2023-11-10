import React from 'react'
import {View, StyleSheet, ScrollView, Dimensions, SafeAreaView} from 'react-native'
import useTheme from '../../../themes/useTheme'
import MayotButton from "@frameworks/mobile/components/atomic/button"
import styles from '../styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import PageTitle from "../../../components/atomic/pageTitle"
import Countdown from "./countDown"
import Card from "@frameworks/mobile/components/commons/Card"
import {navigationRoutes} from "@frameworks/mobile/utils/const"
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import SmileIcon from "@frameworks/mobile/icons/smileIcon";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import {usePlatform} from "@hooks";
import useIAP from "@frameworks/mobile/hooks/useIAP";
//@ts-ignore
import Spinner from "react-native-loading-spinner-overlay";
import UpgradeButton from "@frameworks/mobile/components/atomic/upgradeButton";

const scrollHeight = Dimensions.get('window').height - 200;
const FreeFinishScreen: React.FC = () => {
  const {isIos} = usePlatform()
  const {navigate} = useNavigation()
  const theme = useTheme()

  const backToHomeFn = async () => {
    navigate(navigationRoutes.NAVIGATION_MAIN_PATH, {})
  }
  const {
    connected: IAPConnected,
    requestSubscription,
    purchaseLoading,
    productsMap
  } = useIAP();

  const upgradeFn = () => {
    return requestSubscription('standard')
  }

  return (
    <SafeAreaView
      style={[
        finishStyles.safeView,
        {backgroundColor: theme.colors.primary,}
      ]}
    >
      <View
        style={finishStyles.container}
      >
        <PageTitle title={"Finish"}/>
        <Card
          style={styles.card}
          styleContainer={styles.cardContainer}
        >
          <View style={styles.cardView}>
            <ScrollView style={finishStyles.scrollView}>
              <View
                style={[
                  finishStyles.content,
                  commonStyles.center,
                  finishStyles.scrollView
                ]}
              >
                <SmileIcon/>
                <MaayotTextDisplay
                  color={'gray1'}
                  fontWeight="bold"
                  size="largest32"
                  style={finishStyles.finishTitle}
                >
                  You already finished this story
                </MaayotTextDisplay>
                <MaayotText
                  color={'gray2'}
                  fontWeight="regular"
                  size="smaller14"
                  style={finishStyles.finishSubtitle}
                >
                  You can read the next story in :
                </MaayotText>
                <Countdown/>
                <MaayotText
                  color={'gray2'}
                  fontWeight="regular"
                  size="small16"
                  style={finishStyles.subscriptionLine}
                >
                  Or upgrade your subscription
                </MaayotText>
                <MaayotText
                  color={'gray1'}
                  fontWeight="regular"
                  size="small16"
                  style={finishStyles.subscriptionText}
                >
                  Daily story in Mandarin, Daily story quiz, Daily new characters, Daily open-ended question,One-click
                  definitions, And much more
                </MaayotText>
              </View>
            </ScrollView>
          </View>
        </Card>
      </View>
      <View
        style={[
          finishStyles.nextButton,
          {backgroundColor: theme.colors.lightest}
        ]}
      >
        {IAPConnected && <>
          {/*<View style={commonStyles.center}>*/}
          {/*  <MaayotText*/}
          {/*    color={'gray1'}*/}
          {/*    fontWeight="regular"*/}
          {/*    fontWeightNumber={'600'}*/}
          {/*    size="smaller14"*/}
          {/*    style={finishStyles.upgradeText}*/}
          {/*  >*/}
          {/*    Start from $5/month*/}
          {/*  </MaayotText>*/}
          {/*</View>*/}
          {
            IAPConnected && <UpgradeButton
              onPress={upgradeFn}
              purchaseLoading={purchaseLoading}
              product={productsMap['standard']}
              label={'Unlock Now'}
            />
          }
        </>
        }

        <MayotButton
          onPress={backToHomeFn}
          label={'Back To Home'}
          color={'primary'}
          bgColor={'lightest'}
          size='small17'
          style={finishStyles.viewResult}
        />
      </View>
    </SafeAreaView>
  )
}

const finishStyles = StyleSheet.create({
  safeView: {
    width: '100%',
    flex: 1,
  },
  container: {
    marginTop: 16,
  },
  scrollView: {
    height: scrollHeight,
  },
  nextButton: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 22,
    position: 'absolute',
    bottom: 0,
    // height: 54
  },
  viewResult: {
    padding: 16
  },
  content: {
    width: '100%',
    height: '85%',
    minHeight: '85%',
  },
  finishTitle: {
    lineHeight: 38,
    marginTop: 23,
    textAlign: 'center'
  },
  finishSubtitle: {
    marginTop: 22,
    lineHeight: 21,
  },
  subscriptionLine: {
    marginTop: 18,
    lineHeight: 26,
  },
  subscriptionText: {
    lineHeight: 21,
    marginTop: 14,
    textAlign: 'center'
  },
  upgradeText: {
    lineHeight: 22,
    marginBottom: 4,
    letterSpacing: -0.408,
  }
})

export default FreeFinishScreen
