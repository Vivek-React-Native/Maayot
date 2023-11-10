import React from "react";
import {View} from "react-native";
import CurrentStreak from './Current';
import LongestStreak from './Longest';
import styles from './styles';
const Streak: React.FC = () => {
  return <View
    style={styles.streak}
  >
    <CurrentStreak/>
    <LongestStreak/>
  </View>
}
export default Streak;
