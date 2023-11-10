import React, {ReactElement} from 'react'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import {TouchableOpacity, View} from "react-native";
import useTheme from "../../../themes/useTheme";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import styles from './styles';
import CheckedIcon from "@frameworks/mobile/icons/CheckedIcon";
import {levelType} from "@domains/entities/interfaces/iProfile";

interface ILevelItemProps {
  icon: ReactElement,
  iconLabel: string,
  label: levelType,
  description: string,
  selected: boolean,
  onSelect: (level: levelType) => void,
}

const LevelItem: React.FC<ILevelItemProps> = (props: ILevelItemProps) => {
  const theme = useTheme();
  const {
    icon,
    iconLabel,
    label,
    selected,
    onSelect,
    description,
  } = props;
  return <View
    style={[
      styles.card
    ]}
  >
    <TouchableOpacity
      onPress={() => onSelect(label)}
    >
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.colors.gray4,
            borderColor: selected ? theme.colors.primary : theme.colors.gray4,
          },
        ]}
      >
        <View style={commonStyles.flxRow}>
          <View>
            {icon}
            <MaayotText
              color={'primary3'}
              fontWeight="bold"
              size="small17"
              style={styles.iconLabel}
            >
              {iconLabel}
            </MaayotText>
          </View>
          <View style={styles.labelContainer}>
            <View style={commonStyles.flxRow}>
              <MaayotText
                color={'gray1'}
                fontWeight="regular"
                fontWeightNumber="600"
                size="small17"
                style={styles.levelLabel}
              >
                {label}
              </MaayotText>
              {selected && <CheckedIcon/>}
            </View>
            <MaayotText
              color={'gray1'}
              fontWeight="regular"
              size="smaller14"
              style={styles.levelDescription}
            >
              {description}
            </MaayotText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </View>
};
export default LevelItem

