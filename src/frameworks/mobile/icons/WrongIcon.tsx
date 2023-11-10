import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

function WrongIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Circle cx={12} cy={12} r={12} fill="#ED6A5E" />
      <Path
        d="M16 8l-8 8M8 8l8 8"
        stroke="#fff"
        strokeWidth={1.333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default WrongIcon
