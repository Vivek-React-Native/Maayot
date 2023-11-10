import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText"
import useTheme from '../../../themes/useTheme'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import moment from 'moment-timezone'

// @ts-ignore
import CountDown from 'react-native-countdown-component'
import {countDownCheckTimeConst, countdownTimeFormat, secInDay} from "@frameworks/mobile/utils/const"
import {momentToSec} from "@frameworks/mobile/utils/utils"
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme"

type IStoryCountdownProps = {
  onCounterDone?: any
}

const StoryCountdown: React.FC<IStoryCountdownProps> = (props: IStoryCountdownProps) => {
  const {
    onCounterDone,
  } = props
  const currentDay = moment.utc()
  const until = (secInDay  - momentToSec(currentDay)) / 1000

  const [bgColor, setBgColor] = useState<ColorStrings>('success')
  const theme = useTheme()
  const onChangeCountDown = (value:number) => {
    if(value <= countDownCheckTimeConst.RED * 60) {
      setBgColor('warning')
    } else if(value <= countDownCheckTimeConst.ORANGE * 60) {
      setBgColor('primary2')
    }
  }
  useEffect(() => {
    onChangeCountDown(until)
  },[])
  return (
    <View style={[
      commonStyles.flxRow,
      commonStyles.spBetween,
      styles.viewContainer,
      {backgroundColor: theme.colors[bgColor]}
    ]}>
      <MaayotText
        color={'lightest'}
        fontWeight="regular"
        size="smaller14"
      >
        The story will change in
      </MaayotText>
      <CountDown
        until={until}
        size={14}
        showSeparator
        onFinish={onCounterDone}
        onChange={onChangeCountDown}
        digitStyle={{
          ...styles.item,
        }}
        timeLabels={{
          d:'Days',
          h:'Hrs',
          m:'Mins',
          s:'Secs'
        }}
        timeLabelStyle={{
          fontSize:10,
          color: theme.colors.lightest,
          fontFamily: 'SfProText-Regular'
        }}
        timeToShow={countdownTimeFormat}
        separatorStyle={{
          ...commonStyles.normal,
          fontSize: theme.typography.size.smaller14,
          color: theme.colors.lightest,
        }}
        digitTxtStyle={{
          ...commonStyles.normal,
          fontSize: theme.typography.size.smaller14,
          color: theme.colors.lightest,
          padding:0,
        }}
      />
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
  item: {
    width: 20,
    height: 15,
    padding: 0,
    borderRadius: 5,
    marginHorizontal: 5,
  },
})
export default StoryCountdown
