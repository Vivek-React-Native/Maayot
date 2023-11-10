import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";


function HomeIcon(props: ISvgProps) {
  const theme = useTheme();
  const {stroke = 'grey'} = props;
  return (
    <Svg
      width={32}
      height={32}
      viewBox='0 0 32 32'
      fill='none'
      //   xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Path
        d='M9.61 17.92a1 1 0 00-1 1v3.94a2.57 2.57 0 002.57 2.57h9.64a2.57 2.57 0 002.57-2.57v-3.94a1 1 0 00-2 0v3.94a.56.56 0 01-.57.57h-9.64a.57.57 0 01-.57-.57v-3.94a1 1 0 00-1-1zM25.71 15.86l-9-9a1 1 0 00-1.42 0L11 11.16V9.8a1 1 0 00-2 0v3.36l-2.71 2.7a1.004 1.004 0 001.42 1.42L16 9l8.29 8.29a1.002 1.002 0 001.42 0 1 1 0 000-1.43z'
        stroke={'none'}
        fill={theme.colors?.[stroke as ColorStrings]}
      />
    </Svg>
  )
}

export default HomeIcon
