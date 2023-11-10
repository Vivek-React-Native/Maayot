import {IQuizAnswerEntity, IQuizEntity, IQuizResultEntity} from "@domains/entities/interfaces/iQuiz";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";

export interface IQuizUseCase {
  getQuiz(storyId: string, memberId: string, level: string): Promise<IQuizEntity | IFailureAPI>
  submitQuiz(storyId: string, memberId: string, level: string, value: number): Promise<IQuizAnswerEntity | IFailureAPI>
  getQuizResult(storyId: string): Promise<IQuizResultEntity | IFailureAPI>
}
