import React, { ReactElement } from 'react'
import {NativeSyntheticEvent, NativeTouchEvent, Text, TextStyle, View, TouchableOpacity, StyleSheet} from 'react-native'
import { ColorStrings, FontSizeStrings } from '../../../themes/MaayotTheme'
import useTheme from '../../../themes/useTheme'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import MaayotLoader from "@frameworks/mobile/components/atomic/loader";

interface IMaayotTextProps {
    style?: TextStyle
    textStyle?: TextStyle
    children?: string | ReactElement,
    label?: string
    color?: ColorStrings
    bgColor?: ColorStrings
    labelColor?:ColorStrings
    size?: FontSizeStrings
    fontWeight?: 'bold' | 'regular' | 'semibold',
    fontWeightNumber?: '400'|'600'
    disabled?: boolean,
    isLoading?:boolean,
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const MayotButton: React.FC<IMaayotTextProps> = ({
    color: propColor,
    bgColor: propBgColor,
    fontWeight,
    fontWeightNumber,
    style: propStyle,
    textStyle: propTextStyle,
    children,
    size,
    label,
    disabled = false,
    isLoading = false,
    onPress,
}) => {
    const theme = useTheme()
    const color =  propColor || (disabled ? 'lightest':'primary');
    const bgColor = theme.colors[propBgColor || (disabled? 'gray3':'primary')]
    const style: TextStyle = {
        flexShrink: 1,
        backgroundColor: bgColor,
        ...propStyle,
    }
    return (

      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
      >
      <View style={[
        styles.container,
        styles.center,
        style
      ]}>
        { isLoading && <MaayotLoader color='lightest' /> || label && <MaayotText
            color={color}
            fontWeight={fontWeight}
            fontWeightNumber={fontWeightNumber}
            size={size}
            style={{
              ...styles.buttonLineHeight,
              ...propTextStyle
            }}>
            {label}
          </MaayotText>
        }
        {children}
      </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    alignItems:'center',
    borderRadius: 8,
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
  },
  buttonLineHeight: {
    lineHeight: 22,
    letterSpacing: -0.408
  }
});

MayotButton.defaultProps = {
    style: undefined,
    color: 'lightest',
    size: 'normal18',
    fontWeight: 'regular',
    fontWeightNumber: '600',
}

export default MayotButton
