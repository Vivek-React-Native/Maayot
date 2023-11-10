import React, {ReactElement, useEffect, useState} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useTheme from '../../themes/useTheme'
import MayotButton from "@frameworks/mobile/components/atomic/button";
import styles from './styles';
import {
  BeginnerIcon,
  IntermediateIcon,
  AdvancedIcon,
} from "@frameworks/mobile/icons/level";
import useNavigation from "@frameworks/mobile/navigations/useNavigation";
import CheckedIcon from "@frameworks/mobile/icons/CheckedIcon";
import {navigationRoutes} from "@frameworks/mobile/utils/const";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";

type levelType = ''|'Beginner'|'Intermediate'|'Advanced'
type levelConstType = {
  id: levelType,
  label: any,
  icon: ReactElement,
  iconLabel:string
};
const LEVEL_CONST: levelConstType[] = [{
  id:'Beginner',
  label:'Beginner (HSK 1/2/3)',
  icon: <BeginnerIcon />,
  iconLabel: '初级'
}, {
  id:'Intermediate',
  label:'Intermediate (HSK 4/5)',
  icon: <IntermediateIcon />,
  iconLabel: '中级'
}, {
  id:'Advanced',
  label:'Advanced (HSK 6/6+)',
  icon: <AdvancedIcon/>,
  iconLabel: '高级'
}];

interface ILevelItemProps {
  icon: ReactElement,
  iconLabel: string,
  id: levelType,
  label: levelType,
  selected: boolean,
  onSelect: (level:levelType) => void,
}
const LevelItem: React.FC<ILevelItemProps> = (props: ILevelItemProps) => {
  const theme = useTheme();
  const {
    icon,
    iconLabel,
    id,
    label,
    selected,
    onSelect,
  } = props;
  return <View
      style={[
        levelStyles.card
      ]}
    >
    <TouchableOpacity
      onPress={() => onSelect(id)}
    >
      <View
        style={[
          levelStyles.cardContainer,
          {
            backgroundColor: theme.colors.gray4,
            borderColor: selected? theme.colors.primary : theme.colors.gray4,
          },
        ]}
      >
        <View style={styles.flexRow}>
          <View>
            {icon}
            <MaayotText
              color={'primary3'}
              fontWeight="bold"
              size="small17"
              style={levelStyles.iconLabel}
            >
              {iconLabel}
            </MaayotText>
          </View>
          <MaayotText
            color={'gray1'}
            fontWeight="regular"
            fontWeightNumber="600"
            size="small17"
            style={levelStyles.levelLabel}
          >
            {label}
          </MaayotText>
        </View>
        {selected && <CheckedIcon />}
      </View>
    </TouchableOpacity>
  </View>
};
const SelectLevel: React.FC = ({ route }: any) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [activeLevel, setActiveLevel] = useState<levelType>("");
  const onLevelSelect = (level: levelType): void => {
    setActiveLevel(level);
  };

  useEffect(() => {
    if(route?.params) {
      const {
        firstName,
        email,
        password,
        confirmPassword,
      } = route.params;
      if(!firstName || !email || !password || !confirmPassword) {
        navigate(navigationRoutes.NAVIGATION_REGISTER_PATH);
      }
    } else {
      navigate(navigationRoutes.NAVIGATION_REGISTER_PATH);
    }
  },[route?.params]);

  const handleContinue = async () => {
    const {
      firstName,
      email,
      password,
      confirmPassword,
    } = route.params;
    navigate(navigationRoutes.NAVIGATION_LANGUAGE_PATH, {
      firstName,
      email,
      password: password,
      confirmPassword: confirmPassword,
      activeLevel
    })
  };

  return (
    <>
      <View style={styles.loginForm}>
        <View style={levelStyles.title}>
          <MaayotTextDisplay
            color={'gray1'}
            fontWeight="bold"
            size="largest32"
            style={{
              ...styles.center,
              lineHeight: 38,
            }}
          >
            Pick a Level
          </MaayotTextDisplay>
          <MaayotText
            color={'gray2'}
            fontWeight="regular"
            size="smaller14"
            style={{
              ...styles.center,
              ...levelStyles.subTitle,
              lineHeight: 21,
            }}
          >
            You can always change it later in the settings
          </MaayotText>
        </View>
        {LEVEL_CONST.map(level => {
          return <LevelItem
            key={level.label}
            label={level.label}
            icon={level.icon}
            iconLabel={level.iconLabel}
            selected={level.id === activeLevel}
            id={level.id}
            onSelect={onLevelSelect}
          />
        })}
      </View>
      <View style={[
        styles.moreBottom,
        levelStyles.bottomBtn
      ]}>
        <MayotButton
          onPress={handleContinue}
          label={'Continue'}
          style={styles.actionButton}
          disabled={!activeLevel}
        />
      </View>
    </>
  )
};
const levelStyles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingBottom: 9,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 18,
    paddingTop: 28,
    paddingBottom: 18,
    borderRadius: 10,
    borderWidth: 1,
    alignItems:'center',
  },
  title: {
    marginBottom: 62
  },
  iconLabel: {
    position:'absolute',
    top: 10,
    left: 5,
    lineHeight: 22,
    letterSpacing: -0.408
  },
  levelLabel: {
    marginLeft: 16,
    lineHeight: 42
  },
  bottomBtn: {
    position:'absolute',
    bottom: 40,
    width: '90%',
    left: '5%'
  },
  subTitle:{
    marginTop:5
  }
});

export default SelectLevel
