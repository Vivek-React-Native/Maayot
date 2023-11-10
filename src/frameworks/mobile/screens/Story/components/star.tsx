import React from 'react'
import {StyleSheet, View} from 'react-native'
import LevelStarIcon from "@frameworks/mobile/icons/LevelStarIcon"
import {levelConst} from "@frameworks/mobile/utils/const"
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"

type IStarProps = {
  level?: string
}
const Star: React.FC<IStarProps> = (props: IStarProps) => {
  const {level} = props
  return (
    <View style={[
      commonStyles.flxRow,
      styles.star
    ]}>
      <LevelStarIcon fill={'primary2'}/>
      <LevelStarIcon
        fill={level !== levelConst.BEGINNER? 'primary2':'lightest'}
        stroke={level !== levelConst.BEGINNER? 'none':'gray3'}
      />
      <LevelStarIcon
        fill={level == levelConst.ADVANCED? 'primary2':'lightest'}
        stroke={level === levelConst.ADVANCED? 'none':'gray3'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  star: {
    justifyContent:'space-around',
    width: 50,
    marginLeft:4,
  },
})
export default React.memo(Star)
