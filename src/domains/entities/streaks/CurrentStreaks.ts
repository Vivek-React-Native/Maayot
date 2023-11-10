import {
  ICurrentStreaksEntity,
  ICurrentStreaksData,
} from '@domains/entities/interfaces/iStreaks'

class CurrentStreaks implements ICurrentStreaksEntity {
  private readonly  _memberId: string;
  private readonly  _counter: number;
  private readonly _dates: string[];

  constructor(params: ICurrentStreaksData) {
    this._memberId = params.memberId
    this._dates = params.dates
    this._counter = params.counter
  }
  get counter() {
    return this._counter;
  }

  get dates() {
    return this._dates;
  }
}

export default CurrentStreaks
