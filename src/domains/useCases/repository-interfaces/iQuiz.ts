import {IQuizAnswerDTO, IQuizDTO, IQuizResultDTO} from "@domains/dto/QuizDTO";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";

export interface IQuizRepository {
  getQuiz(storyId: string, memberId: string, level: string): Promise<IQuizDTO | IFailureAPI>
  submitQuiz(storyId: string, memberId: string, level: string, value: number):Promise<IQuizAnswerDTO | IFailureAPI>

  getResult(storyId: string): Promise<IQuizResultDTO | IFailureAPI>
}
