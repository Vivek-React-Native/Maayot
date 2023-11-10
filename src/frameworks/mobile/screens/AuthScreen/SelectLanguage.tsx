import React, {ReactElement, useEffect, useState} from 'react'
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import di from '@di'
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
import {memberTypeIDConst, navigationRoutes} from "@frameworks/mobile/utils/const";
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {IProfileEntity} from "@domains/entities/interfaces/iProfile";
import branch, { BranchEvent } from 'react-native-branch'
import { charactersPreference } from '@frameworks/mobile/utils/const'
type languageType = ''|charactersPreference.SIMPLIFIED|charactersPreference.TRADITIONAL
type languageConstType = {
  id: languageType,
  label: any,
  icon: ReactElement,
  iconLabel:string
};
const LANGUAGE_CONST: languageConstType[] = [{
  id:charactersPreference.SIMPLIFIED,
  label:'Simplified Chinese',
  icon: <BeginnerIcon />,
  iconLabel: '简体'
}, {
  id:charactersPreference.TRADITIONAL,
  label:'Traditional Chinese',
  icon: <IntermediateIcon />,
  iconLabel: '繁體'
}];

interface ILanguageItemProps {
  icon: ReactElement,
  iconLabel: string,
  id: languageType,
  label: languageType,
  selected: boolean,
  onSelect: (language:languageType) => void,
}
const LanguageItem: React.FC<ILanguageItemProps> = (props: ILanguageItemProps) => {
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
        languageStyles.card
      ]}
    >
    <TouchableOpacity
      onPress={() => onSelect(id)}
    >
      <View
        style={[
          languageStyles.cardContainer,
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
              style={languageStyles.iconLabel}
            >
              {iconLabel}
            </MaayotText>
          </View>
          <MaayotText
            color={'gray1'}
            fontWeight="regular"
            fontWeightNumber="600"
            size="small17"
            style={languageStyles.languageLabel}
          >
            {label}
          </MaayotText>
        </View>
        {selected && <CheckedIcon />}
      </View>
    </TouchableOpacity>
  </View>
};
const SelectLanguage: React.FC = ({ route }: any) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [activeLanguage, setActiveLanguage] = useState<languageType>("");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const onLanguageSelect = (language: languageType): void => {
    setActiveLanguage(language);
  };

  useEffect(() => {
    if(route?.params) {
      const {
        firstName,
        email,
        password,
        confirmPassword,
        activeLevel
      } = route.params;
      if(!firstName || !email || !password || !confirmPassword || !activeLevel) {
        navigate(navigationRoutes.NAVIGATION_REGISTER_PATH);
      }
    } else {
      navigate(navigationRoutes.NAVIGATION_REGISTER_PATH);
    }
  },[route?.params]);

  const showModalFail = (message: string) => {
    Alert.alert('Oops', message, [{text: 'OK', onPress: () => null }]);
  }

  const showModalSuccess = (message: string) => {
    Alert.alert( 'Success', message, [{text: 'OK', onPress: () => navigate(navigationRoutes.NAVIGATION_LOGIN_PATH, {email: route.params.email}) }] );
  }

  const handleContinue = async () => {
    const {
      firstName,
      email,
      password,
      confirmPassword,
      activeLevel
    } = route.params;
    setButtonLoading(true)
    if (!buttonLoading && activeLanguage) {
      try {
        const submitRegister = await di.profile.register(
          firstName,
          email,
          password,
          confirmPassword,
          activeLevel,
          memberTypeIDConst.FREE,
          activeLanguage
        )
        if ((submitRegister as IFailureAPI).status) {
          setButtonLoading(false)
          showModalFail((submitRegister as IFailureAPI).message)
        } else {
          global.characterPreference = activeLanguage
          // Log a standard event with parameters
          let buo = await branch.createBranchUniversalObject('Registrations', {locallyIndex: true})
          new BranchEvent(BranchEvent.CompleteRegistration, buo, {
            firstName: firstName,
            activeLanguage: activeLanguage,
            activeLevel: activeLevel,
            email: email,
            memberTypeIDConst: memberTypeIDConst.FREE
          } as any).logEvent()
          setButtonLoading(false)
          showModalSuccess(`Your submission has been received!`)
        }
      } catch (e) {
        setButtonLoading(false)
        showModalFail(e as string);
      }
    }
  };

  return (
    <>
      <View style={styles.loginForm}>
        <View style={languageStyles.title}>
          <MaayotTextDisplay
            color={'gray1'}
            fontWeight="bold"
            size="largest32"
            style={{
              ...styles.center,
              lineHeight: 38,
            }}
          >
            Character Preference
          </MaayotTextDisplay>
          <MaayotText
            color={'gray2'}
            fontWeight="regular"
            size="smaller14"
            style={{
              ...styles.center,
              ...languageStyles.subTitle,
              lineHeight: 21,
            }}
          >
            This setting will be used across our website and app, you can change it later in the settings.
          </MaayotText>
        </View>
        {LANGUAGE_CONST.map(language => {
          return <LanguageItem
            key={language.label}
            label={language.label}
            icon={language.icon}
            iconLabel={language.iconLabel}
            selected={language.id === activeLanguage}
            id={language.id}
            onSelect={onLanguageSelect}
          />
        })}
      </View>
      <View style={[
        styles.moreBottom,
        languageStyles.bottomBtn
      ]}>
        <MayotButton
          onPress={handleContinue}
          label={'Continue'}
          style={styles.actionButton}
          disabled={!activeLanguage}
          isLoading={buttonLoading}
        />
      </View>
    </>
  )
};
const languageStyles = StyleSheet.create({
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
  languageLabel: {
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

export default SelectLanguage
