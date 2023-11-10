import {IFailureAPI, IHttp} from '@adapters/infrastructures/interfaces/iHttp'
import {IQuestionRepository} from "@domains/useCases/repository-interfaces/iQuestion";
import QuestionDTO, {
  IQuestionAnswerDTO, IQuestionAnswersDTO,
  IQuestionDataDTO,
  IQuestionDTO,
  QuestionAnswerDTO, QuestionAnswersDTO,
} from "@domains/dto/QuestionDTO";

class QuestionRepository implements IQuestionRepository {
  constructor(readonly http: IHttp) {}

  async getQuestion(storyId: string, memberId: string, level: string): Promise<IQuestionDTO | IFailureAPI> {
    const response: any = await this.http.request({
      method: 'GET',
      url: this.http.urlV1 + `/question/?storyId=${storyId}&memberId=${memberId}&level=${level?.toLowerCase()}`
    })
    if (response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response) {
      let memberAnswer, historicalAnswers;
      if (response.memberAnswer?.data) {
        memberAnswer = {
          answer: response.memberAnswer.data.answer,
          memberName: response.memberAnswer.data.memberName,
          memberId: response.memberAnswer.data.memberId,
        }
      }

      if (response.historicalAnswers?.data) {
        const answers: IQuestionAnswerDTO[] = response.historicalAnswers.data.map((answer: any) => ({
          answer: answer?.data?.answer,
          memberName: answer?.data?.memberName,
          memberId: answer?.data?.memberId
        }))
        historicalAnswers = {
          answers,
          ref: response.historicalAnswers.after?.ref || null,
          ts: response.historicalAnswers.after?.ts || null,
        }

      }
      const questionData: IQuestionDataDTO = {
        question: response.question,
        memberAnswer,
        historicalAnswers
      }
      return new QuestionDTO(questionData);
    }
  }

  async submitQuestion(storyId: string, memberId: string, memberName: string, value: string,level: string):Promise<IQuestionAnswerDTO | IFailureAPI> {
    const content = {
      memberId,
      storyId,
      memberName,
      answer: value,
      level: level
    };
    let response;
    try {
      response = await this.http.request({
        method: 'POST',
        url: this.http.urlV1 + '/question',
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
    if(response.data) {
      return new QuestionAnswerDTO({
        answer: response.data.answer,
        memberName: response.data.memberName,
        memberId: response.data.memberId,
      })
    }
  }

  async getAnswers(id: string, level: string, memberId: string, refId: string, refTs: string): Promise<IQuestionAnswersDTO | IFailureAPI> {
    const queryString = (refId && refTs && `&afterCursorRef=${refId}&afterCursorTs=${refTs}`) || ''
    const response: any = await this.http.request({
        method: 'GET',
        url: this.http.urlV1 + `/question/answers?storyId=${id}&level=${level?.toLowerCase() || ''}&memberId=${memberId}${queryString}`
      })
    if(response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response) {
      if(response.data) {
        const answers:IQuestionAnswerDTO[] = response.data.map((data:any) => {
          return {
            memberId: data.data.memberId,
            memberName: data.data.memberName || data.data.memberId,
            answer: data.data.answer,
          }
        })
        return new QuestionAnswersDTO({
          answers,
          ref: (response.after?.ref) || null,
          ts: (response.after?.ts) || null,
        });
      }
    }
  }
}

export default QuestionRepository
