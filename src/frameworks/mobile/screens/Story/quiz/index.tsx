import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {
  navigationRoutes
} from "@frameworks/mobile/utils/const"
import QuizScreen from "./quiz";
import QuizResultScreen from "./quizResult";
import QuizAnswerScreen from "./quizAnswer";

const Stack = createStackNavigator();
export default () => {
  return (<Stack.Navigator
      initialRouteName={navigationRoutes.NAVIGATION_QUIZ_QUESTION_PATH}
      screenOptions={{
        headerShown: false
      }}
      >
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_QUIZ_QUESTION_PATH}
        component={QuizScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_QUIZ_ANSWER_PATH}
        component={QuizAnswerScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_QUIZ_RESULT_PATH}
        component={QuizResultScreen}/>
    </Stack.Navigator>
  )
}
