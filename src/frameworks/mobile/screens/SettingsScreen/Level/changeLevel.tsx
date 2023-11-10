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
import LevelItem from "@frameworks/mobile/screens/SettingsScreen/Level/levelItem";
import {IProfileEntity, levelType} from "@domains/entities/interfaces/iProfile";
import di from "@di";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import TopBanner from "@frameworks/mobile/components/atomic/topBanner";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import useFormSubmitStatus from "@frameworks/mobile/hooks/useFormSubmitStatus";

type levelConstType = {
  label: levelType,
  icon: ReactElement,
  iconLabel: string,
  description: string
};
const LEVEL_CONST: levelConstType[] = [{
  label: 'beginner',
  icon: <BeginnerIcon/>,
  iconLabel: '初级',
  description: 'Pick this if you can read simple sentences.',
}, {
  label: 'intermediate',
  icon: <IntermediateIcon/>,
  iconLabel: '中级',
  description: 'You have been studying Chinese for at least a year or studying for HSK 4/5.',
}, {
  label: 'advanced',
  icon: <AdvancedIcon/>,
  iconLabel: '高级',
  description: 'Your can read long texts or studying for HSK 6.',
}];
const ChangeLevel: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const {navigate} = useNavigation();

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [activeLevel, setActiveLevel] = useState<levelType>();

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
      setActiveLevel(profile.level)
    }
  }, [profile]);



  const onLevelSelect = (level: levelType): void => {
    setActiveLevel(level);
  };
  const submitChangeLevel = async () => {
    setButtonLoading(true);
    if (activeLevel && profile && !buttonLoading) {
      try {
        const submitLevel = await di.profile.saveLevel(
          activeLevel,
          profile.id,
        )
        if ((submitLevel as IFailureAPI).status) {
          Alert.alert("", (submitLevel as IFailureAPI).message)
        } else {
          dispatch(submitLevel);
          dispatch(await di.story.clearStory());
        }
        setSubmitText(`Your submission has been received!`);
        setSubmitStatus('success')
        setButtonLoading(false);
      } catch (e) {
        setSubmitText(e);
        setSubmitStatus('fail')
        setButtonLoading(false);
      }
    }
  }

  const handleContinuePress = async () => {
    if (activeLevel !== profile?.level) {
      Alert.alert(
        "Change Level",
        `Are you sure to change your level from
         ${profile?.level?.toUpperCase()} to ${activeLevel?.toUpperCase()}?`,
        [
          {
            text: "Cancel",
            onPress: () => {

            },
            style: "cancel"
          },
          {
            text: "OK", onPress: () => {
              submitChangeLevel()
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
                {LEVEL_CONST.map(level => {
                  return <LevelItem
                    key={level.label}
                    label={level.label}
                    description={level.description}
                    icon={level.icon}
                    iconLabel={level.iconLabel}
                    selected={level.label === activeLevel}
                    onSelect={onLevelSelect}
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
            disabled={activeLevel === profile?.level}
            onPress={handleContinuePress}
            label={'Continue'}
            isLoading={buttonLoading}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
export default ChangeLevel

