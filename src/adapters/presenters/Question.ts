import {IQuestionUseCase} from "@domains/useCases/interfaces/iQuestion";
import {IQuestionAction, IQuestionActions} from "@adapters/presenters/action-interfaces/iQuestion";
import {IQuestionPresenters} from "@adapters/presenters/interfaces/iQuestion";
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {IQuestionAnswerEntity, IQuestionEntity, IQuestionAnswersEntity} from "@domains/entities/interfaces/iQuestion";

class QuestionPresenters implements IQuestionPresenters {
  constructor(
    private readonly useCases: IQuestionUseCase,
    private readonly actions: IQuestionActions
  ) {
  }

  async getQuestion(storyId: string, memberId: string, level: string): Promise<IQuestionAction | IFailureAPI> {
    const question: IQuestionEntity | IFailureAPI = await this.useCases.getQuestion(storyId, memberId, level)
    const failure = question as IFailureAPI;
    if (failure.status) {
      return failure;
    } else {
      return this.actions.getQuestion(question as IQuestionEntity)
    }
  }

  async submitQuestion(storyId: string, memberId: string, memberName: string, value: string, level: string): Promise<IQuestionAction | IFailureAPI> {
    const question: IQuestionAnswerEntity | IFailureAPI = await this.useCases.submitQuestion(storyId, memberId, memberName, value, level)
    const failure = question as IFailureAPI;
    if (failure.status) {
      return failure;
    } else {
      return this.actions.setQuestionAnswer(question as IQuestionAnswerEntity)
    }
  }

  async getQuestionAnswers(storyId: string, level: string, memberId: string, refId: string | null, refTs: string | null): Promise<IQuestionAction | IFailureAPI> {
    const questionAnswers: IQuestionAnswersEntity | IFailureAPI = await this.useCases.getQuestionAnswers(storyId, level, memberId, refId, refTs)
    const failure = questionAnswers as IFailureAPI;
    if (failure.status) {
      return failure;
    } else {
      return this.actions.setQuestionAnswers(questionAnswers as IQuestionAnswersEntity)
    }
  }

  clearQuestionAnswers (): IQuestionAction {
    return this.actions.clearAnswers()
  }
}
export default QuestionPresenters
