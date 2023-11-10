export interface iWordEntity {
  english: string
  pinyin: string
  word: string
}
export interface IStoryEntity {
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
  arContent: iWordEntity[]
  arSentencesWord11: iWordEntity[]
  arSentencesWord12: iWordEntity[]
  arSentencesWord21: iWordEntity[]
  arSentencesWord22: iWordEntity[]
  oldWords: string[]
}

export interface IStoryEntityData {
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
  arContent: iWordEntity[]
  arSentencesWord11: iWordEntity[]
  arSentencesWord12: iWordEntity[]
  arSentencesWord21: iWordEntity[]
  arSentencesWord22: iWordEntity[]
  oldWords: string[]
}
