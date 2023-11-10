import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from "@frameworks/mobile/screens/AuthScreen/SignIn";
import SignUpScreen from "@frameworks/mobile/screens/AuthScreen/SignUp";
import SelectLevel from "@frameworks/mobile/screens/AuthScreen/SelectLevel";
import SelectLanguage from "@frameworks/mobile/screens/AuthScreen/SelectLanguage";
import {navigationRoutes} from "@frameworks/mobile/utils/const";

const Stack = createStackNavigator();
export default () => {
  return (<Stack.Navigator
      initialRouteName={navigationRoutes.NAVIGATION_LOGIN_PATH}
      headerMode={'none'}
    >
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_LOGIN_PATH}
        component={SignInScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_REGISTER_PATH}
        component={SignUpScreen}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_SELECT_PATH}
        component={SelectLevel}/>
        <Stack.Screen
        name={navigationRoutes.NAVIGATION_LANGUAGE_PATH}
        component={SelectLanguage}/>
    </Stack.Navigator>
  )
}
