import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useTheme from '../../../../themes/useTheme'
import CheckedIcon from "@frameworks/mobile/icons/CheckedIcon";
import MaayotTextNotoSans from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSans";
import { charactersPreference } from '@frameworks/mobile/utils/const'
type IAnswerItemProps = {
  label: string,
  isSelected?: boolean,
  onPress: any,
}
const AnswerItem: React.FC<IAnswerItemProps> = (props: IAnswerItemProps) => {
  const theme = useTheme()
  const {
    label,
    isSelected,
    onPress
  } = props
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={[
        commonStyles.flxRow,
        styles.container,
        isSelected? {
          backgroundColor: 'rgba(5, 132, 102, 0.1)',
        }: {
          backgroundColor: theme.colors.gray5,
        }
      ]}>
        <MaayotTextNotoSans
          color={isSelected? 'primary':'gray1'}
          fontWeight="regular"
          size="small17"
          style={styles.label}
        >
          {global.characterPreference === charactersPreference.TRADITIONAL ? global.converterTraditional(label) : global.converterSimplified(label)}
        </MaayotTextNotoSans>
        <View
         style={styles.rightIcon}
        >
        {isSelected && <CheckedIcon />}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    position: 'relative',
  },
  label: {
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  rightIcon: {
    position:'absolute',
    right: 16,
    top: 15,
  }
})
export default React.memo(AnswerItem)
