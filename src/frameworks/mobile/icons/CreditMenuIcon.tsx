import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

function CreditMenuIcon(props: ISvgProps) {
    const theme = useTheme();
    const { stroke = 'gray1' } = props;
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M20.182 4H3.818C2.814 4 2 4.84 2 5.875v11.25C2 18.16 2.814 19 3.818 19h16.364C21.186 19 22 18.16 22 17.125V5.875C22 4.839 21.186 4 20.182 4zM2 10h20"
                stroke={theme.colors?.[stroke as ColorStrings]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}
export default CreditMenuIcon

