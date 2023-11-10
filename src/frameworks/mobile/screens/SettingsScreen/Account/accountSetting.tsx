import React, {useEffect, useState} from 'react'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText"
import {Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, TextInput, View,Linking} from "react-native"
import useTheme from "../../../themes/useTheme"
import PageTitle from "@frameworks/mobile/components/atomic/pageTitle"
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import {navigationRoutes} from "@frameworks/mobile/utils/const"
import MayotButton from "@frameworks/mobile/components/atomic/button"
import {useDispatch, useSelector} from "react-redux"
import Card from "@frameworks/mobile/components/commons/Card"
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import styles from './styles'
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"
import useFormSubmitStatus from "@frameworks/mobile/hooks/useFormSubmitStatus"
import di from "@di"
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp"
import TopBanner from "@frameworks/mobile/components/atomic/topBanner"

const AccountSetting: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const {navigate} = useNavigation()

  const [firstName, onChangeFirstName] = useState('')
  const [email, onChangeEmail] = useState('')
  const [userPw, onChangePw] = useState('')
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const profile: IProfileEntity | undefined = useSelector(
    (state: any) => state.profile.profile
  )

  const {
    submitText,
    setSubmitText,
    submitStatus,
    setSubmitStatus
  } = useFormSubmitStatus()

  const handleContinuePress = async () => {
    setButtonLoading(true)
    if (
      profile
      && !buttonLoading
    ) {
      try {
        let submitAccount
        if (profile.email !== email && profile.name !== firstName) {
          submitAccount = await di.profile.saveAccount(firstName, email, profile.id)
        } else if (profile.email !== email) {
          submitAccount = await di.profile.saveEmail(firstName, email, profile.id)
        } else {
          submitAccount = await di.profile.saveFirstName(firstName, email, profile.id)
        }
        if ((submitAccount as IFailureAPI).status) {
          Alert.alert("", (submitAccount as IFailureAPI).message)
        } else {
          dispatch(submitAccount)
        }
        setSubmitText(`Your submission has been received!`)
        setSubmitStatus('success')
        setButtonLoading(false)
      } catch (e) {
        setSubmitText(e)
        setSubmitStatus('fail')
        setButtonLoading(false)
      }
    }
  }

  useEffect(() => {
    if (profile) {
      onChangeFirstName(profile.name)
      onChangeEmail(profile.email)
    }
  }, [profile])

  const handlePwSetting = () => {
    navigate(navigationRoutes.NAVIGATION_PASSWORD_SETTING_PATH, {})
  }

  return (<>
      <SafeAreaView style={[
        commonStyles.fullHeight,
        {backgroundColor: theme.colors.lightest}]
      }>
        {submitStatus &&
        <TopBanner
          styles={{
            backgroundColor: submitStatus === 'success' ? theme.colors.success : theme.colors.warning,
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
                <MaayotText
                  color={'gray1'}
                  fontWeight="regular"
                  size="smallest12"
                  style={styles.formElementTitle}
                >
                  First Name
                </MaayotText>
                <TextInput
                  style={[
                    styles.inputView,
                    {
                      borderColor: theme.colors.gray3
                    }
                  ]}
                  onChangeText={(text) => onChangeFirstName(text)}
                  value={firstName}
                  placeholder={'First Name'}
                />
                <MaayotText
                  color={'gray1'}
                  fontWeight="regular"
                  size="smallest12"
                  style={styles.formElementTitle}
                >
                  Email
                </MaayotText>
                <TextInput
                  style={[
                    styles.inputView,
                    {
                      borderColor: theme.colors.gray3
                    }
                  ]}
                  onChangeText={(text) => onChangeEmail(text)}
                  value={email}
                  placeholder={'password'}
                />
                <MaayotText
                  color={'gray1'}
                  fontWeight="regular"
                  size="smallest12"
                  style={styles.formElementTitle}
                >
                  Password
                </MaayotText>
                <View>
                  <TextInput
                    style={[
                      styles.inputView,
                      styles.inputPwHasBtn,
                      {
                        borderColor: theme.colors.gray3,
                      }
                    ]}
                    onChangeText={(text) => onChangePw(text)}
                    value={userPw}
                    secureTextEntry={true}
                    placeholder={'Password'}
                  />
                  <View style={[
                    commonStyles.absolute,
                    commonStyles.center,
                    styles.editPwBtn
                  ]}>
                    <MayotButton
                      onPress={handlePwSetting}
                      label={'Edit'}
                      color={'primary'}
                      bgColor={'lightest'}
                      size={'smaller14'}
                      style={{padding: 0}}
                      fontWeight={'regular'}
                      fontWeightNumber={'600'}
                      textStyle={styles.editPwBtnText}
                    />
                  </View>
                  <View style={[
                commonStyles.fullWidth,
                commonStyles.alignItemsStart,
              ]}>
                <MayotButton
                  onPress={() => Linking.openURL('mailto:story@maayot.com?subject=Delete my maayot Account&body=Please delete the maayot account linked to my email.') }
                  label={'Delete my account'}
                  color={'grey'}
                  bgColor={'lightest'}
                  fontWeight={'regular'}
                  fontWeightNumber={'400'}
                  size='small16'
                />
              </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Card>
        <View
          style={styles.btmButton}
        >
          <MayotButton
            onPress={handleContinuePress}
            label={'Continue'}
            isLoading={buttonLoading}
            disabled={profile?.name === firstName && profile.email === email}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
export default AccountSetting

