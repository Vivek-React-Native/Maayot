import { IMaayotTheme } from './IMaayotTheme'

const DESIGN_GRID: number = 16

export type ColorStrings =
    | 'primary'
    | 'primary2'
    | 'primary3'
    | 'primary50percent'
    | 'secondary'
    | 'tertiary'
    | 'selected'
    | 'bluefont'
    | 'grey'
    | 'gray'
    | 'gray1'
    | 'gray2'
    | 'gray3'
    | 'gray4'
    | 'gray5'
    | 'fontgrey'
    | 'light'
    | 'lighter'
    | 'lightest'
    | 'dark'
    | 'darker'
    | 'darkest'
    | 'warning'
    | 'information'
    | 'success'

export type FontSizeStrings =
    | 'tiniest9'
    | 'tiny10'
    | 'tiny11'
    | 'smallest12'
    | 'smaller14'
    | 'small16'
    | 'small17'
    | 'normal18'
    | 'normal19'
    | 'normal20'
    | 'large21'
    | 'larger24'
    | 'larger28'
    | 'largest32'
    | 'large36'
    | 'large48'
    | 'large64'
    | 'largest96'

export type MaayotThemeShadowItem =
    | {}
    | {
          shadowColor: string
          shadowOffset: {
              width: number
              height: number
          }
          shadowOpacity: number
          shadowRadius: number
          elevation: number
      }

const getShadowWithStrength = (strength?: number): MaayotThemeShadowItem => {
    let s = strength || 1
    if (s < 1) return {}
    if (s > 24) {
        s = 24
    }
    return {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: [
                1,
                1,
                1,
                2,
                2,
                3,
                3,
                4,
                4,
                5,
                5,
                6,
                6,
                7,
                7,
                8,
                8,
                9,
                9,
                10,
                10,
                11,
                11,
                12
            ][s - 1]
        },
        shadowOpacity: Math.round(1.8 * s + 18) / 100,
        shadowRadius: Math.round((0.65326 * s + 0.25396) * 100) / 100,
        elevation: strength
    }
}

const theme: IMaayotTheme = {
    colors: {
        primary: '#068466',
        primary2: '#FC9F5B',
        primary3: '#001E42',
        primary50percent: '#8f98ab',
        secondary: '#333333',
        tertiary: '#B5173B',
        selected: '#119de7',

        bluefont: '#1E3056',
        grey: '#999999',
        fontgrey: '#b1b1b1',

        gray: '#F3F8F7',
        gray1: '#222525',
        gray2: '#62636B',
        gray3: '#ECEBEA',
        gray4: '#F8F6F4',
        gray5: '#F7F7F7',

        light: '#F9FAFF',
        lighter: '',
        lightest: '#ffffff',
        dark: '',
        darker: '#363636',
        darkest: '#000000',

        warning: '#ED6A5E',
        information: '#FF9D6F',
        success: '#78b56f'
    },
    typography: {
        //Sizes
        size: {
            tiniest9: 9,
            tiny10: 10,
            tiny11: 10,
            smallest12: 12,
            smaller14: 14,
            small16: 16,
            small17: 17,
            normal18: 18,
            normal19: 19,
            normal20: 20,
            large21: 21,
            larger24: 24,
            larger28: 28,
            largest32: 32,
            large36: 36,
            large48: 48,
            large64: 64,
            largest96: 96
        }
    },
    grid: {
        default: DESIGN_GRID,
        gridFactor: (f: number) => f * DESIGN_GRID
    },
    shadows: {
        default: getShadowWithStrength(5),
        shadow: getShadowWithStrength
    },
    modalButtons: {
        default: {
            backgroundColor: '#0D507A',
            height: 48,
            borderRadius: 16,
            width: '100%'
        },
        dismiss: { backgroundColor: 'red' }
    }
}

export default theme
