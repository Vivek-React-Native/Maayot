import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import RewardIcon from "@frameworks/mobile/icons/RewardIcon";
import useTheme from '../../../themes/useTheme'
import styles from './styles';
import Card from "@frameworks/mobile/components/commons/Card";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import {useLongestStreaks} from "@frameworks/mobile/hooks/useStreaks";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";

interface ILongestStreakProps {
  onLongestClick: any
}

const LongestStreak: React.FC<ILongestStreakProps> = (props: ILongestStreakProps) => {
  const {
    onLongestClick
  } = props;
  const theme = useTheme()
  const {longestStreak: longest} = useLongestStreaks();

  return <Card
    style={styles.card}
    styleContainer={{
      ...styles.cardContainer,
      borderColor: theme.colors.gray3
    }}
  >
    <TouchableOpacity onPress={onLongestClick}  style={commonStyles.fullWidth}>
      <View style={styles.flexStart}>
        <View
          style={{
            backgroundColor: theme.colors.primary,
            ...styles.titleIcon
          }}>
          <RewardIcon width={24} height={24}/>
        </View>
        <MaayotTextDisplay
          color={'gray1'}
          fontWeight="regular"
          size="small16"
          style={styles.title}
        >
          Longest Streaks
        </MaayotTextDisplay>
        <View style={styles.count}>
          {longest ? <>
              <MaayotText
                color={'gray1'}
                fontWeight="regular"
                size="large64"
                style={styles.counter}
              >
                {longest.counter}
              </MaayotText>
              <MaayotTextDisplay
                color={'gray1'}
                fontWeight="regular"
                size="smaller14"
                style={styles.streaksLabel}
              >
                Streaks
              </MaayotTextDisplay>
            </> :
            <MaayotTextDisplay
              color={'gray2'}
              fontWeight="regular"
              size="smaller14"
            >Loading</MaayotTextDisplay>
          }
        </View>
      </View>
    </TouchableOpacity>
  </Card>
}

export default LongestStreak;
