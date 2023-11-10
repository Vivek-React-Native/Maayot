import {
  IQuizAnswerData,
  IQuizAnswerEntity,
  IQuizEntity,
  IQuizEntityData, IQuizResultData, IQuizResultEntity,
} from "@domains/entities/interfaces/iQuiz"

export class QuizAnswerEntity implements IQuizAnswerEntity {
  private readonly _rightAnswer?: number
  private readonly _memberAnswer?: number

  constructor(params: IQuizAnswerData) {
    this._rightAnswer = params.rightAnswer
    this._memberAnswer = params.memberAnswer
  }

  get rightAnswer() {
    return this._rightAnswer
  }

  get memberAnswer() {
    return this._memberAnswer
  }
}


export class QuizResultEntity implements IQuizResultEntity {
  private readonly _resultOptions: number[]

  constructor(params: IQuizResultData) {
    this._resultOptions = params.resultOptions
  }

  get resultOptions() {
    return this._resultOptions
  }
}

class QuizEntity implements IQuizEntity {
  private readonly _id?: string
  private readonly _options: string[]
  private readonly _quiz: string
  private readonly _rightAnswer?: number
  private readonly _memberAnswer?: number
  private _resultOptions?: number[]

  constructor(params: IQuizEntityData) {
    this._id = params.id
    this._options = params.options
    this._quiz = params.quiz
    this._rightAnswer = params.rightAnswer
    this._memberAnswer = params.memberAnswer
  }

  getQuizAnswer(): IQuizAnswerEntity {
    return {
      rightAnswer: this._rightAnswer,
      memberAnswer: this._memberAnswer,
    };
  }

  setResult(result: IQuizResultEntity): this {
    this._resultOptions = result.resultOptions;
    return this;
  }

  get id() {
    return this._id
  }

  get options() {
    return this._options
  }

  get quiz() {
    return this._quiz
  }

  get rightAnswer() {
    return this._rightAnswer
  }

  get memberAnswer() {
    return this._memberAnswer
  }

  get resultOptions() {
    return this._resultOptions
  }

  getQuizResult(): IQuizResultEntity {
    return {
      resultOptions: this._resultOptions
    }
  }

}

export default QuizEntity
