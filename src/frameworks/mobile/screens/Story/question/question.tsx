import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard, Alert
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import styles from '../styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import PageTitle from "../../../components/atomic/pageTitle"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import Card from "@frameworks/mobile/components/commons/Card"
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"
import {MemberStepInStory, navigationRoutes} from "@frameworks/mobile/utils/const"
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useTheme from "../../../themes/useTheme";
import QuestionAnswerList, {AnswerItem} from "@frameworks/mobile/screens/Story/question/question-answer-list";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import di from "@di";
import {IQuestionAnswerEntity, IQuestionEntity} from "@domains/entities/interfaces/iQuestion";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import MaayotLoader from "@frameworks/mobile/components/atomic/loader";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import MaayotTextNotoSansSC from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSansSC";
import useMemberShip from "@frameworks/mobile/hooks/useMembership";
import {useTracking} from "@frameworks/mobile/hooks/useStreaks";

function regEx(text:string) {
  const regex = /[a-zA-Z]/
  return regex.test(text)
}

const documentHeight = Dimensions.get('window').height - 250;
const QuestionScreen: React.FC = () => {
  const theme = useTheme()
  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const [isFocus, setFocus] = useState<boolean>(false);
  const [height, setHeight] = useState(documentHeight)
  const [buttonBottom, setButtonBottom] = useState(18);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [text, onChangeText] = useState<string>('');
  const {isValidMemberShip} = useMemberShip();
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )

  const story: IStoryEntity | undefined = useSelector(
    (state: any) => state.story.story
  )

  const question: IQuestionEntity | undefined = useSelector(
    (state: any) => state.question.question
  )

  const questionAnswer: IQuestionAnswerEntity | undefined = useSelector(
    (state: any) => state.question.questionAnswer
  )

  const { setViewStep } = useTracking();
  useEffect(() => {
    //@ts-ignore
    setViewStep(MemberStepInStory.QUESTION)
  },[]);

  const finishFn = async () => {
    navigate(isValidMemberShip ?
      navigationRoutes.NAVIGATION_STORY_STREAKS_FINISH_PATH:
      navigationRoutes.NAVIGATION_FINISH_PATH
      , {})
  }

  const getQuestionAnswers = async (refId: string | null, refTs: string | null) => {
    if (story && profile && question) {
      try {
        const questionAnswers = await di.question.getQuestionAnswers(
          story.id,
          profile.level,
          profile.id,
          refId,
          refTs,
        )
        if ((questionAnswers as IFailureAPI).status) {
          Alert.alert("", (questionAnswers as IFailureAPI).message)
        } else {
          dispatch(questionAnswers);
        }
      } catch (e) {
        console.log("err", e);
      }
    }
  }

  const submitQuestionFn = async () => {
    if(regEx(text)){
      Alert.alert('Alert', 'Please only enter Chinese characters');
      return;
    }

    if (story && profile && question && !buttonLoading) {
      setButtonLoading(true);
      try {
        const submitQuestionAction = await di.question.submitQuestion(
          story.id,
          profile.id,
          profile.name,
          text,
          profile.level
        )
        if ((submitQuestionAction as IFailureAPI).status) {
          Alert.alert("", (submitQuestionAction as IFailureAPI).message)
        } else {
          dispatch(submitQuestionAction);
          dispatch(await di.question.clearQuestionAnswers())
          await getQuestionAnswers(null,null);
        }
        setButtonLoading(false);
      } catch (e) {
        console.log("err", e);
        setButtonLoading(false);
      }
    }
  }
  const keyboardWillHide = () => {
    setFocus(false)
    setHeight(documentHeight)
    setButtonBottom(18)
  }

  const keyboardWillShow = (e: any) => {
    setHeight(documentHeight - e.endCoordinates.height + 100)
    setButtonBottom(e.endCoordinates.height);
  }

  useEffect(() => {
    const asyncFnc = async () => {
      if (story && profile && !question) {
        const questionAction = await di.question.getQuestion(story.id, profile.id, profile.level);
        dispatch(questionAction)
      }
    }
    story?.id && profile?.membershipId && asyncFnc()
  }, [story, profile, question])
  useEffect(() => {
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);
    Keyboard.addListener("keyboardWillShow", keyboardWillShow);

    return () => {
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
    };
  }, []);
  return (
    <SafeAreaView
      style={{
        width: '100%',
        backgroundColor: theme.colors.lightest,
        flex: 1,
      }}
    >
      <View>
        <PageTitle title={"Question of the Day"}/>
        <Card
          style={styles.card}
          styleContainer={questionStyles.cardContainer}
        >
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps='handled'
            style={{
              height: height
            }}
          >
            {question && <View style={styles.cardView}>
              <MaayotTextNotoSansSC
                color={'gray1'}
                fontWeight="regular"
                size="larger24"
                style={questionStyles.questionTitle}
              >
                {question.question}
              </MaayotTextNotoSansSC>

              {questionAnswer && <AnswerItem
                  memberName={'Your Answer'}
                  memberId={questionAnswer.memberId}
                  answer={questionAnswer.answer}
                />
                ||
                <View style={[
                  questionStyles.textAreaContainer,
                  {
                    backgroundColor: theme.colors.gray5,
                    borderColor: isFocus ? theme.colors.primary : theme.colors.gray5
                  }
                ]}>
                  <TouchableWithoutFeedback
                    onPress={() => setFocus(false)}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Type your answer in Chinese..."
                      placeholderTextColor={theme.colors.gray2}
                      numberOfLines={10}
                      multiline={true}
                      onFocus={() => setFocus(true)}
                      onChangeText={(text) => onChangeText(text) }
                      value={text}
                      style={[
                        questionStyles.textArea,
                      ]}
                    />
                  </TouchableWithoutFeedback>
                </View>
              }
              <QuestionAnswerList
                getQuestionAnswers={getQuestionAnswers}
              />
            </View>
            ||
            <View style={[
              commonStyles.center,
              questionStyles.loading,
            ]}>
              <MaayotLoader/>
            </View>
            }
          </ScrollView>
        </Card>
      </View>
      {
        !questionAnswer && <View
          style={[
            styles.nextButton,
            {
              backgroundColor: theme.colors.lightest,
              bottom: buttonBottom,
            }
          ]}
        >
          <MayotButton
            onPress={submitQuestionFn}
            label={'Submit answer'}
            isLoading={buttonLoading}
            disabled={text.length < 5}
          />
        </View>
      }
      {questionAnswer && <View
        style={[
          styles.nextButton,
        ]}
      >
        <MayotButton
          onPress={finishFn}
          label={'Finish'}
        />
      </View>
      }
    </SafeAreaView>
  )
}

const questionStyles = StyleSheet.create({
  cardContainer: {
    paddingTop: 20,
    padding: 16,
    borderRadius: 0,
  },
  questionTitle: {
    lineHeight: 37,
    marginBottom: 20,
  },
  scrollView: {
    // height: documentHeight,
    // height: Dimensions.get('window').height - 330,
  },
  textAreaContainer: {
    borderRadius: 8,
    height: 144,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
  },
  textArea: {
    height: '100%',
  },
  nextButton: {
    padding: 16,
    position: 'absolute',
    width: '100%',
  },
  loading: {
    height: 30,
  }

})

export default QuestionScreen
