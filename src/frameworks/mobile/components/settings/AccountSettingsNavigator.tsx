import React from 'react';
import SettingsScreen from '../../screens/SettingsScreen';
import useTheme from '../../themes/useTheme'
import {createStackNavigator} from "@react-navigation/stack";
import {
  navigationRoutes
} from "@frameworks/mobile/utils/const"
import AccountSetting from "@frameworks/mobile/screens/SettingsScreen/Account/accountSetting";
import ChangePassword from "@frameworks/mobile/screens/SettingsScreen/Account/changePassword";
export default () => {
  const theme = useTheme();
  return <AccountSetting />
};
