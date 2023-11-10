import React, {useMemo} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useTheme from '../../../../themes/useTheme'
import CheckedIcon from "@frameworks/mobile/icons/CheckedIcon";
import WrongIcon from "@frameworks/mobile/icons/WrongIcon";
import MaayotTextNotoSans from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSans";
import { charactersPreference } from '@frameworks/mobile/utils/const'
type IResultItemProps = {
  label: string,
  isAnswer?: boolean,
  isResult?: boolean,
  percent: number,
}
const ResultItem: React.FC<IResultItemProps> = (props: IResultItemProps) => {
  
  const theme = useTheme()
  const {
    label,
    isAnswer,
    isResult,
    percent
  } = props;
  const isWrongAnswer = useMemo(() => {
    return isAnswer && !isResult
  },[isAnswer, isResult]);
  return (
    <>
      <View>
        <View style={[
          styles.container,
          isResult? {
            backgroundColor: 'rgba(5, 132, 102, 0.1)',
          }: {
            backgroundColor: isWrongAnswer ? 'rgba(237, 106, 94, 0.1)' : theme.colors.gray5,
          }
        ]}>
          <View
            style={styles.rightIcon}
          >
            {isResult && <CheckedIcon />}
            {isWrongAnswer && <WrongIcon />}
          </View>
          {
            (isAnswer || isResult) && (<MaayotText
              color={'gray2'}
              fontWeight="regular"
              size="smallest12"
              style={styles.label}
            >
              <>{`${isAnswer? 'Your answer. ':''}${isResult?'Right answer':isWrongAnswer ?'Wrong answer':''}`}</>
            </MaayotText>)
          }
          <MaayotTextNotoSans
            color={isResult? 'primary':'gray1'}
            fontWeight="regular"
            size="small17"
            style={styles.answer}
          >
            {global.characterPreference === charactersPreference.TRADITIONAL ? global.converterTraditional(label) : global.converterSimplified(label)}
          </MaayotTextNotoSans>
          <MaayotText
            color={'gray1'}
            fontWeight="regular"
            size="smaller14"
            style={styles.percentText}
          >
            {`${percent}% of learners answered this`}
          </MaayotText>
        </View>
        <View
          style={[
            styles.percent,
            {
              backgroundColor: isResult? theme.colors.primary: isWrongAnswer? theme.colors.warning : theme.colors.gray1,
              width: `${percent}%`
            }
          ]}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 19,
    borderRadius: 8,
    marginTop: 12,
    position: 'relative',
    overflow:'hidden',
  },
  label: {
    lineHeight: 14,
  },
  answer: {
    lineHeight: 22,
    marginTop: 4,
    letterSpacing: -0.408,
  },
  percent: {
    height: 4,
    position:'absolute',
    bottom: 0,
    left: 0,
    borderRadius: 100,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
  },
  percentText: {
    lineHeight: 18,
    marginTop: 8,
  },
  rightIcon: {
    position:'absolute',
    right: 16,
    top: 15,
  }
})
export default React.memo(ResultItem)
