import React from 'react'
import {View, StyleSheet} from 'react-native'
// @ts-ignore
import CountDown from 'react-native-countdown-component'
import { useDispatch } from 'react-redux'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useTheme from '../../../themes/useTheme'
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";
import {countdownDateFormat, countdownTimeFormat} from "@frameworks/mobile/utils/const";

type IUpgradeProps = {
  bgColor?: ColorStrings
  until: number,
}
const Counter: React.FC<IUpgradeProps> = (props: IUpgradeProps) => {
  const {
    bgColor = 'primary3',
    until
  } = props;
  const theme = useTheme()
  const dispatch = useDispatch()
  const onCounterDone = () => {}
  return (
    <View style={[
      styles.container,
      {borderTopColor: theme.colors.gray3}
    ]}
    >
      <MaayotText
        color={'gray1'}
        fontWeight="regular"
        size="smaller14"
        style={styles.center}
      >
        You can read it in :
      </MaayotText>
      <View
        style={[
          styles.row,
          styles.center
        ]}
      >
        <CountDown
          until={until}
          size={14}
          showSeparator
          onFinish={onCounterDone}
          digitStyle={{
            ...styles.item,
            backgroundColor: theme.colors[bgColor]
          }}
          timeLabels={{
            d:'Days',
            h:'Hrs',
            m:'Mins',
            s:'Secs'
          }}
          timeToShow={until > 86400 ? countdownDateFormat : countdownTimeFormat}
          timeLabelStyle={{
            fontSize:10,
            color: theme.colors[bgColor],
            fontFamily: 'SfProText-Regular'
          }}
          separatorStyle={{
            ...styles.center,
            ...styles.normal,
            fontWeight: 'bold',
            paddingBottom: 16,
          }}
          digitTxtStyle={{
            ...styles.normal,
            fontSize: theme.typography.size.smaller14,
            color: theme.colors.lightest,
          }}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  row: {
    flexDirection:'row',
    marginTop: 8
  },
  normal: {
    fontWeight:'normal'
  },
  item: {
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 4,
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
  },
});
export default Counter

