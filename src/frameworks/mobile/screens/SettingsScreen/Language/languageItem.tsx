import React, {ReactElement} from 'react'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import {TouchableOpacity, View} from "react-native";
import useTheme from "../../../themes/useTheme";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import styles from './styles';
import CheckedIcon from "@frameworks/mobile/icons/CheckedIcon";
import {languageType} from "@domains/entities/interfaces/iProfile";

interface ILanguageItem {
  icon: ReactElement,
  iconLabel: string,
  label: languageType,
  description: string,
  selected: boolean,
  onSelect: (language: languageType) => void,
}

const LanguageItem: React.FC<ILanguageItemProps> = (props: ILanguageItemProps) => {
  const theme = useTheme();
  const {
    icon,
    iconLabel,
    label,
    selected,
    onSelect,
    description,
    id,
  } = props;
  return <View
    style={[
      styles.card
    ]}
  >
    <TouchableOpacity
      onPress={() => onSelect(id)}
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
            <View style={styles.flxRow}>
              <MaayotText
                color={'gray1'}
                fontWeight="regular"
                fontWeightNumber="600"
                size="small17"
                style={styles.languageLabel}
              >
                {label}
              </MaayotText>
              {selected && <CheckedIcon/>}
            </View>
            {/* <MaayotText
              color={'gray1'}
              fontWeight="regular"
              size="smaller14"
              style={styles.languageDescription}
            >
              {description}
            </MaayotText> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </View>
};
export default LanguageItem

