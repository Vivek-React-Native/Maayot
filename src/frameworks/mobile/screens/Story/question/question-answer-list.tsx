import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Dimensions, TextInput} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import Card from "@frameworks/mobile/components/commons/Card"
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useTheme from "../../../themes/useTheme";
import {IQuestionAnswerEntity, IQuestionAnswersEntity, IQuestionEntity} from "@domains/entities/interfaces/iQuestion";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import MaayotTextNotoSans from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSans";

interface IAnswerItemProps {
  answer: string,
  memberName: string,
  memberId: string,
}

export const AnswerItem: React.FC<IAnswerItemProps> = (props: IAnswerItemProps) => {
  const {
    answer,
    memberName,
  } = props;

  const theme = useTheme()
  return (<View
    style={[
      answerItemStyles.container,
      {backgroundColor: theme.colors.gray5}
    ]}
  >
    <MaayotText
      color={'gray2'}
      fontWeight="regular"
      size="smallest12"
      style={answerItemStyles.userName}
    >
      {memberName}
    </MaayotText>
    <MaayotTextNotoSans
      color={'gray1'}
      fontWeight="regular"
      size="smaller14"
      style={answerItemStyles.answer}
    >
      {answer}
    </MaayotTextNotoSans>
  </View>);
}
const answerItemStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 4,
    borderRadius: 8,
  },
  userName: {
    lineHeight: 24
  },
  answer: {
    lineHeight: 24,
    marginTop: 4,
  }
})

interface IQuestionAnswerListProps {
  getQuestionAnswers: (refId: string | null, refTs: string | null) => any
}

const QuestionAnswerList: React.FC<IQuestionAnswerListProps> = (props: IQuestionAnswerListProps) => {
  const {
    getQuestionAnswers
  } = props;

  const questionAnswers: IQuestionAnswersEntity | undefined = useSelector(
    (state: any) => state.question.questionAnswers
  )

  const viewMoreFn = () => {
    if(questionAnswers?.ref && questionAnswers?.ts) {
      getQuestionAnswers(questionAnswers.ref, questionAnswers.ts)
    }
  }

  return (
    <Card
      style={answerStyles.card}
      styleContainer={answerStyles.cardContainer}
    >
      <View style={answerStyles.container}>
        <MaayotTextDisplay
          color={'gray1'}
          fontWeight="bold"
          size="normal18"
          style={answerStyles.title}
        >
          All Answers
        </MaayotTextDisplay>
        {/*<ScrollView style={answerStyles.scrollView}>*/}
        {
          (questionAnswers?.answers || []).map((answer: IQuestionAnswerEntity, index: number) => {
            return <AnswerItem
              key={index}
              {...answer}
            />
          })
        }
        {
          questionAnswers?.ref && questionAnswers?.ts && <MayotButton
            onPress={viewMoreFn}
            label={'Show more answer'}
            color={'primary'}
            bgColor={'lightest'}
            size='small17'
            style={answerStyles.viewResult}
          />
        }
        {/*</ScrollView>*/}
      </View>
    </Card>
  )
}

const answerStyles = StyleSheet.create({
  title: {
    lineHeight: 21,
    marginBottom: 8,
  },
  card: {
    padding: 0,
  },
  cardContainer: {
    padding: 0,
  },
  container: {
    padding: 0,
    flex: 1,
  },
  scrollView: {
    height: Dimensions.get('window').height - 550,
  },
  questionTitle: {
    lineHeight: 37,
    marginBottom: 20,
  },
  textAreaContainer: {
    borderRadius: 8,
    height: 186,
    padding: 20,
    marginBottom: 28,
  },
  textArea: {},
  viewResult: {
    padding: 16
  }

})
export default QuestionAnswerList
