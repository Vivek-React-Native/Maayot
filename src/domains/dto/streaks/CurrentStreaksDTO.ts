export interface ICurrentStreaksParams {
  memberId: string
  counter: number
  dates: string[]
}

export interface ICurrentStreaksDTO {
  readonly memberId: string
  readonly counter: number
  readonly dates: string[]
}

class CurrentStreaksDTO implements ICurrentStreaksDTO {
  readonly memberId: string
  readonly counter: number
  readonly dates: string[]

  constructor(params: ICurrentStreaksParams) {
    this.memberId = params.memberId
    this.counter = params.counter
    this.dates = params.dates
  }
}

export default CurrentStreaksDTO

