export interface ILongestStreaksParams {
  memberId: string
  counter: number
  fromDate: string
  toDate: string
}

export interface ILongestStreaksDTO {
  readonly memberId: string
  readonly counter: number
  readonly fromDate: string
  readonly toDate: string
}

class LongestStreaksDTO implements ILongestStreaksDTO {
  readonly memberId: string
  readonly counter: number
  readonly fromDate: string
  readonly toDate: string

  constructor(params: ILongestStreaksParams) {
    this.memberId = params.memberId
    this.counter = params.counter
    this.fromDate = params.fromDate
    this.toDate = params.toDate
  }
}

export default LongestStreaksDTO

