import IInfrastructures from './interfaces/iInfrastructures'
import Http from '@adapters/infrastructures/Http'
import MobileStorage from '@adapters/infrastructures/MobileStorage'
import AsyncStorage from '@react-native-community/async-storage'
// @ts-ignore
import {
  endPoint
} from "@frameworks/mobile/utils/const"
export default (): IInfrastructures => {
    return {
        http: new Http(endPoint.API_URL, endPoint.API_URL_V1),
        storage: new MobileStorage(AsyncStorage)
    }
}
