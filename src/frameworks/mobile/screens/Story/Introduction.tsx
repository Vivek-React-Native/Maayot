import React, {useState, useEffect} from 'react'
import {View, TextInput, Alert, StyleSheet, ScrollView, Dimensions, SafeAreaView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import di from '@di'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText"
import useTheme from '../../themes/useTheme'
import MayotButton from "@frameworks/mobile/components/atomic/button"
import styles from './styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import PageTitle from "../../components/atomic/pageTitle"
import Countdown from "./components/countDown"
import ImageStory from "@frameworks/mobile/screens/HomeScreen/story/image"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import Card from "@frameworks/mobile/components/commons/Card"
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import Star from "@frameworks/mobile/screens/Story/components/star"
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"
import {capitalize} from '../../helpers'
import {MemberStepInStory, navigationRoutes} from "@frameworks/mobile/utils/const"
import MaayotTextNotoSansSC from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSansSC";
import {useTracking} from "@frameworks/mobile/hooks/useStreaks";
import {StorySteps} from "@domains/entities/interfaces/iStreaks";
import theme from "@frameworks/mobile/themes/MaayotTheme";

const Anonymous = () => {
}

const IntroductionScreen: React.FC = () => {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const theme = useTheme()
  //
  const { setViewStep } = useTracking();
  useEffect(() => {
    //@ts-ignore
    setViewStep(MemberStepInStory.INTRODUCTION)
  },[]);
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )

  const story: IStoryEntity | undefined = useSelector(
    (state: any) => state.story.story
  )

  const readStoryFn = async () => {
    navigate(navigationRoutes.NAVIGATION_STORY_AND_LISTENING_PATH, {})
  }

  return (
    <SafeAreaView style={{backgroundColor:theme.colors.lightest}}>
      <View style={styles.storyContainer}>
        <PageTitle title={"Introduction"}/>
        <Countdown/>
        <Card
          style={styles.card}
          styleContainer={styles.cardContainer}
        >
          <View style={styles.cardView}>
            <View>
              <ScrollView style={introStyles.scrollView}>
                {
                  story?.image && <ImageStory image={story.image}/>
                }
                <View style={[
                  commonStyles.flxRow,
                  introStyles.storyStar]
                }>
                  <MaayotText
                    color={'gray2'}
                    fontWeight="regular"
                    size="smallest12"
                  >
                    {capitalize((profile as IProfileEntity).level)}
                  </MaayotText>
                  <Star level={(profile as IProfileEntity).level}/>
                </View>
                <MaayotTextNotoSansSC
                  color={'gray1'}
                  fontWeight="bold"
                  size="normal18"
                  style={introStyles.title}
                >
                  {story && story.storyTitle}
                </MaayotTextNotoSansSC>
                <MaayotText
                  color={'gray1'}
                  fontWeight="regular"
                  size="smaller14"
                  style={introStyles.lineHeight21}
                >
                  {story && story.englishTitle}
                </MaayotText>
                <MaayotText
                  color={'gray1'}
                  fontWeight="regular"
                  size="smaller14"
                  style={introStyles.content}
                >
                  {story && story.storyIntroduction}
                </MaayotText>
              </ScrollView>
            </View>
          </View>
        </Card>
      </View>
      <View
        style={[
          commonStyles.btmButton,
          introStyles.nextButton,
          {backgroundColor:theme.colors.gray3}
        ]}
      >
        <MayotButton
          onPress={readStoryFn}
          label={'Start Reading'}
        />
      </View>
    </SafeAreaView>
  )
}

const introStyles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 280,
  },
  title: {
    lineHeight: 26
  },
  lineHeight21: {
    lineHeight: 21
  },
  storyStar: {
    marginTop: 24,
    marginBottom: 6,
    height: 16,
  },
  content: {
    marginTop: 18,
    lineHeight: 21
  },
  nextButton: {
    height: 100
  }
})

export default IntroductionScreen
