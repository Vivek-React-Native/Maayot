import React, {useState, useMemo, useRef} from 'react'
import {StyleSheet, TouchableOpacity, View, Easing, Dimensions} from 'react-native'
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText"
import useTheme from '../../../themes/useTheme'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import {ColorStrings} from "@frameworks/mobile/themes/MaayotTheme"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import Popover from 'react-native-popover-view'
import CloseIcon from "@frameworks/mobile/icons/closeIcon"
import MaayotTextNotoSansSC from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSansSC";
import { charactersPreference } from '@frameworks/mobile/utils/const';
const { width, height } = Dimensions.get('window')
type IWordProps = {
  key: string,
  id: string,
  onPress: any,
  word: any,
  isNewWord: boolean,
  isOldWord: boolean,
  isActive: boolean,
  showIcon?: boolean,
}
const Word: React.FC<IWordProps> = React.memo((props: IWordProps) => {
  const {
    id,
    onPress,
    word,
    isNewWord,
    isOldWord,
    isActive,
    showIcon
  } = props
  const theme = useTheme()
  const wordRef = useRef<any>()
  const [bgColor, color] = useMemo<ColorStrings[]>(() => {
    if (isActive) {
      if (isNewWord) {
        return ['primary', 'lightest']
      } else if (isOldWord) {
        return ['primary2', 'lightest']
      } else {
        return ['gray3', 'gray1']
      }
    } else {
      if (isNewWord) {
        return ['lightest', 'primary']
      } else if (isOldWord) {
        return ['lightest', 'primary2']
      } else {
        return ['lightest', 'gray1']
      }
    }
  }, [isNewWord, isActive])
  const arEnglish = word?.english?.split('/')
  return <TouchableOpacity
    onPress={() => word.pinyin && onPress(id, wordRef, word)}
    ref={wordRef}
  >
    <View
      style={[
        storyDetailStyles.wordBg,
        {
          backgroundColor: theme.colors[bgColor],
          marginHorizontal: showIcon ? 2 :0,
        }
      ]}
    >
      <MaayotTextNotoSansSC
        color={color}
        fontWeightNumber="400"
        size="normal18"
        style={storyDetailStyles.word}
      >
        {global.characterPreference === charactersPreference.TRADITIONAL ? global.converterTraditional(word.word) : global.converterSimplified(word.word)}
      </MaayotTextNotoSansSC>
      {showIcon && arEnglish != undefined && <MaayotTextNotoSansSC
        color={color}
        fontWeightNumber="400"
        size="tiniest9"
      >
        {word.pinyin.toLowerCase()}
      </MaayotTextNotoSansSC>}
    </View>
  </TouchableOpacity>
})


type IPopoverContentProps = {
  onClosePress: any,
  word: any,
  isNewWord:boolean,
  isOldWord:boolean,
}
const PopoverContent: React.FC<IPopoverContentProps> = (props: IPopoverContentProps) => {
  const {
    onClosePress,
    word,
    isNewWord,
    isOldWord
  } = props
  const theme = useTheme()
  const arEnglish = word?.english?.split('/') || []
  return word && <View>
    {
      (isNewWord || isOldWord) &&
      <View style={[
        commonStyles.flxRow,
        storyDetailStyles.wordHeader,
        {backgroundColor: isNewWord ? theme.colors.primary: theme.colors.primary2}
      ]}
      >
        <MaayotText
          color={'lightest'}
          fontWeight="bold"
          size="normal18"
          style={storyDetailStyles.popoverWord}
        >
          {isNewWord ? `New Words`:`Words From The Past`}
        </MaayotText>
      </View>
    }
    <View style={storyDetailStyles.popOverClose}>
      <TouchableOpacity onPress={onClosePress}>
        <CloseIcon/>
      </TouchableOpacity>
    </View>
    <View style={storyDetailStyles.popoverContainer}>
      <View style={commonStyles.flxRow}>
        <MaayotTextNotoSansSC
          color={'lightest'}
          fontWeight="bold"
          size="normal18"
          style={storyDetailStyles.popoverWord}
        >
          {word.word}
        </MaayotTextNotoSansSC>
      </View>
      <MaayotText
        color={'lightest'}
        fontWeight="regular"
        size="small17"
        style={storyDetailStyles.pinyin}
      >
        {word.pinyin}
      </MaayotText>
      {
        (arEnglish || []).map((english: string, i: number) => {
          return english && i < 3 && !english.startsWith('CL') && <MaayotText
          key={i}
          color={'lightest'}
          fontWeight="regular"
          size="smaller14"
          style={storyDetailStyles.englishWord}
          >
            <>• {english}</>
          </MaayotText>
        }
      )}
    </View>
  </View>
}

type IStoryDetailProps = {
  story: IStoryEntity
  icon?: any
}
const StoryDetail: React.FC<IStoryDetailProps> = (props: IStoryDetailProps) => {
  const { story, icon } = props
  const theme = useTheme()
  const [selectedIndex, setSelectedIndex] = useState<string>('')
  const [showPopover, setShowPopover] = useState(false)
  const [popOverFrom, setPopOverFrom] = useState(null)
  const [selectedWord, setSelectedWord] = useState<any>(null)

  const onWordPress = (idx:string, ref: any, word: any) => {
    setSelectedIndex(idx)
    setPopOverFrom(ref)
    setShowPopover(true)
    setSelectedWord(word)
  }

  const oldWords = useMemo(() => {
    if(story?.oldWords) {
      return story.oldWords
    }
  },[story])

  const allIndexBreak = useMemo(() => {
      if(story?.arContent) {
        let ar = story.arContent
          .map((word:any, i: number) => word.word === '。'? i + 1: -1)
          .filter((i:number) => i !== -1)
        if(ar?.[ar.length - 1] !== story.arContent.length-1) ar.push(story.arContent.length-1)
        return ar;
      }

    },[story?.arContent]);

  const arNewContent = useMemo(() => {
    if(allIndexBreak?.length) {
      return allIndexBreak.reduce((acc:any, curr: any, i:number) => {
        acc.push(story.arContent.slice(allIndexBreak[i-1]? allIndexBreak[i-1]: 0, curr));
        return acc;
      },[])
    }
  },[allIndexBreak])

  return (
    <View
      style={[
        commonStyles.flxRow,
        storyDetailStyles.wordContainer,
        {marginVertical: height * 0.020}
      ]}
    >
      {
        story && arNewContent?.map((arContent: any, groupKey:number) => {
          return <View key={groupKey} style={[
            commonStyles.flxRow,
            storyDetailStyles.wordContainer
          ]}>
            {arContent.map((word:any, idx: number) =>  <Word
                  showIcon={icon}
                  key={`${groupKey}_${idx}`}
                  id={`${groupKey}_${idx}`}
                  onPress={onWordPress}
                  word={word}
                  isNewWord={word.word === story.newWord1 || word.word === story.newWord2}
                  //@ts-ignore
                  isOldWord={oldWords?.includes(word.word)}
                  isActive={`${groupKey}_${idx}` == selectedIndex}
              />
            )}
          </View>
        })
      }
      <Popover
        from={popOverFrom}
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}
        animationConfig={{ duration: 200, easing: Easing.inOut(Easing.quad) }}
        popoverStyle={
          [
            storyDetailStyles.popover,
            {backgroundColor: theme.colors.primary3}
          ]
        }
      >
        {
          selectedWord && <PopoverContent
            onClosePress={() => setShowPopover(false)}
            word={selectedWord}
            isNewWord={selectedWord?.word === story.newWord1 || selectedWord?.word === story.newWord2}
            //@ts-ignore
            isOldWord={selectedWord && oldWords?.includes(selectedWord?.word)}
          />
        }
      </Popover>
    </View>
  )
}

const storyDetailStyles = StyleSheet.create({
  wordContainer: {
    flexWrap: 'wrap',
  },
  wordHeader: {
    paddingVertical: 22,
    lineHeight:21,
    paddingLeft: 24,
  },
  wordBg: {
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
  },
  word: {
    lineHeight: 30,
  },
  pinyin: {
    lineHeight: 22,
    marginTop: 13
  },
  englishWord: {
    lineHeight: 21,
    marginTop: 9
  },
  popover: {
    borderRadius: 14,
  },
  popoverWord: {
    lineHeight: 26,
    letterSpacing: 0.18
  },
  popoverContainer: {
    padding: 24,
    borderRadius: 14,
    width: 300,
    paddingBottom:18
  },
  popOverClose: {
    position:'absolute',
    right: 16,
    top: 19,
    zIndex:101,
  },
  eyeIconStyle: {
    backgroundColor: '#c9c9c9',
    width: width*0.1,
    height: width*0.1,
    position:'absolute',
    right:width *0.01,
    top: 0,
    zIndex:1,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 7
  }
})
export default StoryDetail
