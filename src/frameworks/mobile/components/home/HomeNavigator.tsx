import React, {useState, useCallback} from 'react'
import MaayotBackground from "@frameworks/mobile/components/atomic/MaayotBackground";
import HomeScreen from '../../screens/HomeScreen';
import {SafeAreaView} from "react-native";

export default ({ navigation }: any) => {
  return (
    <SafeAreaView>
      <MaayotBackground>
          <HomeScreen navigation={navigation}/>
      </MaayotBackground>
    </SafeAreaView>
  )
}
