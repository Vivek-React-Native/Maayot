import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";


function HomeIconAndroid(props: ISvgProps) {
  const theme = useTheme();
  const {stroke = 'grey'} = props;
  return (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
      <Path
          d="M6.251 14.212a.9.9 0 00-.9.9v3.543a2.311 2.311 0 002.312 2.311h8.67a2.311 2.311 0 002.31-2.31v-3.544a.9.9 0 00-1.798 0v3.543a.505.505 0 01-.512.513h-8.67a.513.513 0 01-.513-.513v-3.543a.9.9 0 00-.899-.9zM20.73 12.36l-8.095-8.094a.9.9 0 00-1.277 0L7.5 8.133V6.91a.9.9 0 00-1.798 0v3.022L3.264 12.36a.903.903 0 101.278 1.277l7.455-7.446 7.455 7.455a.9.9 0 001.277 0 .9.9 0 000-1.286z"
          fill={theme.colors?.[stroke as ColorStrings]}
          stroke={'none'}
      />
    </Svg>
)
}

export default HomeIconAndroid
