import {IQuizUseCase} from "@domains/useCases/interfaces/iQuiz";
import {IQuizAction, IQuizActions} from "@adapters/presenters/action-interfaces/iQuiz";
import {IQuizPresenters} from "@adapters/presenters/interfaces/iQuiz";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {IQuizAnswerEntity, IQuizEntity, IQuizResultEntity} from "@domains/entities/interfaces/iQuiz";

class QuizPresenters implements IQuizPresenters {
  constructor(
    private readonly useCases: IQuizUseCase,
    private readonly actions: IQuizActions
  ) {
  }

  async getQuiz(storyId: string, memberId: string, level: string): Promise<IQuizAction | IFailureAPI> {
    const quiz: IQuizEntity | IFailureAPI = await this.useCases.getQuiz(storyId, memberId, level)
    const failure = quiz as IFailureAPI;
    if (failure.status) {
      return failure;
    } else {
      return this.actions.getQuiz(quiz as IQuizEntity)
    }
  }

  async submitQuiz(storyId: string, memberId: string, level: string, value: number): Promise<IQuizAction | IFailureAPI> {
    const quiz: IQuizAnswerEntity | IFailureAPI = await this.useCases.submitQuiz(storyId, memberId, level, value)
    const failure = quiz as IFailureAPI;
    if (failure.status) {
      return failure;
    } else {
      return this.actions.setQuizAnswer(quiz as IQuizAnswerEntity)
    }
  }

  async getResult(storyId: string): Promise<IQuizAction | IFailureAPI> {
    const quiz: IQuizResultEntity | IFailureAPI = await this.useCases.getQuizResult(storyId)
    const failure = quiz as IFailureAPI;
    if (failure.status) {
      return failure;
    } else {
      return this.actions.setQuizResult(quiz as IQuizResultEntity)
    }
  }

}
export default QuizPresenters
