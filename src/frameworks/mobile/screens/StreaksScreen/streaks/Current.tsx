import React, {useEffect} from 'react'
import {TouchableOpacity, View} from 'react-native'
import Card from "@frameworks/mobile/components/commons/Card";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import StreakWhiteIcon from "@frameworks/mobile/icons/StreakWhiteIcon";
import useTheme from '../../../themes/useTheme'
import styles from './styles';
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import {useCurrentStreaks} from "@frameworks/mobile/hooks/useStreaks";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";

interface ICurrentStreakProps {
  onCurrentClick: any
}

const CurrentStreak: React.FC<ICurrentStreakProps> = (props:ICurrentStreakProps) => {
  const {
    onCurrentClick
  } = props;
  const theme = useTheme()
  const { currentStreaks } = useCurrentStreaks();
  return (
    <Card
      style={styles.card}
      styleContainer={{
        ...styles.cardContainer,
        borderColor: theme.colors.gray3
      }}
    >
      <TouchableOpacity onPress={onCurrentClick} style={commonStyles.fullWidth}>

      <View style={styles.flexStart}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              ...styles.titleIcon
            }}>
            <StreakWhiteIcon width={19} height={20}/>
          </View>
          <MaayotTextDisplay
            color={'gray1'}
            fontWeight="regular"
            size="small16"
            style={styles.title}
          >
            Current Streaks
          </MaayotTextDisplay>
          <View style={styles.count}>
            {currentStreaks ? <>
              <MaayotText
                color={'gray1'}
                fontWeight="regular"
                size="large64"
                style={styles.counter}
              >
                {currentStreaks.counter}
              </MaayotText>
                <MaayotTextDisplay
                  color={'gray1'}
                  fontWeight="regular"
                  size="smaller14"
                  style={styles.streaksLabel}
                >
                  Streaks
                </MaayotTextDisplay>
              </>:
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
      </TouchableOpacity>
    </Card>
  )
};

export default CurrentStreak

