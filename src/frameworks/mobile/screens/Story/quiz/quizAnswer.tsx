import React, {useState, useEffect, useMemo} from 'react'
import {View, StyleSheet, ScrollView, SafeAreaView, Dimensions} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import styles from '../styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import PageTitle from "../../../components/atomic/pageTitle"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import Card from "@frameworks/mobile/components/commons/Card"
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"
import {navigationRoutes} from "@frameworks/mobile/utils/const"
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import useTheme from "../../../themes/useTheme";
import SmileIcon from "@frameworks/mobile/icons/smileIcon";
import BadIcon from "@frameworks/mobile/icons/badIcon";
import {IQuizAnswerEntity} from "@domains/entities/interfaces/iQuiz";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
const scrollHeight = Dimensions.get('window').height - 320;
const QuizAnswer: React.FC = () => {
  const theme = useTheme();
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  const quizAnswer: IQuizAnswerEntity | undefined = useSelector(
    (state: any) => state.quiz.quizAnswer
  )

  const isRightAnswer = useMemo(() => {
    if(quizAnswer && quizAnswer.rightAnswer && quizAnswer.memberAnswer) {
      return quizAnswer.rightAnswer === quizAnswer.memberAnswer;
    } else return false;
  }, [quizAnswer])

  const nextStepFn = async () => {
    navigate(navigationRoutes.NAVIGATION_QUESTION_PATH, {})
  }

  const viewResultFn = async () => {
    navigate(navigationRoutes.NAVIGATION_QUIZ_RESULT_PATH, {})
  }

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.lightest}}>
      <View style={styles.storyContainer}>
        <PageTitle title={"Quiz Answer"}/>
        <Card
          style={styles.card}
          styleContainer={quizStyles.cardContainer}
        >
          <View style={styles.cardView}>
            <View>
              <ScrollView style={quizStyles.scrollView}>
                <View
                  style={[
                    quizStyles.content,
                    commonStyles.center
                  ]}
                >
                  {isRightAnswer && <SmileIcon/> || <BadIcon />}
                  <MaayotTextDisplay
                    color={'gray1'}
                    fontWeight="bold"
                    size="largest32"
                    style={quizStyles.answerTitle}
                  >
                    {isRightAnswer &&  'Congratulations'|| 'Nope!'}
                  </MaayotTextDisplay>
                  <MaayotText
                    color={'gray1'}
                    fontWeight="regular"
                    size="smaller14"
                    style={quizStyles.answerSubtitle}
                  >
                    {
                      isRightAnswer
                      && 'You picked the correct answer, keep it up!'
                      || 'You picked the wrong answer, better luck next time 😀'
                    }
                  </MaayotText>
                </View>
              </ScrollView>
            </View>
          </View>
        </Card>
      </View>
      <View
        style={[
          styles.nextButton,
          {backgroundColor: theme.colors.lightest}
        ]}
      >
        <MayotButton
          onPress={nextStepFn}
          label={'Next Step'}
        />
        <MayotButton
          onPress={viewResultFn}
          label={'View result'}
          color={'primary'}
          bgColor={'lightest'}
          size='small17'
          style={quizStyles.viewResult}
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
  content: {
    width: '100%',
    height: scrollHeight
  },
  scrollView: {
    height: scrollHeight
  },
  answerTitle: {
    lineHeight: 38,
    marginTop: 23,
  },
  answerSubtitle: {
    marginTop: 8,
    lineHeight: 21,
  },
  nextButton: {
    padding: 16,
  },
  viewResult: {
    padding: 16
  }
})

export default QuizAnswer

