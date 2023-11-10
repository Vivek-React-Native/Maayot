export interface IMonthStreaksParams {
  key: string,
  memberId: string
  dates: string[]
}

export interface IMonthStreaksDTO {
  readonly key: string
  readonly memberId: string
  readonly dates: string[]
}

class MonthStreaksDTO implements IMonthStreaksDTO {
  readonly key: string
  readonly memberId: string
  readonly dates: string[]

  constructor(params: IMonthStreaksParams) {
    this.key = params.key
    this.memberId = params.memberId
    this.dates = params.dates
  }
}

export default MonthStreaksDTO

