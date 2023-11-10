import {IQuestionAction} from "@adapters/presenters/action-interfaces/iQuestion";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";

export interface IQuestionPresenters {
  getQuestion(storyId: string, memberId: string, level: string): Promise<IQuestionAction | IFailureAPI>
  submitQuestion(storyId: string, memberId: string, level: string,value: string): Promise<IQuestionAction | IFailureAPI>
  getQuestionAnswers(id: string, level: string, memberId: string, refId: string | null, refTs: string | null): Promise<IQuestionAction | IFailureAPI>
  clearQuestionAnswers(): IQuestionAction
}
