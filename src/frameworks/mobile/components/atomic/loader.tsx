import React, {useEffect, useRef, useState} from 'react'
import {View, StyleSheet, Animated} from 'react-native'
import useTheme from '../../themes/useTheme'
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";


interface IDotProps {
  color: string
  active: boolean
  size: number
}

const animationDuration = 30;
const animationScale = 1.5;

const Dot: React.FC<IDotProps> = (props: IDotProps) => {
  const {active, size, color} = props
  const scale = useRef(new Animated.Value(1)).current
  const scaleUp = () => {
    return Animated.timing(
      scale,
      {
        toValue: animationScale,
        delay: animationDuration,
        useNativeDriver: true,
      }
    )
  }

  const scaleDown = () => {
    return Animated.timing(
      scale,
      {
        toValue: 1,
        delay: animationDuration,
        useNativeDriver: true,
      }
    )
  }

  useEffect(() => {
    if (active) {
      Animated.sequence([
        scaleUp(),
        scaleDown(),
      ]).start();
    }
  }, [active]);

  const style = {
    height: size,
    width: size,
    borderRadius: size / 2,
    marginHorizontal: 5,
    backgroundColor: color
  }
  return (
    <Animated.View style={[style, {transform: [{scale}]}]}/>
  )
}

interface ILoaderProps {
  color?: ColorStrings
}
const MaayotLoader:React.FC<ILoaderProps> = (props: ILoaderProps) => {
  const {
    color =  'primary'
  } = props;
  const theme = useTheme();
  const [active, setActive] = useState(1)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive(active => active === 3 ? 1 : active + 1);
    }, 300);
    return () => clearInterval(intervalId);
  }, [])
  return (
    <View style={styles.main}>
      {[1,2,3].map(i => <Dot
        active={i === active}
        key={i}
        color={theme.colors?.[color || 'primary']}
        size={7}/>)}
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 9,
  },
})

export default MaayotLoader;
