import * as React from 'react'
import Svg, {Path } from 'react-native-svg'
import useTheme from '../themes/useTheme'
import {ISvgProps} from "@frameworks/mobile/icons/type";
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

function StreakIcon(props: ISvgProps) {
  const theme = useTheme();
  const {stroke = 'grey'} = props;
  return (
        <Svg
            width={32}
            height={32}
            viewBox='0 -10 50 85'
            fill='none'
            {...props}
        >
            <Path
                d='M52 30.4158C52 27.4338 51.4711 24.5748 50.5012 21.9299C49 29.5 45.6977 33.726 41.3713 31.8619C37.3187 30.115 40.0498 23.3051 40.2515 20.0557C40.5916 14.5474 40.2342 8.24223 30.2627 3C34.4061 10.9537 30.7426 15.8952 26.9005 16.196C22.6375 16.53 18.7333 12.5199 20.1745 6.01229C15.508 9.46276 15.3725 15.2704 16.8122 19.0275C18.3139 22.9436 16.7517 26.1974 13.0897 26.5589C8.99674 26.9638 7.5 22 8.81947 14.5083C5.19059 18.7961 3 24.3492 3 30.4158C3 43.9935 13.9688 55 27.5 55C41.0312 55 52 43.9935 52 30.4158Z'
                stroke={theme.colors?.[stroke as ColorStrings]}
                strokeWidth={5}
            />
        </Svg>
    )
}

export default StreakIcon
