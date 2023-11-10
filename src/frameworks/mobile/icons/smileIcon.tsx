import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Ellipse,
  Path,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SmileIcon(props: SvgProps) {
  return (
    <Svg
      width={110}
      height={111}
      viewBox="0 0 110 111"
      fill="none"
      {...props}
    >
      <G filter="url(#prefix__filter0_d)">
        <Ellipse
          cx={55}
          cy={51.309}
          rx={50.857}
          ry={51.059}
          fill="url(#prefix__paint0_radial)"
        />
        <Ellipse
          cx={55}
          cy={51.309}
          rx={50.857}
          ry={51.059}
            fill="url(#prefix__paint1_linear)"
        />
        <Path
          d="M104.857 51.309c0 27.65-22.325 50.059-49.857 50.059-27.531 0-49.857-22.409-49.857-50.06C5.143 23.659 27.47 1.25 55 1.25c27.532 0 49.857 22.408 49.857 50.059z"
          stroke="#D67504"
          strokeOpacity={0.27}
          strokeWidth={2}
        />
      </G>
      <G filter="url(#prefix__filter1_di)">
        <Path
          d="M32.75 38.544v0c2.38-3.186 7.156-3.186 9.536 0v0"
          stroke="#823423"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>
      <G filter="url(#prefix__filter2_di)">
        <Path
          d="M67.714 38.544v0c2.38-3.186 7.156-3.186 9.536 0v0"
          stroke="#823423"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>
      <G filter="url(#prefix__filter3_di)">
        <Path
          d="M55 83.22c-13.536 0-25.429-8.95-25.429-19.99 0-5.202 4.618-9.25 9.899-8.676l5.834.635a89.649 89.649 0 0019.391 0l5.835-.635c5.28-.574 9.898 3.474 9.898 8.676 0 11.04-11.892 19.99-25.428 19.99z"
          fill="#EB5D3E"
        />
      </G>
      <Defs>
        <RadialGradient
          id="prefix__paint0_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 102.118 -101.714 0 55 .25)"
        >
          <Stop stopColor="#EED919" />
          <Stop offset={1} stopColor="#F1BE08" />
        </RadialGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={55}
          y1={0.25}
          x2={55}
          y2={102.368}
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

export default SmileIcon
