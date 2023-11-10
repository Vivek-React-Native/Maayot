import React from 'react'
import {StyleSheet, View, Dimensions, SafeAreaView} from "react-native";
import useTheme from "../../themes/useTheme";
import { ColorStrings } from '../../themes/MaayotTheme'

interface IMaayotBackgroundProps {
  children?: any,
  color?: ColorStrings
}
const MaayotBackground: React.FC<IMaayotBackgroundProps> = (props:IMaayotBackgroundProps) => {
  const {
    children,
    color = 'primary'
  } = props;
  const theme = useTheme();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height * 0.6;
  return (
    <>
      <View style={[
        styles.absolute,
        {
          backgroundColor: theme.colors[color],
          width,
          height
        }
      ]}>
      </View>
      <View style={[
        styles.triangleCorner,
        styles.absolute,
        {
          borderTopColor: theme.colors[color],
          width,
          borderRightWidth: width,
          top:height,
        }
      ]}/>
      {children}
    </>
  )
};
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  triangleCorner: {
    borderStyle: "solid",
    borderTopWidth: 75,
    backgroundColor: "transparent",
    borderRightColor: "transparent",
  },
});

export default MaayotBackground;
