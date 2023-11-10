import React, {useEffect, useMemo} from 'react'
import {useSelector} from "react-redux";
import {navigationRoutes} from "@frameworks/mobile/utils/const";
import {isSunday, isUnLimitMemberShip} from "@frameworks/mobile/utils/utils";
import useNavigation from "@frameworks/mobile/navigations/useNavigation";
import {IProfileEntity} from "@domains/entities/interfaces/iProfile";

const ValidateUserScreen: React.FC = (props) => {
  const sessionInfo = useSelector(
    (state: any) => state.session.sessionInfo
  )

  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )
  const {navigate} = useNavigation();

  useEffect(() => {
    if (sessionInfo && profile && !isUnLimitMemberShip(sessionInfo.membershipName) && !isSunday()) {
      navigate(navigationRoutes.NAVIGATION_STORY_PATH, {
        screen: navigationRoutes.NAVIGATION_FINISH_PATH
      })
    }
  }, [sessionInfo, profile])
  return (
    <>
      {props.children}
    </>
  )
}

export default ValidateUserScreen
