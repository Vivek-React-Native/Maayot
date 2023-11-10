import React, {useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"
import {isUnLimitMemberShip} from "@frameworks/mobile/utils/utils";
import {IAPProductConst, memberTypeConst} from "@frameworks/mobile/utils/const";
import {ISessionEntity} from "@domains/entities/interfaces/iSession";

const useMemberShip = () => {

  const [name, setName] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [isValidMemberShip, setIsValidMembership] = useState<boolean>(false);
  const profileState = useSelector(
    (state: any) => state.profile
  )
  const profile: IProfileEntity | undefined = profileState?.profile
  const sessionState = useSelector(
    (state: any) => state.session
  )
  const sessionInfo: ISessionEntity | undefined = sessionState?.sessionInfo;

  useEffect(() => {
      if (sessionInfo?.membershipName && profile) {
          let displayName = "", membershipName = sessionInfo.membershipName.toLowerCase();
          switch (sessionInfo.membershipName.toLowerCase()) {
              case memberTypeConst.PREMIUM.toLowerCase():
                  displayName = 'Premium Plan'
                  break
              case memberTypeConst.SCHOOL.toLowerCase():
                  displayName = 'School Plan'
                  break
              case memberTypeConst.STANDARD.toLowerCase():
                  displayName = 'Standard Plan'
                  break
              case memberTypeConst.PRO.toLowerCase():
                  displayName = 'Pro Plan'
                  break
              case memberTypeConst.FREE.toLowerCase():
                  if (profile.iapMembershipType === IAPProductConst.STANDARD) {
                      displayName = 'Standard Plan'
                      membershipName = memberTypeConst.STANDARD.toLowerCase()
                  } else {
                      displayName = 'Free Plan'
                  }
                  break
          }
          setName(membershipName);
          setDisplayName(displayName);
      }
  },[sessionInfo?.membershipName, profile]);
  useEffect(() => {
    const isValid = sessionInfo &&
      profile &&
      (isUnLimitMemberShip(sessionInfo.membershipName) ||
        profile.iapMembershipType === IAPProductConst.STANDARD);
    setIsValidMembership(!!isValid)
  }, [sessionInfo?.membershipName, profile])

  const isFree = useMemo(() => {
      return sessionInfo &&
          profile &&
          sessionInfo.membershipName.toLowerCase() === memberTypeConst.FREE.toLowerCase() &&
          profile.iapMembershipType !== IAPProductConst.STANDARD
  }, [sessionInfo?.membershipName, profile]);

  const isStandard = useMemo(() => {
      return sessionInfo &&
          profile &&
          (sessionInfo.membershipName.toLowerCase() === memberTypeConst.STANDARD.toLowerCase() ||
              sessionInfo.membershipName.toLowerCase() === memberTypeConst.SCHOOL.toLowerCase() ||
              profile.iapMembershipType === IAPProductConst.STANDARD)
  }, [sessionInfo?.membershipName, profile]);

  const isPremium = useMemo(() => {
    return  sessionInfo &&
      profile &&
      sessionInfo.membershipName.toLowerCase() === memberTypeConst.PREMIUM.toLowerCase()
  }, [sessionInfo?.membershipName, profile]);
  return {
    name,
    displayName,
    isFree,
    isStandard,
    isPremium,
    isValidMemberShip,
  }
}

export default useMemberShip
