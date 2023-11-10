import {
  IMonthStreaksEntity,
  IMonthStreaksData,
} from '@domains/entities/interfaces/iStreaks'

class MonthStreaks implements IMonthStreaksEntity {
  private readonly  _key: string;
  private readonly  _memberId: string;
  private readonly _dates: string[];

  constructor(params: IMonthStreaksData) {
    this._key = params.key
    this._memberId = params.memberId
    this._dates = params.dates
  }
  get dates() {
    return this._dates;
  }

  get key() {
    return this._key;
  }
}

export default MonthStreaks
