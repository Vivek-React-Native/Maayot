import {IStoryEntity, IStoryEntityData, iWordEntity} from "@domains/entities/interfaces/iStory"

class StoryEntity implements IStoryEntity {
  private readonly _id: string
  private readonly _image: string
  private readonly _language: string
  private readonly _level: string
  private readonly _levelWord1: string
  private readonly _levelWord2: string
  private readonly _newWord1: string
  private readonly _newWord2: string
  private readonly _pinyinWord1: string
  private readonly _pinyinWord2: string
  private readonly _storyIntroduction: string
  private readonly _audio: string
  private readonly _definition1: string
  private readonly _definition2: string
  private readonly _storyTitle: string
  private readonly _englishTitle: string
  private readonly _arContent: iWordEntity[]
  private readonly _arSentencesWord11: iWordEntity[]
  private readonly _arSentencesWord12: iWordEntity[]
  private readonly _arSentencesWord21: iWordEntity[]
  private readonly _arSentencesWord22: iWordEntity[]
  private readonly _oldWords: string[]

    constructor(params: IStoryEntityData) {
      this._id = params.id
      this._image = params.image
      this._language = params.language
      this._level = params.level
      this._levelWord1 = params.levelWord1
      this._levelWord2 = params.levelWord2
      this._newWord1 = params.newWord1
      this._newWord2 = params.newWord2
      this._pinyinWord1 = params.pinyinWord1
      this._pinyinWord2 = params.pinyinWord2
      this._storyIntroduction = params.storyIntroduction
      this._audio = params.audio
      this._definition1 = params.definition1
      this._definition2 = params.definition2
      this._storyTitle = params.storyTitle
      this._englishTitle = params.englishTitle
      this._arContent = params.arContent
      this._arSentencesWord11 = params.arSentencesWord11
      this._arSentencesWord12 = params.arSentencesWord12
      this._arSentencesWord21 = params.arSentencesWord21
      this._arSentencesWord22 = params.arSentencesWord22
      this._oldWords = params.oldWords
    }


    get id() {
      return this._id
    }
    get image() {
      return this._image
    }
    get language() {
      return this._language
    }
    get level() {
      return this._level
    }
    get levelWord1() {
      return this._levelWord1
    }
    get levelWord2() {
      return this._levelWord2
    }
    get newWord1() {
      return this._newWord1
    }
    get newWord2() {
      return this._newWord2
    }
    get pinyinWord1() {
      return this._pinyinWord1
    }
    get pinyinWord2() {
      return this._pinyinWord2
    }
    get storyIntroduction() {
      return this._storyIntroduction
    }
    get audio() {
      return this._audio
    }
    get definition1() {
      return this._definition1
    }
    get definition2() {
      return this._definition2
    }
    get englishTitle() {
      return this._englishTitle
    }
    get storyTitle() {
      return this._storyTitle
    }
    get arContent() {
      return this._arContent
    }
    get arSentencesWord11() {
      return this._arSentencesWord11
    }
    get arSentencesWord12() {
      return this._arSentencesWord12
    }
    get arSentencesWord21() {
      return this._arSentencesWord21
    }
    get arSentencesWord22() {
      return this._arSentencesWord22
    }
    get oldWords() {
      return this._oldWords
    }
}

export default StoryEntity
