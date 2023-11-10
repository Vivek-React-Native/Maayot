import React from "react";
import {View} from "react-native";
import CurrentStreak from './Current';
import LongestStreak from './Longest';
import styles from './styles';

interface IStreakProps {
  onCurrentClick: any
  onLongestClick: any
}
const Streak: React.FC<IStreakProps> = (props: IStreakProps) => {
  const {
    onLongestClick,
    onCurrentClick,
  } = props;

  return <View
    style={styles.streak}
  >
    <CurrentStreak onCurrentClick = {onCurrentClick}/>
    <LongestStreak onLongestClick = {onLongestClick}/>
  </View>
}
export default Streak;
