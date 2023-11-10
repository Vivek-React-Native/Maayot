import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRoutes} from "@frameworks/mobile/utils/const";
import OnBoardingScreen from "@frameworks/mobile/screens/OnboardingScreen";

const Stack = createStackNavigator();
export default () => {
  return (<Stack.Navigator
      initialRouteName={navigationRoutes.ON_BOARDING_PATH}
      headerMode={'none'}
    >
      <Stack.Screen
        name={navigationRoutes.ON_BOARDING_PATH}
        component={OnBoardingScreen}/>
    </Stack.Navigator>
  )
}
