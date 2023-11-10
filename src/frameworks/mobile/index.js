import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import store from '@frameworks/mobile/redux/store'
import Index from './components'
import { NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {PlatformProvider} from "./hooks";
import { charactersPreference } from '@frameworks/mobile/utils/const'
Icon.loadFont()
const OpenCC = require('opencc-js');
global.converterTraditional = OpenCC.Converter({ from: 'cn', to: 'hk' });
global.converterSimplified = OpenCC.Converter({ from: 'hk', to: 'cn' });
global.characterPreference = charactersPreference.SIMPLIFIED
// Put all providers here so that providers are able to use redux store
const AppContainer = () => {
  return (
    <NavigationContainer>
      <PlatformProvider>
        <Index />
      </PlatformProvider>
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </>
  )
}

AppRegistry.registerComponent(appName, () => App)
