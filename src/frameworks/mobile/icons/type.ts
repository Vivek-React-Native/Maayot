import { SvgProps } from 'react-native-svg'
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme";

export interface ISvgProps extends SvgProps{
  stroke?:ColorStrings | 'none' | ''
  fill?:ColorStrings | 'none' | ''
  bgColor?:ColorStrings | 'none' | ''
  color?:ColorStrings | 'none' | ''
}
