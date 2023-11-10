import React from 'react'
import MaayotText, {IMaayotTextProps} from "@frameworks/mobile/components/atomic/text/MaayotText";

interface IMaayotTextDisplayProps extends IMaayotTextProps{

}
const MaayotTextDisplay: React.FC<IMaayotTextProps> = (props: IMaayotTextProps) => {
  return <MaayotText {...props} fontFamily={'SfProDisplay'}>{props.children}</MaayotText>
}
export default MaayotTextDisplay;
