import React from 'react'
import MaayotText, {IMaayotTextProps} from "@frameworks/mobile/components/atomic/text/MaayotText";
import { charactersPreference } from '@frameworks/mobile/utils/const'
interface IMaayotTextNotoSansSCProps extends IMaayotTextProps{

}
const MaayotTextNotoSansSC: React.FC<IMaayotTextNotoSansSCProps> = (props: IMaayotTextNotoSansSCProps) => {
  // return <MaayotText {...props} fontFamily={'NotoSansSC'}>{converter(props.children)}</MaayotText>
  return <MaayotText {...props} fontFamily={'NotoSansSC'}>{global.characterPreference === charactersPreference.TRADITIONAL ? global.converterTraditional(props.children) : global.converterSimplified(props.children)}</MaayotText>
}
export default MaayotTextNotoSansSC;


