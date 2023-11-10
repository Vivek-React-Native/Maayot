import React, {useState, useEffect, useCallback, useRef} from 'react'
import {View, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated, Alert} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import styles from '../styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import PageTitle from "../../../components/atomic/pageTitle"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"
import {MemberStepInStory, navigationRoutes} from "@frameworks/mobile/utils/const"
import SoundBottom from "@frameworks/mobile/screens/Story/components/soundBottom";
import AnswerItem from "@frameworks/mobile/screens/Story/components/quiz/answerItem";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import {IQuizAnswerEntity, IQuizEntity, IQuizResultEntity} from "@domains/entities/interfaces/iQuiz";
import di from "@di";
import StorySlider from "@frameworks/mobile/screens/Story/quiz/storySlider";
import MaayotLoader from "@frameworks/mobile/components/atomic/loader";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import MaayotTextNotoSansSC from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSansSC";
import {useTracking} from "@frameworks/mobile/hooks/useStreaks";
import theme from '@frameworks/mobile/themes/MaayotTheme'

const QuizScreen: React.FC = () => {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  const { setViewStep } = useTracking();
  useEffect(() => {
    //@ts-ignore
    setViewStep(MemberStepInStory.QUIZ)
  },[]);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )

  const story: IStoryEntity | undefined = useSelector(
    (state: any) => state.story.story
  )

  const quiz: IQuizEntity | undefined = useSelector(
    (state: any) => state.quiz.quiz
  )
  const quizAnswer: IQuizAnswerEntity | undefined = useSelector(
    (state: any) => state.quiz.quizAnswer
  )

  const quizResult: IQuizResultEntity | undefined = useSelector(
    (state: any) => state.quiz.quizResult
  )

  useEffect(() => {
    const asyncFnc = async () => {
      if (story && profile && !quiz) {
        const quizAction = await di.quiz.getQuiz(story.id, profile.id, profile.level);
        dispatch(quizAction)
      }
    }
    story?.id && profile?.membershipId && asyncFnc()
  }, [story, profile, quiz])

  const submitQuiz = async () => {
    if (story && profile && quiz && !buttonLoading) {
      setButtonLoading(true);
      try {
        const submitQuizAction = await di.quiz.submitQuiz(
          story.id,
          profile.id,
          profile.level,
          selectedIndex + 1
        )
        if((submitQuizAction as IFailureAPI).status) {
          Alert.alert("", (submitQuizAction as IFailureAPI).message)
        } else {
          dispatch(submitQuizAction);
        }
        setButtonLoading(false);
      } catch (e) {
        console.log("err",e);
        setButtonLoading(false);
      }
    }
  }


  useEffect(() => {
    if (quizAnswer && quizAnswer.memberAnswer && quizAnswer.rightAnswer) {
      if (quizResult?.resultOptions?.length) {
        navigate(navigationRoutes.NAVIGATION_QUIZ_RESULT_PATH, {})
      } else {
        navigate(navigationRoutes.NAVIGATION_QUIZ_ANSWER_PATH, {})
      }
    }
  }, [quizAnswer, quizResult]);

  const quizSelectedFn = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
  }
  return (
    <SafeAreaView style={{backgroundColor:theme.colors.lightest}}>
      <View style={styles.storyContainer}>
        <PageTitle title={"Quiz"}/>
        <StorySlider>
          <ScrollView style={quizStyles.scrollView}>
            {quiz && !quizResult?.resultOptions?.length && <>
              <MaayotTextNotoSansSC
                color={'gray1'}
                fontWeight="regular"
                size="larger24"
                style={quizStyles.quizQuestion}
              >
                {quiz.quiz}
              </MaayotTextNotoSansSC>
              {
                quiz.options.map((option: any, index: number) => {
                  return <AnswerItem
                    key={index}
                    label={option}
                    isSelected={selectedIndex === index}
                    onPress={() => quizSelectedFn(index)}
                  />
                })
              }
            </>
            }
            {!quiz &&
              <View style={[
                commonStyles.center,
                quizStyles.loading,
              ]}>
                <MaayotLoader/>
              </View>
            }
          </ScrollView>
        </StorySlider>
      </View>
      {
        quiz
        && !quizResult?.resultOptions?.length
        && story
        && <SoundBottom
          story={story}
          onButtonPress={submitQuiz}
          buttonLoading={buttonLoading}
          buttonLabel={'Submit Answer'}
          buttonDisabled={selectedIndex < 0}
        />
      }
    </SafeAreaView>
  )
}

const quizStyles = StyleSheet.create({
  cardContainer: {
    paddingTop: 20,
    padding: 16,
    borderRadius: 0,
  },
  scrollView: {
    height: Dimensions.get('window').height - 280,
  },
  quizQuestion: {
    lineHeight: 37,
    marginBottom: 12,
  },
  loading: {
    height: 30,
  },
})

export default QuizScreen
