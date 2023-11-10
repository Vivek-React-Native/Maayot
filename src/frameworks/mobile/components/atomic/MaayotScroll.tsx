import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import useTheme from "../../themes/useTheme";

interface IMaayotScrollProps {
  children?: any
  refreshControl?: any
}
const MayotScroll: React.FC<IMaayotScrollProps> = ({children, refreshControl}:IMaayotScrollProps) => {
  const theme = useTheme()
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        refreshControl={refreshControl}
        style={{
          ...styles.scrollView,
        }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
    height: '80%'
  }
})

export default MayotScroll;
