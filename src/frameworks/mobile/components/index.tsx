import React, {useCallback, useEffect, useRef, useState} from 'react'
import {StyleSheet, StatusBar, View, Button, Linking} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import di from '@di'
import AppNavigator from './main/AppNavigator'
import AuthNavigator from './auth/AuthNavigator'
import {ISessionEntity} from "@domains/entities/interfaces/iSession";
import OnBoardingNavigator from "@frameworks/mobile/components/OnBoarding/OnBoardingNavigator";
import BottomSheet from "reanimated-bottom-sheet";
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText";
import MayotButton from "@frameworks/mobile/components/atomic/button";
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles";
import useTheme from "../themes/useTheme";
import {privacyLinkConst, termsOfServiceLinkConst} from "@frameworks/mobile/utils/const";
import {usePlatform} from "@hooks";

// @ts-ignore
export const BottomUpContext = React.createContext();

const Index: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { isIos } = usePlatform()
  const [description, setDescription] = useState("");
  const sessionInfo = useSelector(
    (state: any) => state.session.sessionInfo
  )
  const hideOnBoarding = useSelector(
    (state: any) => state.session.hideOnBoarding
  )
  useEffect(() => {
    const checkShowOnBoarding = async () => {
      const hideOnBoarding = await di.session.getHideOnBoarding();
      return hideOnBoarding;
    }
    checkShowOnBoarding().then(hideOnBoarding => {
      dispatch(di.session.setHideOnBoarding(!!hideOnBoarding, false));
    }).catch(e => {

    });
  }, []);
  useEffect(() => {
    ;(async () => {
      const sessionInfo: ISessionEntity = await di.session.getSessionUserInfo()
      if (sessionInfo?.token && sessionInfo?.membershipName) {
        dispatch(di.session.setSession(sessionInfo))
      }
    })()
  }, [sessionInfo?.token])

  const sheetRef = useRef(null);

  const setShow = useCallback(() => {
    //@ts-ignore
    sheetRef.current?.snapTo?.(1)
  }, []);

  const renderHeader = useCallback(() => {
    return <View
      style={[
        commonStyles.justifyStart,
        styles.bottomSheetHeader,
        {
          backgroundColor: theme.colors.gray5,
          borderBottomColor: theme.colors.gray3,
        }
      ]}
    ><MayotButton
      //@ts-ignore
      onPress={() => sheetRef.current?.snapTo?.(0)}
      label={'Close'}
      color={'primary'}
      bgColor={'lightest'}
      size={'smaller14'}
      fontWeight={"bold"}
      style={{
        ...styles.bottomSheetClose,
        backgroundColor:theme.colors.gray5
      }}
      textStyle={{lineHeight: 21}}
    />
    </View>
  }, []);
  const renderContent = useCallback((description) => {
    const openPrivacy = async () => {
      await Linking.openURL(privacyLinkConst)
    }
    const openTermsOfService = async () => {
      await Linking.openURL(termsOfServiceLinkConst)
    }
    return <View
      style={[
        styles.bottomSheet,
        {
          backgroundColor: theme.colors.gray5,
        }
      ]}
    >
      <MaayotText
        color={'gray2'}
        fontWeight="regular"
        size="smallest12"
        style={{
          ...commonStyles.center,
          lineHeight: 14
        }}
      >
        { description }
      </MaayotText>
      <MayotButton
        onPress={openTermsOfService}
        label={'Terms of service'}
        color={'primary'}
        bgColor={'lightest'}
        size={'smaller14'}
        fontWeightNumber={'400'}
        style={{
          ...styles.bottomSheetButton,
          backgroundColor:theme.colors.gray5
        }}
        textStyle={{lineHeight: 21}}
      />
      <MayotButton
        onPress={openPrivacy}
        label={'Privacy policy'}
        color={'primary'}
        bgColor={'lightest'}
        size={'smaller14'}
        fontWeightNumber={'400'}
        style={{
          ...styles.bottomSheetButton,
          backgroundColor:theme.colors.gray5
        }}
        textStyle={{lineHeight: 21}}
      />
    </View>
  }, [])

  return (
    <>
      <BottomUpContext.Provider value={{setShow, setDescription}}>
        <StatusBar barStyle='dark-content'/>
        {
          !hideOnBoarding && <OnBoardingNavigator/> ||
          !sessionInfo?.token && <AuthNavigator/> ||
          sessionInfo?.token && <AppNavigator/>
        }
        {
          isIos && <BottomSheet
            ref={sheetRef}
            snapPoints={[0, 200]}
            renderHeader={renderHeader}
            renderContent={() => renderContent(description)}
          />
        }
      </BottomUpContext.Provider>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
    height: '100%'
  },
  bottomSheet: {
    padding: 10,
    height: 250,
  },
  bottomSheetHeader: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  bottomSheetClose: {
    width: 100,
    alignItems: "flex-start",
    paddingBottom: 5
  },
  bottomSheetButton: {
    paddingVertical: 5,
  }

})

export default Index
