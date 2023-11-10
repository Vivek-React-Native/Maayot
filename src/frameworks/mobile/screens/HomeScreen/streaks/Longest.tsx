import React from 'react'
import {View} from 'react-native'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import RewardIcon from "@frameworks/mobile/icons/RewardIcon";
import useTheme from '../../../themes/useTheme'
import styles from './styles';
import Card from "@frameworks/mobile/components/commons/Card";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import {useLongestStreaks} from "@frameworks/mobile/hooks/useStreaks";

const LongestStreak: React.FC = () => {
  const theme = useTheme()
  const { longestStreak } = useLongestStreaks();

  return <Card
    style={styles.card}
    styleContainer={styles.cardContainer}
  >
    <View style={styles.flexStart}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          ...styles.titleIcon
        }}>
        <RewardIcon />
      </View>
      <MaayotTextDisplay
        color={'gray2'}
        fontWeight="regular"
        size="smallest12"
        style={styles.title}
      >
        Longest Streaks
      </MaayotTextDisplay>
      <View style={styles.count}>
        {longestStreak ? <MaayotText
            color={'gray1'}
            fontWeight="regular"
            size="large36"
            style={styles.counter}
          >
            {longestStreak.counter}
          </MaayotText> :
          <MaayotTextDisplay
            color={'gray2'}
            fontWeight="regular"
            size="smaller14"
          >Loading</MaayotTextDisplay>
        }
      </View>
    </View>
  </Card>
}

export default LongestStreak;
