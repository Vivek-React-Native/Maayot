import React, {useState, useEffect} from 'react'
import {View, TextInput, Alert, StyleSheet, ScrollView, Dimensions, SafeAreaView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import useTheme from '../../../themes/useTheme'
import MayotButton from "@frameworks/mobile/components/atomic/button"
import styles from '../styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import PageTitle from "../../../components/atomic/pageTitle"
import Countdown from "../components/countDown"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import Card from "@frameworks/mobile/components/commons/Card"
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"
import {navigationRoutes} from "@frameworks/mobile/utils/const"
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import SmileIcon from "@frameworks/mobile/icons/smileIcon";
import BadIcon from "@frameworks/mobile/icons/badIcon";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";

const scrollHeight = Dimensions.get('window').height - 182;
const MainFinishScreen: React.FC = () => {
  const {navigate} = useNavigation()
  const theme = useTheme()

  const backToHomeFn = async () => {
    navigate(navigationRoutes.NAVIGATION_MAIN_PATH, {})
  }
  const readAgainFn = async () => {
    navigate(navigationRoutes.NAVIGATION_STORY_AND_LISTENING_PATH, {})
  }

  return (
    <SafeAreaView
      style={{
        width: '100%',
        backgroundColor: theme.colors.primary,
        flex: 1,
      }}
    >
      <View
        style={finishStyles.container}
      >
        <PageTitle title={"Finish"}/>
        <Countdown/>
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
                  Congratulations
                </MaayotTextDisplay>
                <MaayotText
                  color={'gray1'}
                  fontWeight="regular"
                  size="smaller14"
                  style={finishStyles.finishSubtitle}
                >
                  You have finished today’s story, see you tomorrow!
                </MaayotText>
              </View>
            </ScrollView>
          </View>
        </Card>
      </View>
      <View
        style={[
          commonStyles.btmButton,
          finishStyles.nextButton,
          {backgroundColor: theme.colors.lightest}
        ]}
      >
        <MayotButton
          onPress={backToHomeFn}
          label={'Back To Home'}
        />
        <MayotButton
          onPress={readAgainFn}
          label={'Read Again'}
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
  container: {
    marginTop: 16,
  },
  scrollView: {
    height: scrollHeight,
  },
  nextButton: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 42,
    position: 'absolute',
    bottom: 0,
    height: 130
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
  },
  finishSubtitle: {
    marginTop: 8,
    lineHeight: 21,
  },
})

export default MainFinishScreen
