import {IQuestionAnswerDTO, IQuestionAnswersDTO, IQuestionDTO} from "@domains/dto/QuestionDTO";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";

export interface IQuestionRepository {
  getQuestion(storyId: string, memberId: string, level: string): Promise<IQuestionDTO | IFailureAPI>
  submitQuestion(storyId: string, memberId: string, memberName: string, value: string,level: string):Promise<IQuestionAnswerDTO | IFailureAPI>
  getAnswers(id: string, level: string, memberId: string, refId: string, refTs: string): Promise<IQuestionAnswersDTO | IFailureAPI>

}
