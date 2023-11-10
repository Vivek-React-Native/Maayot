import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {
  navigationRoutes
} from "@frameworks/mobile/utils/const"
import QuestionScreen from "./question";

const Stack = createStackNavigator();
export default () => {
  return (<Stack.Navigator
      initialRouteName={navigationRoutes.NAVIGATION_QUESTION_QUESTION_PATH}
      screenOptions={{
        headerShown: false
      }}
      >
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_QUESTION_QUESTION_PATH}
        component={QuestionScreen}/>
    </Stack.Navigator>
  )
}
