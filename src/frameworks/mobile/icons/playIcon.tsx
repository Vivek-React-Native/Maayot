import * as React from "react"
import Svg, {Path, Rect} from "react-native-svg"
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";
import useTheme from '../themes/useTheme'

function PlayIcon(props: ISvgProps) {
  const theme = useTheme();
  const {fill = ''} = props;
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      {...props}
    >
      <Rect width={50} height={50} rx={8} fill={fill? theme.colors[fill as ColorStrings] : '#001E42'} />
      <Path
        d="M19 16l14 9-14 9V16z"
        stroke="#fff"
        fill={fill? theme.colors[fill as ColorStrings] : '#001E42'}
        strokeWidth={1.333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>

  )
}

export default PlayIcon
