import React, {useCallback, useState, useEffect} from 'react'
import { useIsFocused } from '@react-navigation/native';
import Header from '../../components/commons/Header'
import Streak from './streaks'
import HomeHeader from './HomeHeader'
import Story from './story/story'
import useMemberShip from '@frameworks/mobile/hooks/useMembership'
import {Dimensions, RefreshControl, ScrollView, View} from "react-native";
import {useCurrentStreaks, useLongestStreaks} from "@frameworks/mobile/hooks/useStreaks";
import {IProfileEntity} from "@domains/entities/interfaces/iProfile";
import {useSelector} from "react-redux";

type IHomeScreen = {
  navigation?: any
}
const HomeScreen: React.FC<IHomeScreen> = (props) => {
  const {isValidMemberShip} = useMemberShip()
  const [refreshing, setRefreshing] = useState(false);
  const [labugage, setLanguage] = useState(global.characterPreference);

  const {loadCurrentStreak} = useCurrentStreaks();
  const {loadLongestStreak} = useLongestStreaks();
  const isFocused = useIsFocused();
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    Promise.all([
      loadCurrentStreak(),
      loadLongestStreak(),
    ]).then(res => {
      console.log('Res: ',res)
      setRefreshing(false)
    }).catch((e: any) => {
      console.log('Error: ',e)
      setRefreshing(false)
    })
  }, [profile]);

  useEffect(() => {
    if (isFocused) {
      setLanguage(global.characterPreference)
    }
  }, [isFocused]);

  const onScreen = () => {
    return(<Story />)
  }
  return (
    <>
      <Header {...props} />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{
         height: Dimensions.get('window').height - 150,
          padding:0,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <HomeHeader/>
        {isValidMemberShip && <Streak/>}
        <Story />
      </ScrollView>
    </>
  )
}

export default HomeScreen

