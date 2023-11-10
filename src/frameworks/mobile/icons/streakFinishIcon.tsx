import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function StreakFinishIcon(props: SvgProps) {
  return (
    <Svg
      width={31}
      height={32}
      viewBox="0 0 31 32"
      fill="none"
      {...props}
    >
      <Path
        d="M30.77 16.871a15.14 15.14 0 00-.923-5.222c-.408 4.796-2.956 7.26-5.619 6.112-2.494-1.075-.813-5.265-.689-7.265.21-3.39-.01-7.27-6.147-10.496 2.55 4.895.296 7.935-2.069 8.12-2.623.206-5.026-2.262-4.139-6.266C8.312 3.977 8.23 7.55 9.115 9.864c.924 2.409-.037 4.411-2.29 4.634-2.52.249-3.919-2.707-2.629-7.416a15.102 15.102 0 00-3.58 9.79C.615 25.226 7.365 32 15.691 32c8.327 0 15.077-6.773 15.077-15.129z"
        fill="#F4900C"
      />
    </Svg>
  )
}

export default StreakFinishIcon
