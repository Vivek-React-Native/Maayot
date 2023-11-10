import React from 'react'
import {StyleSheet, View} from 'react-native'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import useTheme from '../../../themes/useTheme'

type ISegmentedControlProps = {
  selectedIndex?: number
  onSelectedIndex?: any,
  values: string[]
}

const StorySegmentedControl: React.FC<ISegmentedControlProps> = (props: ISegmentedControlProps) => {
  const {
    selectedIndex = 0,
    onSelectedIndex,
    values
  } = props
  const theme = useTheme()
  const onChange = (e:any) => {
    onSelectedIndex(e.nativeEvent.selectedSegmentIndex)
  }
  return (<View style={[
      styles.segmentedControl,
      {backgroundColor: theme.colors.primary}
    ]}>
      <View style={[
        styles.segmentedControlWrapper,
        {backgroundColor: theme.colors.lightest}
      ]}>
        <SegmentedControl
          values={values}
          selectedIndex={selectedIndex}
          onChange={onChange}
          fontStyle={{fontSize: 13}}
          style={styles.segmentedControlWrapper}
          appearance={'light'}
        />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  segmentedControl: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 11
  },
  segmentedControlView: {
    height: 32
  },
  segmentedControlWrapper: {
    borderRadius: 10
  }
})
export default React.memo(StorySegmentedControl)
