import React from 'react'
import { View } from 'react-native'
import Card from "@frameworks/mobile/components/commons/Card";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import StreakWhiteIcon from "@frameworks/mobile/icons/StreakWhiteIcon";
import useTheme from '../../../themes/useTheme'
import styles from './styles';
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import {useCurrentStreaks} from "@frameworks/mobile/hooks/useStreaks";

const CurrentStreak: React.FC = () => {
  const theme = useTheme()
  const { currentStreaks } = useCurrentStreaks();
  return (
    <Card
      style={styles.card}
      styleContainer={styles.cardContainer}
    >
        <View style={styles.flexStart}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              ...styles.titleIcon
            }}>
            <StreakWhiteIcon />
          </View>
          <MaayotTextDisplay
            color={'gray2'}
            fontWeight="regular"
            size="smallest12"
            style={styles.title}
          >
            Current Streaks
          </MaayotTextDisplay>
          <View style={styles.count}>
            {currentStreaks ? <MaayotText
                color={'gray1'}
                fontWeight="regular"
                size="large36"
                style={styles.counter}
              >
                {currentStreaks.counter}
              </MaayotText> :
              <MaayotTextDisplay
                color={'gray2'}
                fontWeight="regular"
                size="smaller14"
              >
                Loading
              </MaayotTextDisplay>
            }
          </View>
        </View>
    </Card>
  )
};

export default CurrentStreak

