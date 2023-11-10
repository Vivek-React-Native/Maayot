import {IQuizUseCase} from "@domains/useCases/interfaces/iQuiz";
import {IQuizRepository} from "@domains/useCases/repository-interfaces/iQuiz";
import {IQuizAnswerDTO, IQuizDTO, IQuizResultDTO, QuizResultDTO} from "@domains/dto/QuizDTO";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import QuizEntity, {QuizAnswerEntity, QuizResultEntity} from "@domains/entities/Quiz";
import {IQuizAnswerEntity, IQuizEntity, IQuizResultEntity} from "@domains/entities/interfaces/iQuiz";

class QuizUseCase implements IQuizUseCase {
  constructor(private readonly QuizRepository: IQuizRepository) {
  }

  async getQuiz(storyId: string, memberId: string, level: string): Promise<IQuizEntity | IFailureAPI> {
    const res: IQuizDTO | IFailureAPI = await this.QuizRepository.getQuiz(storyId, memberId, level)

    const quizDTO = res as IQuizDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    }
    if ((quizDTO as IQuizDTO).memberAnswer) {
      const quizResult: IQuizResultEntity | IFailureAPI = await this.getQuizResult(storyId);
      if ((quizResult as IFailureAPI).status) {
        return failure;
      } else {
        return new QuizEntity(quizDTO).setResult(quizResult as IQuizResultEntity)
      }
    } else {
      return new QuizEntity(quizDTO);
    }
  }

  async submitQuiz(storyId: string, memberId: string, level: string, value: number): Promise<IQuizAnswerEntity | IFailureAPI> {
    const res: IQuizAnswerDTO | IFailureAPI = await this.QuizRepository.submitQuiz(storyId, memberId, level,value)
    const quizAnswerDTO = res as IQuizAnswerDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new QuizAnswerEntity(quizAnswerDTO);
    }
  }

  async getQuizResult(storyId: string): Promise<IQuizResultEntity | IFailureAPI> {
    const res: IQuizResultDTO | IFailureAPI = await  this.QuizRepository.getResult(storyId)
    const quizResult = res as IQuizResultDTO;
    const failure = res as IFailureAPI;
    if (failure?.status) {
      return failure;
    } else {
      return new QuizResultEntity(quizResult);
    }
  }


}

export default QuizUseCase
