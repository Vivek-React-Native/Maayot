import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {ISvgProps} from "@frameworks/mobile/icons/type";
import useTheme from '../themes/useTheme'
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

function NextIcon(props: ISvgProps) {
  const theme = useTheme();
  const {stroke = 'primary'} = props;
  return (
    <Svg
      width={11}
      height={18}
      viewBox="0 0 11 18"
      fill="none"
      {...props}
    >
      <Path
        d="M10.78 8.95a1.272 1.272 0 00-.401-.9L2.78.62a1.129 1.129 0 00-.81-.333C1.316.287.809.795.809 1.45c0 .313.127.606.351.83l6.836 6.67-6.836 6.67a1.152 1.152 0 00-.351.83c0 .654.507 1.162 1.162 1.162.312 0 .586-.117.81-.332l7.598-7.441c.273-.254.4-.547.4-.889z"
        fill={theme.colors?.[stroke as ColorStrings]}
        stroke='none'
      />
    </Svg>
  )
}

export default NextIcon
