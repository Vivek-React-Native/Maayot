import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {Alert, Dimensions, SafeAreaView, ScrollView, View} from "react-native";
import useTheme from "../../../themes/useTheme";
import useNavigation from "@frameworks/mobile/navigations/useNavigation";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import {useDispatch, useSelector} from "react-redux";
import Card from "@frameworks/mobile/components/commons/Card";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import styles from './styles';
import {AdvancedIcon, BeginnerIcon, IntermediateIcon} from "@frameworks/mobile/icons/level";
import LanguageItem from "@frameworks/mobile/screens/SettingsScreen/Language/languageItem";
import {IProfileEntity, levelType, languageType} from "@domains/entities/interfaces/iProfile";
import di from "@di";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import TopBanner from "@frameworks/mobile/components/atomic/topBanner";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useFormSubmitStatus from "@frameworks/mobile/hooks/useFormSubmitStatus";
import { charactersPreference } from '@frameworks/mobile/utils/const'
type languageConstType = {
    id: string,
  label: languageType,
  icon: ReactElement,
  iconLabel: string,
  description: string
};
const language_CONST: languageConstType[] = [{
    id:charactersPreference.SIMPLIFIED,
  label: 'simplified Chinese',
  icon: <BeginnerIcon/>,
  iconLabel: '简体',
  description: '',
}, {
    id:charactersPreference.TRADITIONAL,
  label: 'traditional Chinese',
  icon: <IntermediateIcon/>,
  iconLabel: '繁體',
  description: '',
}];
const ChangeLanguage: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const {navigate} = useNavigation();

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<languageType>('');

  const {
    submitText,
    setSubmitText,
    submitStatus,
    setSubmitStatus
  } = useFormSubmitStatus();

  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )
  useEffect(() => {
    if (profile) {
      setActiveLanguage(global.characterPreference)
    }
  }, [profile]);



  const onLanguageSelect = (language: languageType): void => {
    setActiveLanguage(language);
  };
  const submitChangeLanguage = async () => {
    setButtonLoading(true);
    if (activeLanguage && profile && !buttonLoading) {
      try {
        const submitLanguage = await di.profile.saveLanguage(
          activeLanguage,
          profile.id,
        )
        if ((submitLanguage as IFailureAPI).status) {
          Alert.alert("", (submitLanguage as IFailureAPI).message)
        } else {
          dispatch(submitLanguage);
          global.characterPreference = activeLanguage
          setSubmitText(`Your submission has been received!`);
          setSubmitStatus('success')
        }
        
        setButtonLoading(false);
      } catch (e) {
        setSubmitText(e);
        setSubmitStatus('fail')
        setButtonLoading(false);
      }
    }
  }

  const handleContinuePress = async () => {
    if (activeLanguage !== global.characterPreference) {
      Alert.alert(
        "Change Language",
        `Are you sure to change your language from
         ${global.characterPreference.toUpperCase()} to ${activeLanguage?.toUpperCase()}?`,
        [
          {
            text: "Cancel",
            onPress: () => {

            },
            style: "cancel"
          },
          {
            text: "OK", onPress: () => {
              submitChangeLanguage()
            }
          }
        ]
      );
    } else {
    }
  }

  return (<>
      <SafeAreaView style={[
        commonStyles.fullHeight,
        {backgroundColor: theme.colors.lightest}]
      }>
        {
          submitStatus && <TopBanner
          styles={{
            backgroundColor: submitStatus === 'success'? theme.colors.success: theme.colors.warning,
            justifyContent: 'center',
          }}
        >
          <MaayotText
            color={'lightest'}
            fontWeight="regular"
            size="smaller14"
            style={{lineHeight: 21,}}
          >
            {submitText}
          </MaayotText>
        </TopBanner> || null
        }
        <Card
          style={commonStyles.card}
          styleContainer={commonStyles.cardContainer}
        >
          <View style={styles.cardView}>
            <ScrollView style={{
              height: Dimensions.get('window').height - 200
            }}>
              <View style={{
                backgroundColor: theme.colors.lightest,
                paddingTop: 10,
              }}>
                {language_CONST.map(language => {
                  return <LanguageItem
                    key={language.label}
                    label={language.label}
                    description={language.description}
                    icon={language.icon}
                    iconLabel={language.iconLabel}
                    selected={language.id === activeLanguage}
                    onSelect={onLanguageSelect}
                    id={language.id}
                  />
                })}

              </View>
            </ScrollView>
          </View>
        </Card>
        <View
          style={styles.btmButton}
        >
          <MayotButton
            disabled={activeLanguage === global.characterPreference}
            onPress={handleContinuePress}
            label={'Continue'}
            isLoading={buttonLoading}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
export default ChangeLanguage

