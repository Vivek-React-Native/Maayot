import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

function UpSquareIcon(props: ISvgProps) {
  const theme = useTheme();
  const {stroke = 'gray1'} = props;
  return (
      <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          {...props}
      >
        <Path
            clipRule="evenodd"
            d="M16.334 2.75H7.665c-3.02 0-4.915 2.139-4.915 5.166v8.168c0 3.027 1.885 5.166 4.915 5.166h8.67c3.03 0 4.915-2.139 4.915-5.166V7.916c0-3.027-1.886-5.166-4.916-5.166z"
            stroke={theme.colors?.[stroke as ColorStrings]}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12 7.914v8.172M8.252 11.678L12 7.914l3.748 3.764"
            stroke={theme.colors?.[stroke as ColorStrings]}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </Svg>
  )
}

export default UpSquareIcon

