import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from "@frameworks/mobile/components/main/MainNavigator";
import StoryNavigator from "@frameworks/mobile/components/story/StoryNavigator";
import {navigationRoutes} from "@frameworks/mobile/utils/const";
import SettingsNavigator from "@frameworks/mobile/components/settings/SettingsNavigator";

const Stack = createStackNavigator();
export default () => {
  return (<Stack.Navigator
      initialRouteName={navigationRoutes.NAVIGATION_MAIN_PATH}
      headerMode={'none'}
    >
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_MAIN_PATH}
        component={MainNavigator}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_STORY_PATH}
        component={StoryNavigator}/>
      <Stack.Screen
        name={navigationRoutes.NAVIGATION_SETTING_PATH}
        component={SettingsNavigator}/>
    </Stack.Navigator>
  )
}
