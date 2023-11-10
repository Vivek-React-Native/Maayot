import React from 'react'
import { View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import useTheme from '../themes/useTheme'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import MaayotText from '../components/atomic/text/MaayotText'
import { ColorStrings } from '../themes/MaayotTheme'
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";

const MainTabBarItem: React.FC<any> = ({
  onPress,
  onLongPress,
  accessibilityLabel,
  labelTK,
  icon,
  color,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress || onPress}
      accessibilityLabel={accessibilityLabel}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {icon}
      <MaayotTextDisplay
        color={color}
        fontWeight="regular"
        fontWeightNumber={'500'}
        size="smallest12"
      >
        {labelTK}
      </MaayotTextDisplay>
    </TouchableOpacity>
  )
}

const MainTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const isIos = true;
  const theme = useTheme()
  const iconPadding = 3
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors['lightest'] }}>
      <View
        style={{
          backgroundColor: theme.colors.lightest,
          borderTopColor: theme.colors.gray4,
          borderTopWidth: 1,
          height: theme.grid.gridFactor(3.5),
          left: 0,
          right: 0,
          flexDirection: 'row',
        }}>
        {state.routes.map((route, routeIndex) => {
          const { options } = descriptors[route.key]
          const active = routeIndex === state.index
          const color: ColorStrings = active ? 'primary' : 'grey'
          let statusBarColorOfPath: ColorStrings = 'primary'
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name

          let icon = options.tabBarIcon && options.tabBarIcon({focused: false, color: active ? 'primary':'grey', size:12})

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
            !isIos && StatusBar.setBackgroundColor(theme.colors[statusBarColorOfPath])
            if (!active && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          const onLongPress = () => {
            !isIos && StatusBar.setBackgroundColor(theme.colors[statusBarColorOfPath])
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          return (
            <MainTabBarItem
              key={routeIndex}
              labelTK={label}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              icon={icon}
              onPress={onPress}
              onLongPress={onLongPress}
              color={color}
            />
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default MainTabBar
