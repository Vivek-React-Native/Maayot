import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import StoryAndListeningScreen from "@frameworks/mobile/screens/Story/StoryAndListening";
import IntroductionScreen from "@frameworks/mobile/screens/Story/Introduction";
import QuizScreen from "@frameworks/mobile/screens/Story/quiz";
import FinishScreen from "@frameworks/mobile/screens/Story/finish";
import useTheme from '../../themes/useTheme'
import {
  navigationRoutes
} from "@frameworks/mobile/utils/const"
import HeaderRight from "./HeaderRight";
import QuestionScreen from "@frameworks/mobile/screens/Story/question";
import StreaksScreen from "@frameworks/mobile/screens/Story/streaks";

const Stack = createStackNavigator();
export default () => {
  const theme = useTheme();
  return (<Stack.Navigator
      initialRouteName={navigationRoutes.NAVIGATION_INTRODUCTION_PATH}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 0,
          shadowColor: 'transparent'
        },
        title:'',
        headerTintColor: theme.colors.lightest,
      }}
    >
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_INTRODUCTION_PATH}
        options={{
          headerBackTitle: 'Homepage',
        }}
        component={IntroductionScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_STORY_AND_LISTENING_PATH}
        options={{
          headerBackTitle: 'Introduction',
          headerRight: (props) => (
            <HeaderRight step={1} total={3}/>
          ),
        }}
        component={StoryAndListeningScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_QUIZ_PATH}
        options={{
          headerBackTitle: 'Story and Listening',
          headerRight: (props) => (
            <HeaderRight step={2} total={3}/>
          ),
        }}
        component={QuizScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_QUESTION_PATH}
        options={{
          headerBackTitle: 'Quiz',
          headerRight: (props) => (
            <HeaderRight step={3} total={3}/>
          ),
        }}
        component={QuestionScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_STORY_STREAKS_FINISH_PATH}
        options={{
          headerShown: false
        }}
        component={StreaksScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_FINISH_PATH}
        options={{
          headerShown: false
        }}
        component={FinishScreen}/>
    </Stack.Navigator>
  )
}
