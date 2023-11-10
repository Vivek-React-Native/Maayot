import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import SettingsNavigator from '../settings/SettingsNavigator'
import StreaksNavigator from '../streaks/StreaksNavigator'
import {
  PaperIcon,
  HomeIconAndroid,
  UpSquareIcon,

  CreditMenuIcon,
  RewardMenuIcon,
  StarMenuIcon,
  StreakMenuIcon,
  UserMenuIcon,
  CharacterMenuIcon
} from '../../icons'
import { navigationRoutes, screenConst } from '@frameworks/mobile/utils/const'
import useMemberShip from '@frameworks/mobile/hooks/useMembership'
import StoryNavigator from '@frameworks/mobile/components/story/StoryNavigator'
import MaayotText from '@frameworks/mobile/components/atomic/text/MaayotText'
import { StyleSheet, View } from 'react-native'
import useTheme from '../../themes/useTheme'
import HomeScreen from '@frameworks/mobile/screens/HomeScreen'
import Line from '@frameworks/mobile/components/atomic/line'
import { isSunday } from '@frameworks/mobile/utils/utils'
import di from '@di'
import { useDispatch } from 'react-redux'
import { ColorStrings } from '@frameworks/mobile/themes/MaayotTheme'

export const memberShipCheckConst = {
  full: 1,
  sunDay: 2,
}
type IDrawerConfig =  {
  title: string,
  component: React.FC,
  navigation: string,
  checkMembership?: number,
  cateTitle?: string,
  icon: any,
  options?: any,
}
export const DrawerConfig:IDrawerConfig[] = [
  {
    title: 'Home',
    component: HomeScreen,
    navigation: screenConst.HOME,
    icon: HomeIconAndroid
  },
  {
    title: screenConst.READ_STORY,
    component: StoryNavigator,
    navigation: screenConst.READ_STORY,
    icon: PaperIcon,
    checkMembership: memberShipCheckConst.sunDay
  },
  // {
  //   title: screenConst.UPGRADE_PACKAGE,
  //   component: HomeScreen,
  //   navigation: screenConst.UPGRADE_PACKAGE,
  //   icon: UpSquareIcon
  // },
  {
    cateTitle: screenConst.STREAK,
    title: screenConst.STREAK,
    component: StreaksNavigator,
    navigation: screenConst.STREAK,
    icon: StreakMenuIcon,
    checkMembership: memberShipCheckConst.full
  },
  {
    title: screenConst.HIGHEST_STREAK,
    component: StreaksNavigator,
    navigation: screenConst.HIGHEST_STREAK,
    icon: RewardMenuIcon,
    checkMembership: memberShipCheckConst.full
  },
  {
    cateTitle: 'Settings',
    title: screenConst.ACCOUNT_SETTING,
    component: SettingsNavigator,
    navigation: navigationRoutes.NAVIGATION_SETTING_PATH,
    options: {
      screen: navigationRoutes.NAVIGATION_SETTING_ACCOUNT_PATH
    },
    icon: UserMenuIcon,
  },
  {
    title: screenConst.MY_PLAN,
    component: SettingsNavigator,
    navigation: navigationRoutes.NAVIGATION_SETTING_PATH,
    options: {
      screen: navigationRoutes.NAVIGATION_SETTING_PLAN_PATH
    },
    icon: CreditMenuIcon
  },
  {
    title: screenConst.MY_LEVEL,
    component: SettingsNavigator,
    navigation: navigationRoutes.NAVIGATION_SETTING_PATH,
    options: {
      screen: navigationRoutes.NAVIGATION_SETTING_LEVEL_PATH
    },
    icon: StarMenuIcon
  },
  {
    title: screenConst.MY_LANGUAGE,
    component: SettingsNavigator,
    navigation: navigationRoutes.NAVIGATION_SETTING_PATH,
    options: {
      screen: navigationRoutes.NAVIGATION_SETTING_LANGUAGE_PATH
    },
    icon: CharacterMenuIcon
  }
]
type IMenuLabel = {
  label: string,
  color?: ColorStrings,
  focused: boolean
}
const MenuLabel: React.FC<IMenuLabel> = (props: IMenuLabel) => {
  const {
    label,
    focused,
    color: colorProps
  } = props
  const color: ColorStrings = colorProps? colorProps : focused ? 'primary' : 'gray1';
  return <MaayotText
    color={color}
    fontWeight="regular"
    fontWeightNumber={'500'}
    size="smaller14"
    style={{
      lineHeight: 24,
      letterSpacing: 0.1
    }}
  >
    {label}
  </MaayotText>
}

const CustomDrawerContent = (props: any) => {
  const {
    state
  } = props
  const theme = useTheme()
  const dispatch = useDispatch()
  const [menuConfig, setMenuConfig] = useState<IDrawerConfig[]>(DrawerConfig);
  const { isValidMemberShip } = useMemberShip()

  const _isSunday = useMemo(() => {
    return isSunday()
  }, []);

  const handleClickLogout = async () => {
    return await di.session.signOut(dispatch)
  }

  useEffect(() => {
    if(!isValidMemberShip) {
      const newDrawer = DrawerConfig.reduce((acc: IDrawerConfig[], curr: IDrawerConfig) => {
        if(curr.checkMembership === memberShipCheckConst.sunDay && _isSunday ||
          ( curr.checkMembership !== memberShipCheckConst.full &&
            curr.checkMembership !== memberShipCheckConst.sunDay)
        ) {
          acc.push(curr);
        }
        return acc;
      },[])
      setMenuConfig(newDrawer);
    } else {
      setMenuConfig(DrawerConfig);
    }
  },[isValidMemberShip])

  return (
    <DrawerContentScrollView {...props}>
      {/*<DrawerItemList {...props} />*/}
      <View style={menuItemStyles.activeContainer}>
        <MaayotText
          color={'gray1'}
          fontWeight="regular"
          fontWeightNumber={'500'}
          size="larger24"
          style={menuItemStyles.activeLabel}
        >
          {menuConfig[state.index]?.title}
        </MaayotText>
      </View>
      {
        menuConfig.map((drawerMenu: any, key) => {
          return <>
            {drawerMenu.cateTitle && <View style={menuItemStyles.categoryContainer}>
                <Line style={menuItemStyles.line} />
                <MaayotText
                    color={'gray2'}
                    fontWeight="regular"
                    size="smallest12"
                    style={menuItemStyles.categoryLabel}
                >
                  {drawerMenu.title}
                </MaayotText>
            </View>
            }
            <DrawerItem
              key={key}
              label={({ color, focused }) =>
                <MenuLabel
                  label={drawerMenu.title}
                  color={color}
                  focused={focused}
                />
              }
              focused={state.index == key}
              activeTintColor={theme.colors.primary}
              inactiveTintColor={theme.colors.gray2}
              activeBackgroundColor={'rgba(6, 132, 102, 0.08)'}
              onPress={() => props.navigation.navigate(drawerMenu.navigation, drawerMenu.options)}
              icon={({ focused }) => {
                return <drawerMenu.icon stroke={focused ? 'primary' : 'gray2'} />
              }}
              style={menuItemStyles.container}
            />
          </>
        })
      }
      <DrawerItem
        label={({ color, focused }) =>
          <MenuLabel
            label="Logout"
            color='warning'
            focused={focused}
          />
        }
        activeTintColor={theme.colors.primary}
        inactiveTintColor={theme.colors.gray2}
        activeBackgroundColor={'rgba(6, 132, 102, 0.08)'}
        onPress={handleClickLogout}
        style={menuItemStyles.container}
      />
    </DrawerContentScrollView>
  )
}

const menuItemStyles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    paddingHorizontal: 12
  },
  activeContainer: {
    paddingVertical: 25,
    marginHorizontal: 19
  },
  activeLabel: {
    lineHeight: 24,
    letterSpacing: 0.1
  },
  categoryContainer: {
    marginVertical: 0
  },
  categoryLabel: {
    marginHorizontal: 19,
    lineHeight: 14
  },
  line: {
    marginHorizontal: 0,
    marginVertical: 0,
    marginBottom: 16
  }
})

export default CustomDrawerContent;