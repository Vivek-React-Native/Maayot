import React, {useEffect, useMemo, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import useTheme from '../../../themes/useTheme'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import moment from 'moment-timezone'

// @ts-ignore
import CountDown from 'react-native-countdown-component'
import {
  countdownDateFormat, countdownTimeFormat,
  secInDay, secInWeek
} from "@frameworks/mobile/utils/const"
import {momentToSec} from "@frameworks/mobile/utils/utils"

type IStoryCountdownProps = {
  onCounterDone?: any
}

const StoryCountdown: React.FC<IStoryCountdownProps> = (props: IStoryCountdownProps) => {
  const {
    onCounterDone,
  } = props
  const currentDay = moment.utc()
  const until = useMemo(() => {
    const currentDay = moment.utc()
    return (secInWeek - currentDay.weekday() * secInDay - momentToSec(currentDay)) /1000
  },[]);
  const theme = useTheme()
  return (
    <View style={[
      styles.viewContainer,
      {backgroundColor: theme.colors.primary2}
    ]}>
      <CountDown
        until={until}
        size={14}
        showSeparator
        onFinish={onCounterDone}
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
          paddingBottom:10,
          fontFamily: 'SfProText-Regular'
        }}
        timeToShow={until > 86400 ? countdownDateFormat : countdownTimeFormat}
        separatorStyle={{
          ...commonStyles.center,
          ...commonStyles.normal,
          fontSize: theme.typography.size.smaller14,
          color: theme.colors.lightest,
          paddingHorizontal: 2,
        }}
        digitTxtStyle={{
          ...commonStyles.normal,
          fontSize: theme.typography.size.smaller14,
          color: theme.colors.lightest,
          padding:0
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    paddingVertical:10,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 8,
    marginTop: 11,
  },
  item: {
    width: 20,
    height: 15,
    padding: 0,
    borderRadius: 5,
    marginLeft: 0,
    marginRight: 0,
  },
})
export default StoryCountdown
