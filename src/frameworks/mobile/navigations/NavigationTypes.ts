import { StackNavigationProp } from '@react-navigation/stack'

interface IScreen {
    route: any
    navigation: any
}

export interface IScreenType<ParamT = undefined> extends IScreen {
    route: {
        params: ParamT
    }
    navigation: StackNavigationProp<any>
}
