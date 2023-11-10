import React from 'react'
import {View} from 'react-native'
import {serverDateFormat} from "@frameworks/mobile/utils/const"
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import StreakFinishIcon from "@frameworks/mobile/icons/streakFinishIcon";
import StreakFinishUnCheckIcon from "@frameworks/mobile/icons/streakFinishUnCheckIcon";
import moment from "moment-timezone";
import streakStyles from "@frameworks/mobile/screens/Story/streaks/style";

type IStreaksItemProps = {
  dateAdd: number,
  currentStreak: any
}
const StreaksItem: React.FC<IStreaksItemProps> = (props: IStreaksItemProps) => {
  const {
    dateAdd,
    currentStreak
  } = props;

  let valueMoment = moment(),
    isActive = false
  if (dateAdd !== 0) {
    valueMoment = moment().add(dateAdd, 'days')
  }
  if( dateAdd <= 0 ) {
    isActive = currentStreak?.dates?.indexOf(valueMoment.format(serverDateFormat)) > -1
  }

  return <View style={streakStyles.streaksItem}>
    {isActive ? <StreakFinishIcon/> : <StreakFinishUnCheckIcon/>}
    <MaayotText
      color={isActive ? 'lightest' : 'primary3'}
      fontWeight="regular"
      size="smallest12"
      fontWeightNumber={'600'}
      style={streakStyles.streaksItemText}
    >
      {valueMoment.format('D')}
    </MaayotText>
  </View>
}
export default StreaksItem
