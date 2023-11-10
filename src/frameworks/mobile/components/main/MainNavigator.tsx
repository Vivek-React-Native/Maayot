import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import SettingsNavigator from '../settings/SettingsNavigator'
import StreaksNavigator from '../streaks/StreaksNavigator'
import MainTabBar from '../../navigations/MainTabBar'
import HomeNavigator from '../home/HomeNavigator'
import {
  HomeIcon,
  StreakIcon,
  SettingIcon
} from '../../icons'
import { usePlatform } from '@hooks'
import { IProfileEntity } from '@domains/entities/interfaces/iProfile'
import di from '@di'
import { IFailureAPI } from '@adapters/infrastructures/interfaces/iHttp'
import { IProfileAction } from '@adapters/presenters/action-interfaces/iProfile'
import { ColorStrings } from '@frameworks/mobile/themes/MaayotTheme'
import {screenConst, unauthorizedCodeConst} from '@frameworks/mobile/utils/const'
import useMemberShip from '@frameworks/mobile/hooks/useMembership'
import StoryNavigator from '@frameworks/mobile/components/story/StoryNavigator'
import MayotButton from '@frameworks/mobile/components/atomic/button'
import CustomDrawerContent, {
  DrawerConfig,
  memberShipCheckConst
} from '@frameworks/mobile/components/main/CustomDrawerContent'
import { isSunday } from '@frameworks/mobile/utils/utils'
import SettingsHome from "@frameworks/mobile/components/settings/SettingsHome";

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const MainNavigator = () => {
  const { isIos } = usePlatform()
  const dispatch = useDispatch()
  const { isValidMemberShip } = useMemberShip()
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )
  const _isSunday = useMemo(() => {
    return isSunday()
  }, [])

  useEffect(() => {
    const asyncFnc = async () => {
      const profile: IProfileAction | IFailureAPI = await di.profile.getProfile()
      if ((profile as IFailureAPI).status) {
        const errorCode = (profile as IFailureAPI).status;
        if(errorCode === unauthorizedCodeConst) {
          await di.session.signOut(dispatch)
        } else {
          console.log('profile error', profile);
        }
      } else {
        dispatch(profile as IProfileAction)
      }
    }
    !profile && asyncFnc()
  }, [profile])

  return (
    <>
      {!isIos && <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          initialRouteName="Home">
          <Drawer.Screen name={screenConst.HOME}
                         component={HomeNavigator}
          />
          <Drawer.Screen name={screenConst.READ_STORY}
                         component={StoryNavigator} />
          <Drawer.Screen name={screenConst.UPGRADE_PACKAGE}
                         component={HomeNavigator} />
          {isValidMemberShip && <Drawer.Screen
              name={screenConst.STREAK}
              component={StreaksNavigator}
          />
          }
          {isValidMemberShip && <Drawer.Screen
              name={screenConst.HIGHEST_STREAK}
              component={StreaksNavigator}
          />
          }
          <Drawer.Screen name={screenConst.ACCOUNT_SETTING}
                         component={SettingsNavigator}
          />
          <Drawer.Screen name={screenConst.MY_PLAN}
                         component={SettingsNavigator} />
          <Drawer.Screen name={screenConst.MY_LEVEL}
                         component={SettingsNavigator} />
        </Drawer.Navigator> ||
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // eslint-disable-next-line
            tabBarIcon: ({ focused, color, size }) => {
              switch (route.name) {
                case screenConst.HOME:
                  return <HomeIcon stroke={color as ColorStrings} />
                case screenConst.STREAK:
                  return <StreakIcon stroke={color as ColorStrings} />
                case screenConst.SETTING:
                  return <SettingIcon stroke={color as ColorStrings} />
                default:
                  break
              }
            }
          })}
          tabBar={MainTabBar}
          tabBarOptions={{
            activeTintColor: '#fa255e'
          }}>
          <Tab.Screen
              name={screenConst.HOME}
              component={HomeNavigator}
          />
        {
          isValidMemberShip && <Tab.Screen
              name={screenConst.STREAK}
              component={StreaksNavigator}
          />
        }
          <Tab.Screen
              name={screenConst.SETTING}
              component={SettingsHome}
          />
      </Tab.Navigator>
      }
    </>
  )
}

export default MainNavigator
