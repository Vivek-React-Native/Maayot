import React from 'react'
import { View, Button, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useTheme from '../../../themes/useTheme'
import styles from './styles';
import MayotButton from "@frameworks/mobile/components/atomic/button";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

type IUpgardeProps = {
  bgColor?: ColorStrings
}
const Upgrade: React.FC<IUpgardeProps> = (props: IUpgardeProps) => {
  const {
    bgColor = 'primary2'
  } = props;
  const theme = useTheme()
  const dispatch = useDispatch()
  const upgradeFn = () => {}
  return (
      <View>
        <MaayotText
          color={'gray1'}
          fontWeight="regular"
          size="smaller14"
          style={styles.center}
        >
          Don’t need to wait, upgrade now, Start from $5
        </MaayotText>
        <MayotButton
          bgColor={bgColor}
          onPress={upgradeFn}
          label={'Upgrade Now'}
          style={styles.button}
        />
      </View>
  )
};

export default Upgrade

