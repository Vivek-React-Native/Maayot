import { MaayotThemeShadowItem } from './MaayotTheme'

export interface ITheme {
    theme?: IMaayotTheme
}

export interface IMaayotTheme {
    colors: IMaayotThemeColors
    typography: IMaayotThemeTypography
    grid: IMaayotThemeGrid
    shadows: IMaayotThemeShadow
    modalButtons: any
}

interface IMaayotThemeColors {
    primary: string
    primary2: string
    primary3: string
    primary50percent: string
    secondary: string
    tertiary: string
    selected: string
    bluefont: string
    grey: string
    gray: string
    gray1: string
    gray2: string
    gray3: string
    gray4: string
    gray5: string
    fontgrey: string
    light: string
    lighter: string
    lightest: string
    dark: string
    darker: string
    darkest: string
    warning: string
    information: string
    success: string
}

interface IMaayotThemeTypography {
    size: {
        tiniest9: number
        tiny10: number
        tiny11: number
        smallest12: number
        smaller14: number
        small16: number
        small17: number
        normal18: number
        normal19: number
        normal20: number
        large21: number
        larger24: number
        larger28: number
        largest32: number
        large36: number
        large48: number
        large64: number
        largest96: number
    }
}

interface IMaayotThemeGrid {
    default: number
    gridFactor: (f: number) => number
}

interface IMaayotThemeShadow {
    default: MaayotThemeShadowItem
    shadow: (strength?: number) => MaayotThemeShadowItem
}
