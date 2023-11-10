import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface IIconProp extends SvgProps {
  width?: number
  height?: number
}
function StreakWhiteIcon(props: IIconProp) {
  const {
    height = 24,
    width = 24,
  } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 55 60"
      fill="none"
      {...props}
    >
      <Path
        d="M52 30.4158C52 27.4338 51.4711 24.5748 50.5012 21.9299C49 29.5 45.6977 33.726 41.3713 31.8619C37.3187 30.115 40.0498 23.3051 40.2515 20.0557C40.5916 14.5474 40.2342 8.24223 30.2627 3C34.4061 10.9537 30.7426 15.8952 26.9005 16.196C22.6375 16.53 18.7333 12.5199 20.1745 6.01229C15.508 9.46276 15.3725 15.2704 16.8122 19.0275C18.3139 22.9436 16.7517 26.1974 13.0897 26.5589C8.99674 26.9638 7.5 22 8.81947 14.5083C5.19059 18.7961 3 24.3492 3 30.4158C3 43.9935 13.9688 55 27.5 55C41.0312 55 52 43.9935 52 30.4158Z"
        stroke="#fff"
        strokeWidth={5}
      />
    </Svg>
  )
}

export default StreakWhiteIcon
