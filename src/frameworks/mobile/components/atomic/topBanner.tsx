import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import useTheme from '../../themes/useTheme'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"

type ITopBannerProps = {
  children?: any,
  styles?: StyleProp<ViewStyle>
}

const TopBanner: React.FC<ITopBannerProps> = (props: ITopBannerProps) => {
  const {
    children,
    styles: propsStyles
  } = props
  const theme = useTheme()
  return (
    <View style={[
      commonStyles.flxRow,
      commonStyles.spBetween,
      styles.viewContainer,
      {backgroundColor: theme.colors.primary2},
      propsStyles
    ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    paddingTop:10,
    paddingBottom:10,
    paddingLeft: 16,
    paddingRight: 16,
    height: 40
  },
})
export default TopBanner
