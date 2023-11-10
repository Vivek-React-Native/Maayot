import React from 'react'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import MayotScroll from "@frameworks/mobile/components/atomic/MaayotScroll";
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import useTheme from "../../themes/useTheme";
import Line from "@frameworks/mobile/components/atomic/line";
import {CreditMenuIcon, StarMenuIcon, UserMenuIcon, NextIcon, CharacterMenuIcon} from "@frameworks/mobile/icons";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import useNavigation from "@frameworks/mobile/navigations/useNavigation";
import {navigationRoutes} from "@frameworks/mobile/utils/const";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import {useDispatch} from "react-redux";
import di from '@di';

type ISettingItemProps = {
  label: string,
  icon: any
  onPress: any,
}
const SettingItem: React.FC<ISettingItemProps> = (props: ISettingItemProps) => {
  const {
    label,
    icon,
    onPress
  } = props;
  return <View><TouchableOpacity style={[
    menuItemStyles.container
  ]} onPress={onPress}>
    <View style={[
      commonStyles.flxRow,
      commonStyles.spBetween,
      menuItemStyles.rowContainer
    ]}>
      <View style={[
        commonStyles.flxRow,
        menuItemStyles.labelContainer
      ]}>
      {icon}
      <MaayotText
        color={'gray1'}
        fontWeight="regular"
        size="small17"
        style={menuItemStyles.label}
      >
        {label}
      </MaayotText>
      </View>
      <View style={menuItemStyles.rightIcon}>
        <NextIcon stroke={'grey'}/>
      </View>
    </View>
    <Line style={menuItemStyles.line}/>
  </TouchableOpacity>
  </View>
}
const menuItemStyles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    paddingHorizontal: 16,
    marginVertical:0,
  },
  rowContainer: {
    alignItems:'center',
    paddingVertical: 22,
  },
  labelContainer: {
    paddingLeft: 12,
  },
  label: {
    marginHorizontal: 19,
    lineHeight: 22
  },
  line: {
    marginHorizontal: 0,
    marginVertical: 0,
    marginBottom: 16
  },
  rightIcon: {
    paddingRight: 12,
  }
})

const SettingScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {navigate} = useNavigation()
  const toAccountSettingFn = async () => {
    navigate(navigationRoutes.NAVIGATION_SETTING_PATH, {
      screen: navigationRoutes.NAVIGATION_SETTING_ACCOUNT_PATH
    })
  }
  const toMyPlanFn = async () => {
    navigate(navigationRoutes.NAVIGATION_SETTING_PATH, {
      screen: navigationRoutes.NAVIGATION_SETTING_PLAN_PATH
    })
  }

  const toLevelFn = async () => {
    navigate(navigationRoutes.NAVIGATION_SETTING_PATH, {
      screen:navigationRoutes.NAVIGATION_SETTING_LEVEL_PATH
    })
  }
  const toLanguageFn = async () => {
    navigate(navigationRoutes.NAVIGATION_SETTING_PATH, {
      screen:navigationRoutes.NAVIGATION_SETTING_LANGUAGE_PATH
    })
  }
  const handleLogoutFn = async () => {
    return await di.session.signOut(dispatch);
  }
  return (<>
      <SafeAreaView style={{
        backgroundColor: theme.colors.lightest,
      }}>
        <MayotScroll>
          <View style={{
            backgroundColor: theme.colors.lightest,
            paddingTop: 10,
          }}>
            <SettingItem
              label={'Account Setting'}
              icon={<UserMenuIcon/>}
              onPress={toAccountSettingFn}
            />
            <SettingItem
              label={'My Plan'}
              icon={<CreditMenuIcon/>}
              onPress={toMyPlanFn}
            />
            <SettingItem
              label={'My Level'}
              icon={<StarMenuIcon/>}
              onPress={toLevelFn}
            />
            <SettingItem
              label={'Character Preference'}
              icon={<CharacterMenuIcon/>}
              onPress={toLanguageFn}
            />
            <View style={[
                commonStyles.fullWidth,
                commonStyles.alignItemsStart,
                menuItemStyles.container
              ]}>
                <MayotButton
                  onPress={handleLogoutFn}
                  label={'Logout'}
                  color={'warning'}
                  bgColor={'lightest'}
                  fontWeight={'regular'}
                  fontWeightNumber={'600'}
                  size='small17'
                />
              </View>
          </View>
        </MayotScroll>
      </SafeAreaView>
    </>
  )
}

export default SettingScreen

