import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

function ToggleMenuAndroidIcon(props: ISvgProps) {
  const theme = useTheme();
  const {stroke = 'lightest'} = props;
  return (
      <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          {...props}
      >
          <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill={theme.colors?.[stroke as ColorStrings]}
          />
      </Svg>
  )
}

export default ToggleMenuAndroidIcon

