import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function PrevIcon(props: SvgProps) {
  return (
    <Svg
      width={11}
      height={18}
      viewBox="0 0 11 18"
      fill="none"
      {...props}
    >
      <Path
        d="M.22 8.95c0 .341.128.634.401.888l7.598 7.441c.215.215.488.332.81.332.645 0 1.162-.508 1.162-1.162 0-.322-.136-.605-.351-.83L2.994 8.95 9.84 2.28a1.21 1.21 0 00.351-.83c0-.654-.517-1.162-1.162-1.162-.322 0-.595.117-.81.332L.62 8.051c-.273.263-.4.556-.4.898z"
        fill="#068466"
      />
    </Svg>
  )
}

export default PrevIcon
