import React  from 'react'
import {View, StyleSheet, ViewStyle} from 'react-native'
import { ColorStrings } from '../../themes/MaayotTheme'
import useTheme from '../../themes/useTheme'

interface ILineProps {
  color?: ColorStrings,
  style?: ViewStyle
}
const Line: React.FC<ILineProps> = ({
  color = 'gray3',
  style = styles.otherStyle
}) => {
    const theme = useTheme()
    return (
      <View style={[
        styles.container,
        style,
        {backgroundColor: theme.colors[color]}
      ]}/>
    )
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%'
  },
  otherStyle: {
    marginTop: 16,
    marginBottom: 16,
  }
});

Line.defaultProps = {
    color: 'gray3',
}

Line.defaultProps.allowFontScaling = false;

export default Line
