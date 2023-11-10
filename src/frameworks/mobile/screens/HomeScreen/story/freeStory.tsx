import React, {useMemo} from 'react'
import styles from './styles';
import MayotButton from "@frameworks/mobile/components/atomic/button";
import Counter from "@frameworks/mobile/components/atomic/counter";
import Line from "@frameworks/mobile/components/atomic/line";
import {IStoryEntity} from "@domains/entities/interfaces/iStory";
import {isSunday, momentToSec} from "@frameworks/mobile/utils/utils";
import Upgrade from "./upgrade";
import UpgradeCountDown from "./upgrade_countdown";
import moment from "moment-timezone";
import {secInDay, secInWeek} from "@frameworks/mobile/utils/const";

interface IFreeStory {
  story: IStoryEntity
  readStory: any,
}

const FreeStory: React.FC<IFreeStory> = (props:IFreeStory) => {
  const {
    readStory
  } = props;
  const readStoryFn = () => {
    readStory();
  }
  const _isSunday = useMemo(() => {
    return isSunday()
  }, []);

  const until = useMemo(() => {
    const currentDay = moment.utc()
    return (secInWeek - currentDay.weekday() * secInDay - momentToSec(currentDay)) /1000
  },[]);
  return (
    <>
      {!_isSunday ? <>
        <Line/>
        <Counter
          until={until}
        />
        <UpgradeCountDown bgColor={'primary'}/>
      </> : <>
        <MayotButton
          onPress={readStoryFn}
          label={'Read Story Now'}
          style={{
            ...styles.freeButton,
          }}
        />
        {/*<Line style={styles.freeLine}/>*/}
        {/*<Upgrade bgColor={'primary2'}/>*/}
      </>
      }
    </>
  )
};

export default FreeStory

