import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

function UserMenuIcon(props: ISvgProps) {
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
              d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
              stroke={theme.colors?.[stroke as ColorStrings]}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
          />
      </Svg>
  )
}
export default UserMenuIcon

