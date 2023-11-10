import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Ellipse,
  Path,
  Rect,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function BadIcon(props: SvgProps) {
  return (
    <Svg
      width={110}
      height={110}
      viewBox="0 0 110 110"
      fill="none"
      {...props}
    >
      <G filter="url(#prefix__filter0_d)">
        <Ellipse
          cx={55}
          cy={50.824}
          rx={50.857}
          ry={50.824}
          fill="url(#prefix__paint0_radial)"
        />
        <Ellipse
          cx={55}
          cy={50.824}
          rx={50.857}
          ry={50.824}
          fill="url(#prefix__paint1_linear)"
        />
        <Path
          d="M104.857 50.824c0 27.516-22.32 49.823-49.857 49.823-27.536 0-49.857-22.307-49.857-49.824C5.143 23.308 27.464 1 55 1c27.536 0 49.857 22.307 49.857 49.824z"
          stroke="#D67504"
          strokeOpacity={0.27}
          strokeWidth={2}
        />
      </G>
      <G filter="url(#prefix__filter1_di)">
        <Path
          d="M42.286 76.235v0c7.28-6.366 18.148-6.366 25.428 0v0"
          stroke="#823423"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>
      <G opacity={0.3} filter="url(#prefix__filter2_di)">
        <Path
          d="M42.286 31.765c-.909 1.059-4.087 3.176-9.536 3.176"
          stroke="#823423"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>
      <G filter="url(#prefix__filter3_di)">
        <Rect
          width={9.536}
          height={12.706}
          rx={4.768}
          transform="matrix(-1 0 0 1 77.25 41.294)"
          fill="#823423"
        />
      </G>
      <G filter="url(#prefix__filter4_di)">
        <Rect
          width={9.536}
          height={12.706}
          rx={4.768}
          transform="matrix(-1 0 0 1 42.286 41.294)"
          fill="#823423"
        />
      </G>
      <G opacity={0.3} filter="url(#prefix__filter5_di)">
        <Path
          d="M67.714 31.765c.909 1.059 4.087 3.176 9.536 3.176"
          stroke="#823423"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>
      <Defs>
        <RadialGradient
          id="prefix__paint0_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 101.647 -101.714 0 55 0)"
        >
          <Stop stopColor="#EED919" />
          <Stop offset={1} stopColor="#F1BE08" />
        </RadialGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={55}
          y1={0}
          x2={55}
          y2={101.647}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity={0.52} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default BadIcon
