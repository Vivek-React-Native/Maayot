import React, {ReactElement} from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'
import useTheme from '../../themes/useTheme'
import {
  ColorStrings
} from "@frameworks/mobile/themes/MaayotTheme";

interface  ICardProps {
  color?: ColorStrings
  style?: ViewStyle | ViewStyle[]
  styleContainer?: ViewStyle | ViewStyle[]
  children?: ReactElement
}

const Card: React.FC<ICardProps> = (props: ICardProps) => {
  const {
    children,
    color,
    style,
    styleContainer
  } = props;
  const theme = useTheme();
  return <View
    style={[
      styles.card,
      style
    ]}
  >
    <View style={[
      styles.cardContainer,
      styleContainer,
      {backgroundColor: theme.colors[color || 'lightest']}
    ]}>
      {children}
    </View>
  </View>
};
const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingBottom: 9,
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 10
  },
});

export default Card;
