export enum StorySteps {
  'introduction',
  'story and listening',
  'quiz',
  'question',
  'finish'
}
export interface ICurrentStreaksEntity {
  dates: string[],
  counter: number
}

export interface ICurrentStreaksData {
  memberId: string
  dates: string[],
  counter: number
}

export interface ILongestStreaksEntity {
  counter: number,
  toDate: string,
  fromDate: string,
}

export interface ILongestStreaksData {
  memberId: string
  toDate: string,
  fromDate: string,
  counter: number
}

export interface IMonthStreaksEntity {
  key: string,
  dates: string[],
}

export interface IMonthStreaksData {
  key: string,
  memberId: string
  dates: string[],
}

export interface ITrackingEntity {
  readonly key: string
  readonly memberId: string
  readonly storyId: string
  readonly step: keyof typeof StorySteps,
  readonly stepId: number
}

export interface ITrackingData {
  readonly key: string
  readonly memberId: string
  readonly storyId: string
  readonly step: keyof typeof StorySteps,
  readonly stepId: number
}

