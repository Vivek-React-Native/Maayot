import { IHttp } from '@adapters/infrastructures/interfaces/iHttp'
import {IStoryRepository} from "@domains/useCases/repository-interfaces/iStory";
import StoryDTO, {iOldWordDTO, iStoryDTO, iStoryDTOData} from "@domains/dto/StoryDTO";

class StoryRepository implements IStoryRepository {
  constructor(readonly http: IHttp) {}

  async getIntro(memberId: string, level: string): Promise<iStoryDTO> {
    const response: iStoryDTOData = await this.http.request({
      method: 'GET',
      url: this.http.urlV1 + `/prismic/getIntro?memberId=${memberId}&level=${level?.toLowerCase()}`
    })

    const oldWords:iOldWordDTO[] =  await this.http.request({
      method: 'GET',
      url: this.http.urlV1 + `/words/past-new-words`
    });
    let resOldWord:string[] = [];
    if(oldWords) {
      oldWords.forEach(oldWords => {
        const {data} = oldWords || {};
        const { word, level:resLevel} = data || {};
        if(word && resLevel?.toLowerCase() == level?.toLowerCase()) {
          resOldWord.push(word)
        }
      })
    }
    if (response) {
      return new StoryDTO({...response, oldWords: resOldWord})
    }
  }
}

export default StoryRepository
