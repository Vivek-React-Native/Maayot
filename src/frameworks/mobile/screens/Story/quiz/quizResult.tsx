import React, {useEffect, useMemo} from 'react'
import {View, StyleSheet, ScrollView, SafeAreaView, Dimensions} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import styles from '../styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import PageTitle from "../../../components/atomic/pageTitle"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import {navigationRoutes} from "@frameworks/mobile/utils/const"
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import ResultItem from "@frameworks/mobile/screens/Story/components/quiz/resultItem";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import useTheme from "../../../themes/useTheme";
import {IQuizAnswerEntity, IQuizEntity, IQuizResultEntity} from "@domains/entities/interfaces/iQuiz";
import di from "@di";
import StorySlider from "@frameworks/mobile/screens/Story/quiz/storySlider";
import MaayotLoader from "@frameworks/mobile/components/atomic/loader";
import MaayotTextNotoSansSC from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSansSC";

const QuizResultScreen: React.FC = () => {
  const theme = useTheme()
  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const quizAnswer: IQuizAnswerEntity | undefined = useSelector(
    (state: any) => state.quiz.quizAnswer
  )

  const quiz: IQuizEntity | undefined = useSelector(
    (state: any) => state.quiz.quiz
  )

  const quizResult: IQuizResultEntity | undefined = useSelector(
    (state: any) => state.quiz.quizResult
  )

  const story: IStoryEntity | undefined = useSelector(
    (state: any) => state.story.story
  )

  const percentageOption = useMemo(() => {
    if (quizResult?.resultOptions) {
      const sum = quizResult?.resultOptions.reduce((s, c) => s + c)
      return quizResult.resultOptions.map(val => Math.round(val / sum * 100))
    }
  }, [quizResult]);

  useEffect(() => {
    const asyncFnc = async () => {
      if (story?.id) {
        const quizResultAction = await di.quiz.getResult(story.id);
        dispatch(quizResultAction)
      }
    }
    story?.id && quizAnswer?.memberAnswer && !quizResult?.resultOptions && asyncFnc()
  }, [story, quizAnswer, quizResult])

  const {rightAnswer, memberAnswer} = useMemo(() => {
    if (quizAnswer?.memberAnswer) {
      return quizAnswer;
    } else {
      return {}
    }
  }, [quizAnswer]);
  const nextStepFn = async () => {
    navigate(navigationRoutes.NAVIGATION_QUESTION_PATH, {})
  }

  return (
    <SafeAreaView>
      <View style={styles.storyContainer}>
        <PageTitle title={"Quiz Result"}/>
        <StorySlider>
          <ScrollView style={quizStyles.scrollView}>
            {quiz && <>
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
                  return <ResultItem
                    key={index}
                    label={option}
                    isAnswer={index + 1 == memberAnswer}
                    isResult={index + 1 == rightAnswer}
                    percent={percentageOption?.[index] || 0}
                  />
                })
              }
            </>
            }
          </ScrollView>
        </StorySlider>
      </View>
      <View
        style={[
          styles.nextButton,
        ]}
      >
        <MayotButton
          onPress={nextStepFn}
          label={'Next Step'}
        />
      </View>
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
})

export default QuizResultScreen
