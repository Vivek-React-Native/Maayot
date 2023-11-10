import {IFailureAPI, IHttp} from '@adapters/infrastructures/interfaces/iHttp'
import {IQuizRepository} from "@domains/useCases/repository-interfaces/iQuiz";
import QuizDTO, {
  IQuizAnswerDTO,
  IQuizDataDTO,
  IQuizDTO,
  IQuizResultDataDTO,
  IQuizResultDTO,
  QuizAnswerDTO, QuizResultDTO
} from "@domains/dto/QuizDTO";

class QuizRepository implements IQuizRepository {
  constructor(readonly http: IHttp) {}

  async getQuiz(storyId: string, memberId: string, level: string): Promise<IQuizDTO | IFailureAPI> {
    const response: any = await this.http.request({
      method: 'GET',
      url: this.http.urlV1 + `/quiz/?storyId=${storyId}&memberId=${memberId}&level=${level?.toLowerCase()}`
    })
    if(response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response) {
      const quizData: IQuizDataDTO = {
        options: response.options,
        quiz: response.quiz,
        memberAnswer: response.memberAnswer?.data?.selectedAnswer,
        rightAnswer: response.rightAnswer
      }
      return new QuizDTO(quizData);
    }
  }

  async submitQuiz(storyId: string, memberId: string, level: string, value: number):Promise<IQuizAnswerDTO | IFailureAPI> {
    const content = {
      memberId,
      storyId,
      level: level.toLowerCase(),
      answerSelected: value,
    };
    let response;
    try {
      response = await this.http.request({
        method: 'POST',
        url: this.http.urlV1 + '/quiz',
        headers: {
          'Content-Type': 'application/json'
        },
        body: content,
      });
    } catch (e) {
      response.status = 404
    }
    if (response.status || response.statusCode) {
      return {
        status: response.status || response.statusCode,
        message: response.message?.message || response.message
      }
    }
    return new QuizAnswerDTO({
      rightAnswer: response.rightAnswer,
      memberAnswer: response.selectedAnswer,
    })
  }

  async getResult(storyId: string): Promise<IQuizResultDTO | IFailureAPI> {
    const response: any = await this.http.request({
        method: 'GET',
        url: this.http.urlV1 + `/quiz/result?storyId=${storyId}`
      })
    if(response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response) {
      const quizResult: IQuizResultDataDTO = {
        options: response.options,
      }
      return new QuizResultDTO(quizResult);
    }
  }
}

export default QuizRepository
