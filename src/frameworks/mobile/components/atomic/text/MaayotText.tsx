import React, { ReactElement } from 'react'
import { Text, TextStyle } from 'react-native'
import { ColorStrings, FontSizeStrings } from '../../../themes/MaayotTheme'
import useTheme from '../../../themes/useTheme'

import { capitalize } from '../../../helpers'

export interface IMaayotTextProps {
    style?: TextStyle
    children?: string | number | ReactElement
    color?: ColorStrings
    size?: FontSizeStrings
    fontWeight?: 'bold' | 'regular' | 'semibold'
    fontWeightNumber?: "400" | "500" | "600",
    fontFamily?:'NotoSansSC' | 'SfProDisplay' | 'NotoSans'
    fontDisplay?: boolean,
}

const MaayotText: React.FC<IMaayotTextProps> = ({
    color: propColor,
    fontWeight,
    fontWeightNumber,
    style: propStyle,
    children,
    size,
    fontFamily,
    ...rest
}) => {
    const theme = useTheme()

    const color = theme.colors[propColor || 'lightest']
    const fontSize = theme.typography.size[size || 'normal18']
    const font = `${fontFamily? fontFamily:`SfProText`}-${fontWeight ? capitalize(fontWeight) : 'Regular'}`
    const style: TextStyle = {
        flexShrink: 1,
        color,
        fontSize,
        fontFamily:font,
        fontWeight: fontWeightNumber,
        ...propStyle,
    }
    return (
        <Text style={style} {...rest}>
            {children}
        </Text>
    )
}

MaayotText.defaultProps = {
    style: undefined,
    color: 'lightest',
    size: 'normal18',
    fontWeight: 'regular',
}

MaayotText.defaultProps.allowFontScaling = false;

export default MaayotText
