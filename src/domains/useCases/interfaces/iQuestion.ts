import {
  IQuestionAnswerEntity,
  IQuestionEntity,
  IQuestionAnswersEntity
} from "@domains/entities/interfaces/iQuestion";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";

export interface IQuestionUseCase {
  getQuestion(storyId: string, memberId: string, level: string): Promise<IQuestionEntity | IFailureAPI>
  submitQuestion(storyId: string, memberId: string, memberName: string, value: string, level: string): Promise<IQuestionAnswerEntity | IFailureAPI>
  getQuestionAnswers(id: string, level: string, memberId: string, refId: string | null, refTs: string | null): Promise<IQuestionAnswersEntity | IFailureAPI>
}
