import React, {useEffect, useMemo, useState, useCallback} from 'react'
import Streak from './streaks';
import useMemberShip from "@frameworks/mobile/hooks/useMembership";
import TopBanner from "@frameworks/mobile/components/atomic/topBanner";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import {
  getCurrentMarkedDates,
  getLongestMarkedDates,
  useCurrentStreaks,
  useLongestStreaks, useMonthStreaks
} from "@frameworks/mobile/hooks/useStreaks";
import StreakCalendar from "@frameworks/mobile/screens/StreaksScreen/streakCalendar";
import moment, {Moment} from "moment-timezone";
import {serverDateFormat} from "@frameworks/mobile/utils/const";
import MayotScroll from "@frameworks/mobile/components/atomic/MaayotScroll";
import {Dimensions, RefreshControl, SafeAreaView, ScrollView} from "react-native";
import useTheme from "../../themes/useTheme";
import {usePlatform} from "@hooks";
const StreakScreen: React.FC = () => {
  const theme = useTheme();
  const { isIos } = usePlatform()
  const { isValidMemberShip } = useMemberShip();
  const {currentStreaks: current, loadCurrentStreak} = useCurrentStreaks();
  const {longestStreak: longest, loadLongestStreak} = useLongestStreaks();
  const {
    currentMonthStreak,
    activeMonth,
    setActiveMonth,
    loadMonthStreak
  } = useMonthStreaks();

  const [activeStartDate, setActiveStartDate] = useState(moment().toDate())
  const [markedDates, setMarkedDates] = useState({});
  const [currentActive, setCurrentActive] = useState(false);
  const [longestActive, setLongestActive] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    Promise.all([
      loadCurrentStreak(),
      loadMonthStreak(),
      loadLongestStreak(),
    ]).then(res => {
      setRefreshing(false)
    }).catch((e: any) => {
      setRefreshing(false)
    })
  }, [activeMonth]);


  useEffect(() => {
    setActiveMonth(`${moment().format('YYYY')}-${moment().format('MM')}`)
  },[])

  const handlePreClick = () => {
    setCurrentActive(false);
    setLongestActive(false);
    const newActiveDate = moment(activeStartDate).subtract(1, 'months');
    setActiveStartDate(newActiveDate.toDate())
    setActiveMonth(newActiveDate.format('YYYY-MM'))
  }
  const handleNextClick = () => {
    setCurrentActive(false);
    setLongestActive(false);
    const newActiveDate = moment(activeStartDate).add(1, 'months');
    setActiveStartDate(newActiveDate.toDate())
    if(newActiveDate.month() <= moment().month()) {
      setActiveMonth(newActiveDate.format('YYYY-MM'))
    }
  }

  const monthList: Moment[] | undefined = useMemo(() => {
    if (currentMonthStreak?.dates?.length) {
      return currentMonthStreak?.dates.map((date: string) => moment(date, serverDateFormat))
    }
  }, [currentMonthStreak])

  const monthMarkedDates = getCurrentMarkedDates(monthList);
  useEffect(() => {
    if(!currentActive && !longestActive) {
      setMarkedDates(monthMarkedDates);
    }
  },[monthMarkedDates, currentActive, longestActive])

  const currentList: Moment[] | undefined = useMemo(() => {
    if (current?.dates?.length) {
      return current?.dates.map((date) => moment(date, serverDateFormat))
    }
  }, [current])

  const currentMarkedDates = getCurrentMarkedDates(currentList);

  const onCurrentClick = () => {
    setLongestActive(false);
    if(currentActive) {
      setCurrentActive(false)
    } else {
      setCurrentActive(true);
      if (currentList?.length) {
        setActiveStartDate(currentList[0].toDate());
        setActiveMonth(currentList[0].format('YYYY-MM'))
      }
      if (currentMarkedDates) {
        setMarkedDates(currentMarkedDates);
      }
    }
  }

  const startLongest = useMemo(() => {
    if (longest?.fromDate) {
      return moment(longest.fromDate, serverDateFormat)
    }
  }, [longest])

  const longestMarkedDates = getLongestMarkedDates(longest);

  const onLongestClick = () => {
    setCurrentActive(false);
    if(longestActive) {
      setLongestActive(false)
    } else {
      setLongestActive(true)
      if (startLongest) {
        setActiveStartDate(startLongest.toDate());
        setActiveMonth(startLongest.format('YYYY-MM'))
      }
      if (longestMarkedDates) {
        setMarkedDates(longestMarkedDates);
      }
    }
  }

  return (
    <SafeAreaView style={{
      backgroundColor: theme.colors.lightest,
    }}>
      <TopBanner>
        <MaayotText
          color={'lightest'}
          fontWeight="regular"
          size="smaller14"
          style={{lineHeight: 21}}
        >
          {`${longest?.counter &&
          current?.counter &&
          longest?.counter - current?.counter} more streaks to beat your longest record`}
        </MaayotText>
      </TopBanner>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={{
          height: Dimensions.get('screen').height - 175- (isIos ? 30 : 0)
        }}
      >
      {isValidMemberShip && <Streak
        onLongestClick={onLongestClick}
        onCurrentClick={onCurrentClick}
      />}
      <StreakCalendar
        activeStartDate={activeStartDate}
        handlePreClick={handlePreClick}
        handleNextClick={handleNextClick}
        markedDates={markedDates}
      />
      </ScrollView>
    </SafeAreaView>
  )
}

export default StreakScreen

