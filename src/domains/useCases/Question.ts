import {IQuestionUseCase} from "@domains/useCases/interfaces/iQuestion";
import {IQuestionRepository} from "@domains/useCases/repository-interfaces/iQuestion";
import {IQuestionAnswerDTO, IQuestionAnswersDTO, IQuestionDTO} from "@domains/dto/QuestionDTO";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import QuestionEntity, {QuestionAnswerEntity, QuestionAnswersEntity} from "@domains/entities/Question";
import {
  IQuestionAnswerEntity,
  IQuestionAnswersEntity,
  IQuestionEntity,
} from "@domains/entities/interfaces/iQuestion";

class QuestionUseCase implements IQuestionUseCase {
  constructor(private readonly QuestionRepository: IQuestionRepository) {
  }

  async getQuestion(storyId: string, memberId: string, level: string): Promise<IQuestionEntity | IFailureAPI> {
    const res: IQuestionDTO | IFailureAPI = await this.QuestionRepository.getQuestion(storyId, memberId, level)

    const questionDTO = res as IQuestionDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    }
    return new QuestionEntity(questionDTO);
  }

  async submitQuestion(storyId: string, memberId: string, memberName: string, value: string, level: string): Promise<IQuestionAnswerEntity | IFailureAPI> {
    const res: IQuestionAnswerDTO | IFailureAPI = await this.QuestionRepository.submitQuestion(storyId, memberId, memberName,value,level)
    const questionAnswerDTO = res as IQuestionAnswerDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new QuestionAnswerEntity(questionAnswerDTO);
    }
  }

  async getQuestionAnswers(id: string, level: string, memberId: string, refId: string | null, refTs: string | null): Promise<IQuestionAnswersEntity | IFailureAPI> {
    const res: IQuestionAnswersDTO | IFailureAPI = await this.QuestionRepository.getAnswers(id, level, memberId, refId, refTs)
    const questionAnswers = res as IQuestionAnswersDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new QuestionAnswersEntity(questionAnswers);
    }
  }
}

export default QuestionUseCase
