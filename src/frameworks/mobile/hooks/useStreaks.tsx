import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"
import {
  ICurrentStreaksEntity,
  ILongestStreaksEntity,
  IMonthStreaksData,
  ITrackingEntity, StorySteps
} from "@domains/entities/interfaces/iStreaks";
import {IStreaksAction} from "@adapters/presenters/action-interfaces/iStreaks";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import di from "@di";
import moment, {Moment} from "moment-timezone";
import {serverDateFormat, unauthorizedCodeConst} from "@frameworks/mobile/utils/const";
import {enumerateDaysBetweenDates} from "@frameworks/mobile/utils/utils";
import {IStoryEntity} from "@domains/entities/interfaces/iStory";

const customStyles = {
  container: {
    width: 43,
    height: 43,
    borderRadius: 50,
  }
}
export const getCurrentMarkedDates = (currentList?: Moment[]) => useMemo(() => {
  if (currentList?.length) {
    const currentDate = moment().format(serverDateFormat);
    let res = {};
    currentList.forEach((date) => {
      //@ts-ignore
      res[date.format(serverDateFormat)] = {selected: true, customStyles};
    })
    //@ts-ignore
    if (res[currentDate]) {
      //@ts-ignore
      res[currentDate].marked = true;
    }
    return res;
  }
  return {};
}, [currentList]);
export const getLongestMarkedDates = (longest: any) => useMemo(() => {
  if (longest?.fromDate && longest?.toDate) {
    const currentDate = moment().format(serverDateFormat);
    const longestList: Moment[] = enumerateDaysBetweenDates(
      moment(longest.fromDate, serverDateFormat),
      moment(longest.toDate, serverDateFormat)
    );
    let res = {};
    longestList.forEach((date) => {
      //@ts-ignore
      res[date.format(serverDateFormat)] = {selected: true, customStyles};
    })
    //@ts-ignore
    if (res[currentDate]) {
      //@ts-ignore
      res[currentDate].marked = true;
    }
    return res;
  }
}, [longest])

export const useCurrentStreaks = () => {
  const dispatch = useDispatch()
  const current: ICurrentStreaksEntity | undefined = useSelector(
    (state: any) => state.streaks.current
  )
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )

  const loadCurrentStreak = async () => {
    if (profile?.membershipId) {
      const currentStreak: IStreaksAction | IFailureAPI = await di.streaks.getCurrentStreaks(profile.id);
      if ((currentStreak as IFailureAPI).status) {
        const errorCode = (currentStreak as IFailureAPI).status;
        if (errorCode === unauthorizedCodeConst) {
          await di.session.signOut(dispatch)
        } else {
          console.log('currentStreak error', currentStreak);
        }
      } else {
        dispatch(currentStreak as IStreaksAction)
      }
    }
  }

  useEffect(() => {
    const asyncFnc = async () => {
      await loadCurrentStreak()
    }
    !current && profile?.membershipId && asyncFnc()
  }, [current, profile])

  return {
    currentStreaks: current,
    loadCurrentStreak
  }
}

export const useLongestStreaks = () => {
  const dispatch = useDispatch()
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )
  const longest: ILongestStreaksEntity | undefined = useSelector(
    (state: any) => state.streaks.longest
  )

  const loadLongestStreak = async () => {
    if (profile?.membershipId) {
      const longestStreak: IStreaksAction | IFailureAPI = await di.streaks.getLongestStreaks(profile.id);
      if ((longestStreak as IFailureAPI).status) {
        const errorCode = (longestStreak as IFailureAPI).status;
        if (errorCode === unauthorizedCodeConst) {
          await di.session.signOut(dispatch)
        } else {
          console.log('longestStreak error', longestStreak);
        }
      } else {
        dispatch(longestStreak as IStreaksAction)
      }
    }
  }

  useEffect(() => {
    const asyncFnc = async () => {
      await loadLongestStreak();
    }
    !longest && profile?.membershipId && asyncFnc()
  }, [longest, profile])

  return {
    longestStreak: longest,
    loadLongestStreak
  }
}

export const useMonthStreaks = () => {
  const dispatch = useDispatch()
  const [activeMonth, setActiveMonth] = useState('');

  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )
  const month: any | undefined = useSelector(
    (state: any) => state.streaks.month
  )

  const loadMonthStreak = async () => {
    if (profile?.membershipId && activeMonth) {
      const longestStreak: IStreaksAction | IFailureAPI = await di.streaks.getMonthStreaks(profile.id, activeMonth);
      if ((longestStreak as IFailureAPI).status) {
        const errorCode = (longestStreak as IFailureAPI).status;
        if (errorCode === unauthorizedCodeConst) {
          await di.session.signOut(dispatch)
        } else {
          console.log('longestStreak error', longestStreak);
        }
      } else {
        dispatch(longestStreak as IStreaksAction)
      }
    }
  }

  useEffect(() => {
    const asyncFnc = async () => {
      await loadMonthStreak();
    }
    activeMonth &&
    !month?.[activeMonth] &&
    profile?.membershipId &&
    asyncFnc()
  }, [activeMonth, profile])

  return {
    currentMonthStreak: month?.[activeMonth] || [],
    activeMonth,
    setActiveMonth,
    loadMonthStreak
  }
}

export const useTracking = () => {
  const dispatch = useDispatch();
  const [viewStep, setViewStep] = useState<keyof typeof StorySteps>('introduction')
  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )
  const story: IStoryEntity | undefined = useSelector(
    (state: any) => state.story.story
  )
  const tracking: ITrackingEntity | undefined = useSelector(
    (state: any) => state.streaks.tracking
  )

  useEffect(() => {
    const asyncFnc = async () => {
      if (profile?.membershipId && story?.id) {
        const tracking: IStreaksAction | IFailureAPI =
          await di.streaks.getLastStep(story.id, profile.id, profile.level);
        if ((tracking as IFailureAPI).status == unauthorizedCodeConst) {
          const errorCode = (tracking as IFailureAPI).status;
          if (errorCode === unauthorizedCodeConst) {
            await di.session.signOut(dispatch)
          } else {
            console.log('tracking error', tracking);
          }
        } else {
          dispatch(tracking as IStreaksAction)
        }
      }
    }
    !tracking && story?.id && profile?.membershipId && asyncFnc()
  }, [tracking, profile, story])

  useEffect(() => {
    const asyncFnc = async () => {
      if (
        profile?.membershipId &&
        story?.id &&
        (tracking && viewStep &&
          (StorySteps[viewStep] > tracking?.stepId ||
            StorySteps[viewStep] === tracking?.stepId && tracking?.stepId == 0)
        )
      ) {
        const tracking: IStreaksAction | IFailureAPI =
          await di.streaks.saveLastStep(viewStep, profile.level, profile.id, story.id)
        if ((tracking as IFailureAPI).status == unauthorizedCodeConst) {
          const errorCode = (tracking as IFailureAPI).status;
          if (errorCode === unauthorizedCodeConst) {
            await di.session.signOut(dispatch)
          } else {
            console.log('tracking error', tracking);
          }
        } else {
          dispatch(tracking as IStreaksAction)
        }
      }
    }
    asyncFnc()
  }, [viewStep, tracking, story, profile]);

  return {
    tracking,
    setViewStep,
  }
}

export default {}
