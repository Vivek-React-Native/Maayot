import {levelType} from "@domains/entities/interfaces/iProfile";

export interface iWordDTO {
  english: string
  pinyin: string
  word: string
}


export interface iOldWordDTO {
  data: {
    level: levelType,
    english: string
    pinyin: string
    word: string
  }
}
export interface iStoryDTO {
  id: string
  image: string
  language: string
  level: string
  levelWord1: string
  levelWord2: string
  newWord1: string
  newWord2: string
  pinyinWord1: string
  pinyinWord2: string
  storyIntroduction: string
  audio: string
  definition1: string
  definition2: string
  englishTitle: string
  storyTitle: string
  arContent: iWordDTO[]
  arSentencesWord11: iWordDTO[]
  arSentencesWord12: iWordDTO[]
  arSentencesWord21: iWordDTO[]
  arSentencesWord22: iWordDTO[]
  oldWords: string[]
}

export interface iStoryDTOData {
  id: string
  image: string
  language: string
  level: string
  levelWord1: string
  levelWord2: string
  newWord1: string
  newWord2: string
  pinyinWord1: string
  pinyinWord2: string
  storyIntroduction: string
  audio: string
  definition1: string
  definition2: string
  englishTitle: string
  storyTitle: string
  arContent: iWordDTO[]
  arSentencesWord11: iWordDTO[]
  arSentencesWord12: iWordDTO[]
  arSentencesWord21: iWordDTO[]
  arSentencesWord22: iWordDTO[]
  oldWords: string[]
}

class StoryDTO implements iStoryDTO {
  readonly id: string
  readonly image: string
  readonly language: string
  readonly level: string
  readonly levelWord1: string
  readonly levelWord2: string
  readonly newWord1: string
  readonly newWord2: string
  readonly pinyinWord1: string
  readonly pinyinWord2: string
  readonly storyIntroduction: string
  readonly audio: string
  readonly definition1: string
  readonly definition2: string
  readonly englishTitle: string
  readonly storyTitle: string
  readonly arContent: iWordDTO[]
  readonly arSentencesWord11: iWordDTO[]
  readonly arSentencesWord12: iWordDTO[]
  readonly arSentencesWord21: iWordDTO[]
  readonly arSentencesWord22: iWordDTO[]
  readonly oldWords: string[];


  constructor(params: iStoryDTOData) {
    this.id = params.id
    this.image = params.image
    this.language = params.language
    this.level = params.level
    this.levelWord1 = params.levelWord1
    this.levelWord2 = params.levelWord2
    this.newWord1 = params.newWord1
    this.newWord2 = params.newWord2
    this.pinyinWord1 = params.pinyinWord1
    this.pinyinWord2 = params.pinyinWord2
    this.storyIntroduction = params.storyIntroduction
    this.audio = params.audio
    this.definition1 = params.definition1
    this.definition2 = params.definition2
    this.englishTitle = params.englishTitle
    this.storyTitle = params.storyTitle
    this.arContent = params.arContent
    this.arSentencesWord11 = params.arSentencesWord11
    this.arSentencesWord12 = params.arSentencesWord12
    this.arSentencesWord21 = params.arSentencesWord21
    this.arSentencesWord22 = params.arSentencesWord22
    this.oldWords = params.oldWords
  }

}

export default StoryDTO
