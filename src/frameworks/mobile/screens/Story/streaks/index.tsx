import React from 'react'
import {View, ScrollView, Dimensions, SafeAreaView} from 'react-native'
import useTheme from '../../../themes/useTheme'
import MayotButton from "@frameworks/mobile/components/atomic/button"
import styles from '../styles'
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import Card from "@frameworks/mobile/components/commons/Card"
import {navigationRoutes} from "@frameworks/mobile/utils/const"
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import FireIcon from "@frameworks/mobile/icons/fireIcon";
import {useCurrentStreaks} from "@frameworks/mobile/hooks/useStreaks";
import streakStyles from "@frameworks/mobile/screens/Story/streaks/style";
import StreaksItem from "@frameworks/mobile/screens/Story/streaks/streakItem";

const scrollHeight = Dimensions.get('window').height - 130;

const StreaksScreen: React.FC = () => {
  const {navigate} = useNavigation()
  const theme = useTheme()
  const {currentStreaks} = useCurrentStreaks();
  const nextFn = async () => {
    navigate(navigationRoutes.NAVIGATION_FINISH_PATH, {})
  }
  return (
    <SafeAreaView
      style={[
        streakStyles.safeView,
        {backgroundColor: theme.colors.lightest}
      ]}
    >
      <Card
        style={styles.card}
        styleContainer={styles.cardContainer}
      >
        <View style={styles.cardView}>
          <ScrollView style={[
            streakStyles.scrollView,
            {height: scrollHeight}
          ]}>
            <View
              style={[
                streakStyles.content,
                commonStyles.center,
                {height: scrollHeight}
              ]}
            >
              <FireIcon/>
              <MaayotTextDisplay
                color={'gray1'}
                fontWeight="bold"
                size="largest32"
                style={streakStyles.streakTitle}
              >
                Well done!
              </MaayotTextDisplay>
              <MaayotText
                color={'gray1'}
                fontWeight="regular"
                size="smaller14"
                style={streakStyles.streaksSubtitle}
              >
                {`You’ve got ${currentStreaks?.counter} streaks in a row, keep it up!`}
              </MaayotText>
              <View style={streakStyles.streaks}>
                <StreaksItem dateAdd={-4} currentStreak={currentStreaks}/>
                <StreaksItem dateAdd={-3} currentStreak={currentStreaks}/>
                <StreaksItem dateAdd={-2} currentStreak={currentStreaks}/>
                <StreaksItem dateAdd={-1} currentStreak={currentStreaks}/>
                <StreaksItem dateAdd={0} currentStreak={currentStreaks}/>
                <StreaksItem dateAdd={1} currentStreak={currentStreaks}/>
                <StreaksItem dateAdd={2} currentStreak={currentStreaks}/>
              </View>
            </View>
          </ScrollView>
        </View>
      </Card>
      <View
        style={[
          streakStyles.nextButton,
          {backgroundColor: theme.colors.lightest}
        ]}
      >
        <MayotButton
          onPress={nextFn}
          label={'Next'}
        />
      </View>
    </SafeAreaView>
  )
}
export default StreaksScreen
