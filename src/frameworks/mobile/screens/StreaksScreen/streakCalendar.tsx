import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
//@ts-ignore
import {Calendar, LocaleConfig} from 'react-native-calendars';
import useTheme from "../../themes/useTheme";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import PrevIcon from "@frameworks/mobile/icons/prevIcon";
import NextIcon from "@frameworks/mobile/icons/nextIcon";
import {getDefaultLocale} from "@frameworks/mobile/utils/utils";

LocaleConfig.locales['default'] = getDefaultLocale();
LocaleConfig.defaultLocale = 'default';
interface iCalendarHeaderProps {
  date?:any
}
const CalendarHeader: React.FC<iCalendarHeaderProps> = (props: iCalendarHeaderProps) => {
  const {
    date
  } = props;
  return <View style={styles.header}><MaayotText
    color={'gray1'}
    fontWeight="bold"
    size="normal20"
    style={{lineHeight: 21}}
  >{date.toString("MMMM yyyy")}</MaayotText>
  </View>
}

interface iCalendarProps {
  activeStartDate: Date
  handlePreClick: any
  handleNextClick: any
  markedDates: any
}
const StreakCalendar: React.FC<iCalendarProps> = (props: iCalendarProps) => {

  const {
    activeStartDate,
    handlePreClick,
    handleNextClick,
    markedDates
  } = props;

  const theme = useTheme()
  return (
    <View style={styles.calendarView}>
      <View style={styles.arrowBtn}>
        <TouchableOpacity onPress={handlePreClick} style={{marginRight: 28}}>
          <PrevIcon/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextClick} >
          <NextIcon/>
        </TouchableOpacity>
      </View>
      <Calendar
        key={activeStartDate + ""}
        current={activeStartDate}
        hideArrows={true}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={0}
        disableAllTouchEventsForDisabledDays={true}
        renderHeader={(date: any) => <CalendarHeader date={date}/>}
        enableSwipeMonths={false}
        markingType={'custom'}
        markedDates={markedDates}
        theme={{
          calendarBackground: theme.colors.lightest,
          textSectionTitleColor: "rgba(60, 60, 67, 0.3)",
          selectedDayBackgroundColor: "rgba(6, 132, 102, 0.1)",
          selectedDayTextColor: theme.colors.primary,
          todayTextColor: theme.colors.primary,
          dayTextColor: theme.colors.primary,
          dotColor: theme.colors.lightest,
          selectedDotColor: theme.colors.primary,
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 19,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
          dotStyle: styles.dotStyle,
          textDayStyle: {
            height: 43,
            width: 43,
            paddingTop: 5,
            alignItems: 'center',
            textAlign: 'center',
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  lfxRow: {
    flexDirection: 'row',
  },
  header: {
    width: '100%',
    paddingTop: 13,
    paddingBottom: 7,
  },
  calendarView: {
    width: '100%',
  },
  title: {
    justifyContent: 'center',
    marginRight: 10,
    lineHeight:24,
  },

  dotStyle: {
    top: 8,
    right: 8,
    position: 'absolute'
  },
  arrowBtn: {
    position: 'absolute',
    right: 16,
    top: 18,
    zIndex: 1000,
    flexDirection: 'row',
  }
});

export default StreakCalendar
