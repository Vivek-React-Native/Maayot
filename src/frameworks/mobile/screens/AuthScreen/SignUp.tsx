import React, { useRef, useState } from 'react'
import { View, TextInput, Linking, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import MaayotText from '@frameworks/mobile/components/atomic/text/MaayotText'
import useTheme from '../../themes/useTheme'
import MayotButton from '@frameworks/mobile/components/atomic/button'
import styles from './styles'
import useNavigation from '@frameworks/mobile/navigations/useNavigation'
import { navigationRoutes } from '@frameworks/mobile/utils/const'
import MaayotTextDisplay from '@frameworks/mobile/components/atomic/text/MaayotTextDisplay'
import commonStyles from '@frameworks/mobile/components/atomic/commonStyles'
import { Emailvalidation } from '../../utils/utils'

const SignUp: React.FC = () => {
  const { navigate } = useNavigation()
  const theme = useTheme()
  const [firstName, onChangeFirstName] = useState('')
  const [email, onChangeEmail] = useState('')
  const [userPw, onChangePw] = useState('')
  const [repeatPw, onChangeRepeatPw] = useState<string>('')

  // refs
  const emailref = useRef<any>()
  const passwordRef = useRef<any>()
  const confirmPasswordRef = useRef<any>()

  const showModalWrong = (message: string) => {
    Alert.alert('Oops', message, [{ text: 'OK', onPress: () => {} }], {
      cancelable: false
    })
  }

  const handleSignUpPress = async () => {
    if (!Emailvalidation(email)) {
      return showModalWrong('Please enter correct email')
    } else if (userPw.length < 8) {
      return showModalWrong('Password must be 8 characters long')
    } else if (repeatPw !== userPw) {
      return showModalWrong('Password does not match')
    }

    navigate(navigationRoutes.NAVIGATION_SELECT_PATH, {
      firstName,
      email,
      password: userPw,
      confirmPassword: repeatPw
    })
  }

  const handleSignIn = async () => {
    navigate(navigationRoutes.NAVIGATION_LOGIN_PATH, {})
  }

  const handleTermsOfCondition = () => {
    Linking.openURL('https://www.maayot.com/terms-of-use')
      .then((r) => {})
      .catch(console.error)
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
            Register
          </MaayotTextDisplay>
        </View>
        <MaayotText
          color={'gray1'}
          fontWeight='regular'
          size='smallest12'
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
          onChangeText={(text) => onChangeFirstName(text.trim())}
          value={firstName}
          autoCapitalize={'none'}
          placeholder={'First Name'}
          placeholderTextColor={'#00000040'}
          onSubmitEditing={() => emailref.current.focus()}
          returnKeyType={'next'}
        />
        <MaayotText
          color={'gray1'}
          fontWeight='regular'
          size='smallest12'
          style={styles.formElementTitle}
        >
          Email
        </MaayotText>
        <TextInput
          ref={emailref}
          style={[
            styles.inputView,
            {
              borderColor: theme.colors.gray3
            }
          ]}
          onChangeText={(text) => onChangeEmail(text.trim())}
          autoCapitalize='none'
          value={email}
          placeholder={'Email'}
          placeholderTextColor={'#00000040'}
          returnKeyType={'next'}
          onSubmitEditing={() => passwordRef.current.focus()}
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
              borderColor: theme.colors.gray3
            }
          ]}
          onChangeText={(text) => onChangePw(text.trim())}
          value={userPw}
          secureTextEntry={true}
          autoCapitalize={'none'}
          placeholder={'Password'}
          placeholderTextColor={'#00000040'}
          returnKeyType={'next'}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
        />
        <MaayotText
          color={'gray1'}
          fontWeight='regular'
          size='smallest12'
          style={styles.formElementTitle}
        >
          Repeat Password
        </MaayotText>
        <TextInput
          ref={confirmPasswordRef}
          style={[
            styles.inputView,
            {
              borderColor: theme.colors.gray3
            }
          ]}
          onChangeText={(text) => onChangeRepeatPw(text.trim())}
          value={repeatPw}
          secureTextEntry={true}
          autoCapitalize={'none'}
          placeholder={'Repeat Password'}
          placeholderTextColor={'#00000040'}
          returnKeyType={'done'}
        />
        <MayotButton
          onPress={handleSignUpPress}
          label={'Register'}
          style={styles.actionRegisterButton}
          disabled={!email || !userPw || !repeatPw || firstName.length < 3}
        />
        <View style={[styles.flexRow, styles.bottomText]}>
          <MaayotText
            color={'gray1'}
            fontWeight='regular'
            size='smaller14'
            fontWeightNumber={'400'}
            style={{ lineHeight: 21 }}
          >
            Already have an account?
          </MaayotText>
          <MayotButton
            onPress={handleSignIn}
            label={'Sign In Now'}
            color={'primary'}
            bgColor={'lightest'}
            size={'smaller14'}
            style={styles.moreBottomBtn}
            fontWeightNumber={'400'}
            textStyle={{ lineHeight: 21 }}
          />
        </View>
      </View>
      <View style={[styles.moreBottom]}>
        <MaayotText
          color={'gray2'}
          fontWeight='regular'
          size='smallest12'
          style={{
            ...styles.center,
            lineHeight: 14
          }}
        >
          By registering, you agree to
        </MaayotText>
        <View
          style={[
            commonStyles.flxRow,
            commonStyles.center,
            commonStyles.alignItemsEnd
          ]}
        >
          <MaayotText
            color={'gray2'}
            fontWeight='regular'
            size='smallest12'
            style={{
              ...styles.center,
              lineHeight: 14
            }}
          >
            our
          </MaayotText>
          <MayotButton
            onPress={handleTermsOfCondition}
            label={'terms of use'}
            fontWeightNumber={'400'}
            color={'primary'}
            bgColor={'lightest'}
            size={'smallest12'}
            style={styles.moreBottomBtn}
            textStyle={{ lineHeight: 14 }}
          />
        </View>
      </View>
    </>
  )
}

export default SignUp
