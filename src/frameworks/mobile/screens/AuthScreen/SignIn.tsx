import React, { useState, useEffect, useRef } from 'react'
import { View, TextInput, SafeAreaView, Linking, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import di from '@di'
import MaayotText from '@frameworks/mobile/components/atomic/text/MaayotText'
import useTheme from '../../themes/useTheme'
import MayotButton from '@frameworks/mobile/components/atomic/button'
import styles from './styles'
import useNavigation from '@frameworks/mobile/navigations/useNavigation'
import { ILoginAction } from '@adapters/presenters/action-interfaces/iSession'
import { IFailureAPI } from '@adapters/infrastructures/interfaces/iHttp'
import { endPoint, navigationRoutes } from '@frameworks/mobile/utils/const'
import MaayotTextDisplay from '@frameworks/mobile/components/atomic/text/MaayotTextDisplay'
import { Emailvalidation } from '../../utils/utils'

const Anonymous = () => {}

const SignInScreen: React.FC = ({ route }: any) => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const [email, onChangeEmail] = useState('')
  const [userPw, onChangePw] = useState('')
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  // refs
  const passwordRef = useRef<any>()

  //check login
  useEffect(() => {
    // handleClickAccreditation();
    if (route?.params?.email) {
      onChangeEmail(route.params.email)
    }
  }, [route?.params?.email])
  //
  const showModalWrong = (massage?: any) => {
    Alert.alert(
      'Oops',
      massage || 'Incorrect Email Or Password',
      [{ text: 'OK', onPress: Anonymous }],
      { cancelable: false }
    )
  }
  const handleClickAccreditation = async () => {
    if (!Emailvalidation(email)) {
      return showModalWrong('Please enter correct email')
    }
    if (!buttonLoading) {
      setButtonLoading(true)
      if (!email || !userPw) {
        showModalWrong()
      } else {
        const loginRes: ILoginAction | IFailureAPI = await di.session.login(
          email,
          userPw
        )
        if ((loginRes as IFailureAPI)?.status === 401) {
          showModalWrong()
        } else {
          dispatch(loginRes)
        }
      }
      setButtonLoading(false)
    }
  }

  const handleForgotPw = async () => {
    Linking.openURL(endPoint.URL + '/login?forgot-password')
      .then((r) => {})
      .catch(console.error)
  }

  const handleRegister = async () => {
    navigate(navigationRoutes.NAVIGATION_REGISTER_PATH, {})
    // dispatch(await di.session.handleRegister(userId, userPw))
  }

  return (
    <>
      <View style={styles.loginForm}>
        <View style={styles.loginFormTitle}>
          <MaayotTextDisplay
            color={'primary'}
            fontWeight='bold'
            size='normal18'
            style={styles.logo}
          >
            maayot
          </MaayotTextDisplay>
          <MaayotTextDisplay
            color={'gray1'}
            fontWeight='bold'
            size='largest32'
            fontDisplay={true}
            style={styles.title}
          >
            Sign In
          </MaayotTextDisplay>
        </View>
        <MaayotText
          color={'gray1'}
          fontWeight='regular'
          size='smallest12'
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
          onChangeText={(text) => onChangeEmail(text.trim())}
          value={email}
          autoCapitalize={'none'}
          placeholder={'email'}
          placeholderTextColor={'#00000040'}
          returnKeyType={'next'}
          onEndEditing={() => passwordRef.current.focus()}
        />
        <MaayotText
          color={'gray1'}
          fontWeight='regular'
          size='smallest12'
          style={styles.formElementTitle}
        >
          Password
        </MaayotText>
        <TextInput
          ref={passwordRef}
          style={[
            styles.inputView,
            {
              borderColor: theme.colors.gray3,
              marginBottom: 16
            }
          ]}
          onChangeText={(text) => onChangePw(text.trim())}
          value={userPw}
          secureTextEntry={true}
          placeholder={'Password'}
          placeholderTextColor={'#00000040'}
          returnKeyType={'done'}
        />
        <View style={styles.forgotPwBtn}>
          <MayotButton
            onPress={handleForgotPw}
            label={'Forgot password'}
            color={'primary'}
            bgColor={'lightest'}
            size={'smaller14'}
            style={{ padding: 0 }}
            fontWeight={'regular'}
            fontWeightNumber={'600'}
            textStyle={{ lineHeight: 22 }}
          />
        </View>
        <MayotButton
          onPress={handleClickAccreditation}
          label={'Sign In'}
          style={styles.actionButton}
          isLoading={buttonLoading}
        />
        <View style={[styles.flexRow, styles.bottomText]}>
          <MaayotText
            color={'gray1'}
            fontWeight='regular'
            size='smaller14'
            fontWeightNumber={'400'}
            style={{ lineHeight: 21 }}
          >
            Don’t have an account?
          </MaayotText>
          <MayotButton
            onPress={handleRegister}
            label={'Register'}
            color={'primary'}
            bgColor={'lightest'}
            size={'smaller14'}
            fontWeightNumber={'400'}
            style={styles.moreBottomBtn}
            textStyle={{ lineHeight: 21 }}
          />
        </View>
      </View>
    </>
  )
}

export default SignInScreen
