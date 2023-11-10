import React, { useState } from 'react'
import useTheme from '../../themes/useTheme'
import { View, Dimensions, Text, ScrollView, SafeAreaView } from 'react-native'
import Login from '../../components/logins/Login'
import Board from '../../components/boards/Board'
import { IScreenType } from 'navigations/NavigationTypes'

const ComponentScreen: React.FC<IScreenType> = ({ navigation, route }) => {
    const theme = useTheme()

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#ff0000'
            }}
        >
            <View
                style={{ flex: 1, paddingVertical: theme.grid.gridFactor(1) }}
            >
                {/* TODO: Should have a ScreenWrapper */}
                <Login />
                <Board />
            </View>
        </SafeAreaView>
    )
}

export default ComponentScreen
