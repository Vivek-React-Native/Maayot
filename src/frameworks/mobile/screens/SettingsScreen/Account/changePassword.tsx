import React, {useEffect, useRef, useState} from 'react'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText"
import {Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, TextInput, View} from "react-native"
import useTheme from "../../../themes/useTheme"
import useNavigation from "@frameworks/mobile/navigations/useNavigation"
import {navigationRoutes} from "@frameworks/mobile/utils/const"
import MayotButton from "@frameworks/mobile/components/atomic/button"
import {useDispatch, useSelector} from "react-redux"
import Card from "@frameworks/mobile/components/commons/Card"
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import styles from './styles'
import Line from "@frameworks/mobile/components/atomic/line"
import {EyeIcon} from "@frameworks/mobile/icons"
import TopBanner from "@frameworks/mobile/components/atomic/topBanner"
import di from "@di"
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp"
import useFormSubmitStatus from "@frameworks/mobile/hooks/useFormSubmitStatus"
import {IProfileEntity} from "@domains/entities/interfaces/iProfile"

type PasswordInputElement = {
  onChange: any,
  value: string,
  label: string,
  placeHolder: string,
}
const PasswordInputElement: React.FC<PasswordInputElement> = (props: PasswordInputElement) => {
  const {
    onChange,
    value,
    label,
    placeHolder
  } = props
  const [secureText, SetSecureText] = useState<boolean>(true)
  const theme = useTheme()
  return <>
    <MaayotText
      color={'gray1'}
      fontWeight="regular"
      size="smallest12"
      style={styles.formElementTitle}
    >
      {label}
    </MaayotText>
    <View>
      <TextInput
        style={[
          styles.inputView,
          styles.inputPwHasBtn,
          {
            borderColor: theme.colors.gray3
          }
        ]}
        onChangeText={(text) => onChange(text)}
        secureTextEntry={secureText}
        value={value}
        placeholder={placeHolder}
      />
      <View style={[
        commonStyles.absolute,
        commonStyles.center,
        styles.editPwBtn
      ]}>
        <MayotButton
          onPress={() => SetSecureText(!secureText)}
          color={'primary'}
          bgColor={'lightest'}
          size={'smaller14'}
          style={{padding: 0}}
          fontWeight={'regular'}
          fontWeightNumber={'600'}
        >
          <View style={styles.editPwBtnText}>
            <EyeIcon/>
          </View>
        </MayotButton>
      </View>
    </View>
  </>
}

const ChangePassword: React.FC = () => {
  const theme = useTheme()

  const [curPw, onChangeCurPw] = useState<string>('')
  const [newPw, onChangeNewPw] = useState<string>('')
  const [repeatPw, onChangeRepeatPw] = useState<string>('')

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

  const onUpdatePWFn = async () => {
    if(repeatPw !== newPw) {
      setSubmitText("Password does not match")
      setSubmitStatus('fail')
    } else {
      setButtonLoading(true)
      if (profile && !buttonLoading) {
        try {
          const submitLevel = await di.profile.savePassword(
            curPw,
            newPw,
            repeatPw,
            profile.email,
          )
          if ((submitLevel as IFailureAPI).status) {
            Alert.alert("", (submitLevel as IFailureAPI).message)
          } else {
            setSubmitText(`Your submission has been received!`)
            setSubmitStatus('success')
            onChangeCurPw("")
            onChangeNewPw("")
            onChangeRepeatPw("")
          }
          setButtonLoading(false)
        } catch (e) {
          setSubmitText(e)
          setSubmitStatus('fail')
          setButtonLoading(false)
        }
      }
    }
  }


  return (<>
      <SafeAreaView style={[
        commonStyles.fullHeight,
        {backgroundColor: theme.colors.lightest}]
      }>
        {submitStatus &&
          <TopBanner
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
                <PasswordInputElement
                  onChange={(text: string) => onChangeCurPw(text)}
                  value={curPw}
                  label={'Current password'}
                  placeHolder={'Your current password'}
                />
                <Line style={{
                  marginTop: 4,
                  marginBottom: 24,
                }}/>
                <PasswordInputElement
                  onChange={(text: string) => onChangeNewPw(text)}
                  value={newPw}
                  label={'New password'}
                  placeHolder={'New password'}
                />
                <PasswordInputElement
                  onChange={(text: string) => onChangeRepeatPw(text)}
                  value={repeatPw}
                  label={'Repeat new password'}
                  placeHolder={'Repeat new password'}
                />
              </View>
            </ScrollView>
          </View>
        </Card>
        <View
          style={styles.btmButton}
        >
          <MayotButton
            disabled={!curPw || !newPw || !repeatPw}
            onPress={onUpdatePWFn}
            label={'Change password'}
            isLoading={buttonLoading}
          />
        </View>
      </SafeAreaView>
    </>
  )
}
export default ChangePassword

