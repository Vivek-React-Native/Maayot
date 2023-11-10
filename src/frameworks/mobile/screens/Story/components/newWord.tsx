import React, {useEffect, useState, useMemo, useRef} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableNativeFeedback,
  Dimensions, Text
} from 'react-native'
import {Overlay} from 'react-native-elements';
import MaayotText from "@frameworks/mobile/components/atomic/text/MaayotText"
import useTheme from '../../../themes/useTheme'
import commonStyles from "@frameworks/mobile/components/atomic/commonStyles"
import {IStoryEntity} from "@domains/entities/interfaces/iStory"
import CloseModalIcon from "@frameworks/mobile/icons/closeModalIcon"
import MaayotTextDisplay from "@frameworks/mobile/components/atomic/text/MaayotTextDisplay";
import MaayotTextNotoSansSC from "@frameworks/mobile/components/atomic/text/MaayotTextNotoSansSC";


type INewWordItemProps = {
  word: string,
  level: string,
  definition: string,
  pinyin: string,
  arSentencesWord1: any
  arSentencesWord2: any

}
const NewWordItem: React.FC<INewWordItemProps> = (props: INewWordItemProps) => {
  const {
    word,
    pinyin,
    definition,
    level,
    arSentencesWord1,
    arSentencesWord2,
  } = props
  const theme = useTheme()
  return <View style={[
    newWordStyles.newWordContainer,
    {backgroundColor: theme.colors.gray4}
  ]}>
    <View
      style={[
        commonStyles.flxRow,
        {justifyContent: 'flex-start'}
      ]}
    >
      <View>
        <MaayotTextNotoSansSC
          color="gray1"
          size="large36"
          style={newWordStyles.word}
        >{word}</MaayotTextNotoSansSC>
      </View>
      <View>
        <MaayotText
          color="gray1"
          size="normal18"
          fontWeight="bold"
          style={newWordStyles.pinyin}
        >{pinyin}</MaayotText>
        <MaayotText
          color="gray1"
          size="smaller14"
          fontWeight="regular"
          style={newWordStyles.definition}
        >{definition}</MaayotText>
        {/*<MaayotText*/}
        {/*  color="gray1"*/}
        {/*  size="smaller14"*/}
        {/*  fontWeight="regular"*/}
        {/*  style={newWordStyles.definition}*/}
        {/*>{level}</MaayotText>*/}
      </View>
    </View>

    <MaayotText
      color="gray2"
      size="smaller14"
      style={newWordStyles.exampleTitle}
    >Example :</MaayotText>
    {arSentencesWord1 && <View style={[
      commonStyles.flxRow,
      newWordStyles.exampleRow
    ]}>
      <View style={[
        newWordStyles.dot,
        {backgroundColor: theme.colors.primary}
      ]}/>
      <MaayotTextNotoSansSC
        color="gray1"
        size="smaller14"
        style={newWordStyles.example}
      >{arSentencesWord1.map((word: any) => word.word).join(' ')}</MaayotTextNotoSansSC>
    </View>}
    {arSentencesWord2 && <View style={[
      commonStyles.flxRow,
      newWordStyles.exampleRow
    ]}>
      <View style={[
        newWordStyles.dot,
        {backgroundColor: theme.colors.primary}
      ]}/>
      <MaayotTextNotoSansSC
        color="gray1"
        size="smaller14"
        style={newWordStyles.example}
      >{arSentencesWord2.map((word: any) => word.word).join(' ')}</MaayotTextNotoSansSC>
    </View>}
  </View>
}


const newWordStyles = StyleSheet.create({
  word: {
    lineHeight: 52,
    marginRight: 12,
  },
  pinyin: {
    lineHeight: 23,
  },
  definition: {
    lineHeight: 18,
    maxWidth: '85%',
  },
  newWordContainer: {
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 22,
    width: '100%',
    marginTop: 18,
  },
  exampleTitle: {
    lineHeight: 18,
    marginBottom: 5
  },
  example: {
    lineHeight: 20,
    marginTop: 3,
  },
  exampleRow: {
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 50,
    marginRight: 8,
  }
})

type INewWordProps = {
  story: IStoryEntity,
  isOpen: boolean,
  onClosePress: any
}
const NewWord: React.FC<INewWordProps> = (props: INewWordProps) => {
  const {
    story,
    isOpen = false,
    onClosePress
  } = props
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClosePress}
    >
      <View style={styles.centeredView}>
        <TouchableNativeFeedback onPress={onClosePress}>
          <View style={styles.overlay}/>
        </TouchableNativeFeedback>
        <View style={styles.modalView}>
          <View style={
            [
              commonStyles.flxRow,
              styles.modalViewTitle
            ]
          }>
            <MaayotTextDisplay
              color={'primary3'}
              fontWeight="bold"
              size="larger24"
              style={{lineHeight: 29}}
            >
              New Words
            </MaayotTextDisplay>
            <TouchableOpacity onPress={onClosePress}>
              <CloseModalIcon/>
            </TouchableOpacity>
          </View>
          <NewWordItem
            word={story.newWord1}
            level={story.levelWord1}
            definition={story.definition1}
            pinyin={story.pinyinWord1}
            arSentencesWord1={story.arSentencesWord11}
            arSentencesWord2={story.arSentencesWord12}

          />
          <NewWordItem
            word={story.newWord2}
            level={story.levelWord2}
            definition={story.definition2}
            pinyin={story.pinyinWord2}
            arSentencesWord1={story.arSentencesWord21}
            arSentencesWord2={story.arSentencesWord22}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewTitle: {
    justifyContent: 'space-between',
    width: '100%',
    lineHeight: 28,
    marginBottom: 3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor:'#000',
    opacity: 0.4
  },
  transparent: {
    width:100,
    height: 100
  }
})
export default NewWord
