import * as React from "react"
import Svg, { Path } from "react-native-svg"
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";

function LevelStarIcon(props: ISvgProps) {
  const theme = useTheme();
  const {stroke = '', fill=""} = props;
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <Path
        d="M7 .333l2.06 4.174 4.607.673-3.334 3.247.787 4.586L7 10.847l-4.12 2.166.787-4.586L.333 5.18l4.607-.673L7 .333z"
        fill={fill? theme.colors?.[fill as ColorStrings] : 'none'}
        stroke={stroke? theme.colors?.[stroke as ColorStrings] : 'none'}
        strokeWidth={stroke ? 1: 0}
      />
    </Svg>

  )
}

export default LevelStarIcon
