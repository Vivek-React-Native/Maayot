import React, {useEffect, useMemo} from 'react'
import MainFinishScreen from "@frameworks/mobile/screens/Story/finish/finish";
import FreeFinishScreen from "@frameworks/mobile/screens/Story/finish/free";
import useMemberShip from "@frameworks/mobile/hooks/useMembership";
import {useTracking} from "@frameworks/mobile/hooks/useStreaks";
import {MemberStepInStory} from "@frameworks/mobile/utils/const";

const FinishScreen: React.FC = () => {

  const {isValidMemberShip} = useMemberShip()
  const { setViewStep } = useTracking();
  useEffect(() => {
    //@ts-ignore
    setViewStep(MemberStepInStory.FINISH)
  },[]);
  return (
    <>
      {isValidMemberShip && <MainFinishScreen/> || <FreeFinishScreen/>}
    </>
  )
}

export default FinishScreen
