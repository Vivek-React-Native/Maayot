import React from 'react'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import styles from './styles';
import Upgrade from "@frameworks/mobile/screens/HomeScreen/story/upgrade";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import Counter from "@frameworks/mobile/components/atomic/counter";
import Line from "@frameworks/mobile/components/atomic/line";
import {IStoryEntity} from "@domains/entities/interfaces/iStory";

interface IPremiumStory {
  story: IStoryEntity
  readStory:any
}

const PremiumStory: React.FC<IPremiumStory> = (props:IPremiumStory) => {
  const {
    story,
    readStory
  } = props;
  const readStoryFn = () => {
    readStory();
  }

  return (
    <>
      <MayotButton
        onPress={readStoryFn}
        label={'Read Story Now'}
        style={{
          ...styles.button,
        }}
      />
    </>
  )
};

export default PremiumStory

