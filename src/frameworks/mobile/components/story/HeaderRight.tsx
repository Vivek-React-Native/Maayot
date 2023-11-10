import React from 'react'
import {View, StyleSheet} from 'react-native'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText"
import useTheme from '../../themes/useTheme'
import ProgressCircle from 'react-native-progress-circle'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"

type IHeaderRightProps = {
  step: number,
  total: number
}

const HeaderRight: React.FC<IHeaderRightProps> = (props: IHeaderRightProps) => {
  const {step, total} = props
  const theme = useTheme()
  return (
    <View style={[
      commonStyles.flxRow,
      commonStyles.center,
      styles.container
    ]}>
      <View style={[
        commonStyles.flxRow,
        commonStyles.center,
        styles.outer
      ]}>
        <ProgressCircle
          percent={Math.round(step/total * 100)}
          radius={11}
          borderWidth={2}
          color={theme.colors.lightest}
          bgColor={theme.colors.primary}
          containerStyle={styles.inner}
          outerCircleStyle={styles.outer}
        />
      </View>
      <MaayotText
        color={'lightest'}
        size="small17"
        fontWeightNumber={'600'}
        style={{
          ...styles.title,
        }}
      >
        {`${step} of ${total}`}
      </MaayotText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 20,
  },
  outer: {
    width: 22,
    height: 22,
    borderRadius: 22,
  },
  inner: {
    width: 17,
    height: 17,
    borderRadius: 17,
  },
  title: {
    paddingRight: 16,
    lineHeight: 22,
    paddingLeft: 16
  },
})
export default React.memo(HeaderRight)
