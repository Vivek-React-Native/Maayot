import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function StarIcon(props: SvgProps) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.484.691c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.968 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.299.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69L6.484.69z"
        fill="#fff"
      />
    </Svg>
  )
}

export default StarIcon
