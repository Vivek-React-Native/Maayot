import {IQuizAction} from "@adapters/presenters/action-interfaces/iQuiz";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";

export interface IQuizPresenters {
  getQuiz(storyId: string, memberId: string, level: string): Promise<IQuizAction | IFailureAPI>
  submitQuiz(storyId: string, memberId: string, level: string,value: number): Promise<IQuizAction | IFailureAPI>
  getResult(storyId: string): Promise<IQuizAction | IFailureAPI>
}
