import * as React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"

function IntermediateIcon(props: SvgProps) {
  return (
    <Svg
      width={45}
      height={45}
      viewBox="0 0 45 45"
      fill="none"
      {...props}
    >
      <Path
        opacity={0.23}
        d="M0 9a9 9 0 019-9h23S19 5 19 22.5 32 45 32 45H9a9 9 0 01-9-9V9z"
        fill="#FC9F5B"
      />
      <Rect x={0.5} y={0.5} width={44} height={44} rx={8.5} stroke="#FC9F5B" />
    </Svg>
  )
}

export default IntermediateIcon
