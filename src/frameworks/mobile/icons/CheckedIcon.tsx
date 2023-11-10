import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

function CheckedIcon(props: ISvgProps) {
  const theme = useTheme();
  const {bgColor = 'primary', fill = 'lightest'} = props;
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Circle
        cx={12}
        cy={12}
        r={12}
        fill={theme.colors?.[bgColor as ColorStrings]}
      />
      <Path
        d="M18 7.875l-8.25 8.938L6 12.75"
        stroke={theme.colors?.[fill as ColorStrings]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
export default CheckedIcon
