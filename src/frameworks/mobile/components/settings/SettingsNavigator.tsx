import React from 'react';
import SettingsScreen from '../../screens/SettingsScreen';
import useTheme from '../../themes/useTheme'
import {createStackNavigator} from "@react-navigation/stack";
import {
  navigationRoutes
} from "@frameworks/mobile/utils/const"
import ChangePassword from "@frameworks/mobile/screens/SettingsScreen/Account/changePassword";
import AccountSetting from "@frameworks/mobile/screens/SettingsScreen/Account/accountSetting";
import ChangeLevel from "@frameworks/mobile/screens/SettingsScreen/Level/changeLevel";
import ChangeLanguage from "@frameworks/mobile/screens/SettingsScreen/Language/changeLanguage";
import MyPlan from "@frameworks/mobile/screens/SettingsScreen/MyPlan/myPlan";
import ComparePlan from "@frameworks/mobile/screens/SettingsScreen/MyPlan/comparePlan";

const Stack = createStackNavigator();
export default () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName={navigationRoutes.NAVIGATION_SETTING_COMPARE_PLAN_PATH}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 0,
          shadowColor: 'transparent'
        },
        title: '',
        headerTintColor: theme.colors.lightest,
      }}
    >
      <Stack.Screen name={navigationRoutes.NAVIGATION_SETTING_ACCOUNT_PATH}
                    component={AccountSetting}
                    options={{
                      title: 'Account Setting',
                      headerBackTitle: 'Setting',
                    }}
      />
      <Stack.Screen name={navigationRoutes.NAVIGATION_PASSWORD_SETTING_PATH}
                    component={ChangePassword}
                    options={{
                      title: 'Edit Password',
                      headerBackTitle: '',
                    }}
      />
      <Stack.Screen name={navigationRoutes.NAVIGATION_SETTING_PLAN_PATH}
                    component={MyPlan}
                    options={{
                      title: 'My Plan',
                      headerBackTitle: 'Setting',
                    }}
      />
      <Stack.Screen name={navigationRoutes.NAVIGATION_SETTING_COMPARE_PLAN_PATH}
                    component={ComparePlan}
                    options={{
                      title: 'Compare Plan',
                      headerBackTitle: 'My Plan',
                    }}
      />
      <Stack.Screen name={navigationRoutes.NAVIGATION_SETTING_LEVEL_PATH}
                    component={ChangeLevel}
                    options={{
                      title: 'Change Level',
                      headerBackTitle: 'Setting',
                    }}
      />
      <Stack.Screen name={navigationRoutes.NAVIGATION_SETTING_LANGUAGE_PATH}
                    component={ChangeLanguage}
                    options={{
                      title: 'Change Language',
                      headerBackTitle: 'Setting',
                    }}
      />
    </Stack.Navigator>
  )
};
