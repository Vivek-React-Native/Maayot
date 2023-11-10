import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function StreakFinishUnCheckIcon(props: SvgProps) {
  return (
    <Svg
      width={31}
      height={32}
      viewBox="0 0 56 57"
      fill="none"
      {...props}
    >
      <Path
        d="M52 30.416c0-2.982-.529-5.841-1.499-8.486-1.501 7.57-4.803 11.796-9.13 9.932-4.052-1.747-1.321-8.557-1.12-11.806.34-5.509-.017-11.814-9.988-17.056 4.143 7.954.48 12.895-3.363 13.196-4.262.334-8.167-3.676-6.726-10.184-4.666 3.45-4.801 9.258-3.362 13.015 1.502 3.917-.06 7.17-3.722 7.532-4.093.405-5.59-4.559-4.27-12.05A24.542 24.542 0 003 30.415C3 43.993 13.969 55 27.5 55S52 43.993 52 30.416z"
        stroke="#62636B"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default StreakFinishUnCheckIcon
