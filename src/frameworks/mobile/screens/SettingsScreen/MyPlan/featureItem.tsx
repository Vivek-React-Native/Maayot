import React, {} from 'react'
import {StyleSheet, View} from "react-native";
import useTheme from "../../../themes/useTheme";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import {WrongIcon, CheckedIcon} from "@frameworks/mobile/icons";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";

interface ILevelItemProps {
  isActive: boolean,
  label: string,
}

const FeatureItem: React.FC<ILevelItemProps> = (props: ILevelItemProps) => {
  const theme = useTheme();
  const {
    isActive,
    label
  } = props;
  return <View style={[
    commonStyles.flxRow,
    styles.featureItem
  ]}>
    {isActive && <CheckedIcon/> || <WrongIcon/>}
    <MaayotText
      color={'primary3'}
      fontWeight="regular"
      size="smaller14"
      style={styles.label}
    >
      {label}
    </MaayotText>
  </View>
};
const styles = StyleSheet.create({
  featureItem: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  label: {
    marginLeft: 12,
    lineHeight:25,
    alignItems:'center',
    textAlignVertical:'center',
  }
})
export default FeatureItem

