import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import useTheme from "../../themes/useTheme";

const withScroll = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => (props) => {
  const theme = useTheme()
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{
          ...styles.scrollView,
          backgroundColor: theme.colors.gray
        }}
      >
        <Component {...(props)} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
    height: '100%'
  }
})

export default withScroll;
