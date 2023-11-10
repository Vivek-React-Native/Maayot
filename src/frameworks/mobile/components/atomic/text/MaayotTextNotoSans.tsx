import React from 'react'
import MaayotText, {IMaayotTextProps} from "@frameworks/mobile/components/atomic/text/MaayotText";
import { charactersPreference } from '@frameworks/mobile/utils/const'

interface IMaayotTextNotoSans extends IMaayotTextProps{

}
const MaayotTextNotoSans: React.FC<IMaayotTextNotoSans> = (props: IMaayotTextNotoSans) => {
  return <MaayotText {...props} fontFamily={'NotoSansSC'}>{global.characterPreference === charactersPreference.TRADITIONAL ? global.converterTraditional(props.children) : global.converterSimplified(props.children)}</MaayotText>
}
export default MaayotTextNotoSans;
