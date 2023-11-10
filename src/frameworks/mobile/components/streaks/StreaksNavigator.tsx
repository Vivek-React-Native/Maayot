import React from 'react'
import {StreaksScreen} from "@frameworks/mobile/screens";
import {Dimensions, View} from "react-native";
import useTheme from "../../themes/useTheme";
import PageTitle from "@frameworks/mobile/components/atomic/pageTitle";

export default () => {
  const theme = useTheme();
  const width = Dimensions.get('window').width;
  const height = 109;//Dimensions.get('window').height * 0.6;
  return (
    <>
      <View style={[
        {
          backgroundColor: theme.colors.primary,
          paddingTop: 60,
          width,
          height
        }
      ]}>
        <PageTitle title={"Streaks Tracking"}/>
      </View>
      <StreaksScreen/>
    </>
  )
}
