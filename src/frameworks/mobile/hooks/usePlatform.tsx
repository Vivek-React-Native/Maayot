import React, { createContext, useContext, useState } from 'react'
import { Platform } from 'react-native'

export const PlatformContext = createContext({
    isIos: false
})

interface IPlatformProvider {
    children: React.ReactNode
}

export const PlatformProvider = ({ children }: IPlatformProvider) => {
    const [isIos] = useState<boolean>(Platform.OS === 'ios')

    return (
        <PlatformContext.Provider
            value={{
                isIos
            }}
        >
            {children}
        </PlatformContext.Provider>
    )
}

// used by: const {ios} = usePlatform()
export const usePlatform = () => useContext(PlatformContext)
