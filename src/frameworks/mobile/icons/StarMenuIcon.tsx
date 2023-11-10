import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

function StarMenuIcon(props: ISvgProps) {
  const theme = useTheme();
  const {stroke = 'gray1'} = props;
  return (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            stroke={theme.colors?.[stroke as ColorStrings]}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
  )
}
export default StarMenuIcon

