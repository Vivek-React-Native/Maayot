import * as React from "react"
import Svg, {Path, Rect} from "react-native-svg"
import {ISvgProps} from "@frameworks/mobile/icons/type";

function PauseIcon(props: ISvgProps) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      {...props}
    >
      <Rect width={50} height={50} rx={8} fill="#001E42" />
      <Path
        d="M23 17h-4v16h4V17zM31 17h-4v16h4V17z"
        stroke="#fff"
        strokeWidth={1.333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>

  )
}

export default PauseIcon
