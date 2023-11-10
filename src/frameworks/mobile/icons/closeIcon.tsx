import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function CloseIcon(props: SvgProps) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15z"
        fill="#fff"
      />
      <Path
        d="M9.906 19c-.383.375-.39 1.063.008 1.46.399.4 1.086.384 1.461.009L15 16.844l3.625 3.617c.39.39 1.063.398 1.46-.008a1.05 1.05 0 00.009-1.46l-3.617-3.618 3.617-3.625a1.05 1.05 0 00-.008-1.46 1.042 1.042 0 00-1.461-.009L15 13.898l-3.625-3.625c-.375-.375-1.063-.39-1.46.008-.4.399-.392 1.086-.009 1.469l3.625 3.625L9.906 19z"
        fill="#001E42"
      />
    </Svg>
  )
}

export default CloseIcon
