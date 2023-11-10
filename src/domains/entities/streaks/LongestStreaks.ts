import {
  ILongestStreaksEntity,
  ILongestStreaksData,
} from '@domains/entities/interfaces/iStreaks'

class LongestStreaks implements ILongestStreaksEntity {
  private readonly _memberId: string
  private readonly _fromDate: string
  private readonly _toDate: string
  private readonly _counter: number

  constructor(params: ILongestStreaksData) {
    this._memberId = params.memberId
    this._fromDate = params.fromDate
    this._toDate = params.toDate
    this._counter = params.counter
  }

  get counter() {
    return this._counter
  }

  get fromDate() {
    return this._fromDate
  }

  get toDate() {
    return this._toDate
  }
}

export default LongestStreaks
