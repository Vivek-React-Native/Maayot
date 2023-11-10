import { StackActions, useNavigation } from '@react-navigation/native'

export default () => {
    const { navigate, goBack, dispatch, setOptions } = useNavigation()
    const nav = (dest: string, options?: object) => {
        return navigate(dest, options)
    }

    const p = (dest: string, options: object) => {
        return dispatch(StackActions.push(dest, options))
    }

    return {
        navigate: nav,
        goBack,
        push: p,
        setOptions
    }
}
