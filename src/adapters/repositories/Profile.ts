import {IFailureAPI, IHttp} from '@adapters/infrastructures/interfaces/iHttp'
import ProfileDTO, {IProfileDTO} from "@domains/dto/ProfileDTO";
import {IProfileRepository} from "@domains/useCases/repository-interfaces/iProfile";
import {levelType, languageType} from "@domains/entities/interfaces/iProfile";
import profile from "@frameworks/mobile/redux/reducers/profile";


class ProfileRepository implements IProfileRepository {
  constructor(readonly http: IHttp) {
  }

  async getProfile(): Promise<IProfileDTO | IFailureAPI> {
    console.log('CALL PROFILE API');
    const response: any = await this.http.authRequest({
      method: 'GET',
      url: this.http.url + '/profile'
    })
    if (response.status || response.statusCode) {
      return {
        status: response.statusCode,
        message: response.message
      }
    } else if (response?.member?.id) {
      console.log('response',response)
      global.characterPreference = response.member.customFields['character'] || 'Simplified'
        return new ProfileDTO({
        id: response.member.id,
        name: response.member.customFields['first-name'],
        email: response.member.email,
        level: response.member.customFields['level']?.toLowerCase(),
        character: response.member.customFields['character'] || 'Simplified',
        membershipId: response.member.membership?.plan || '',
        iapMembershipType: response.member?.paymentProfile?.type || ''
      })
    }
  }
  async saveLevel(level: string, memberId: string): Promise<levelType | IFailureAPI> {
    console.log('CALL SAVE LEVEL');
    const content = {
      id: memberId,
      level: level?.toLowerCase(),
    }
    let response;
    try {
      response = await this.http.request({
        method: 'PUT',
        url: this.http.urlV1 + '/profile/custom/level',
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
    return response.member?.customFields?.level?.toLowerCase() || response.member.level?.toLowerCase();
  }
async saveLanguage(language: string, memberId: string): Promise<languageType | IFailureAPI> {
    console.log('CALL SAVE LANGUAGE',this.http.urlV1 + '/profile/custom/character');
    const content = {
      id: memberId,
      UpdateCharacter: language,
    }
    console.log(content)
    let response;
    try {
      response = await this.http.request({
        method: 'PUT',
        url: this.http.urlV1 + '/profile/custom/character',
        headers: {
          'Content-Type': 'application/json'
        },
        body: content,
      });
      console.log('response',response)
    } catch (e) {
      console.log('error',e)
      response.status = 404
    }
    if (response.status || response.statusCode) {
      console.log('response',response)
      return {
        status: response.status || response.statusCode,
        message: response.message?.message || response.message
      }
    }
    
    return response.member?.customFields?.character?.toLowerCase() || response.member.character?.toLowerCase();
  }
  async saveFirstName(firstName: string, memberId: string):Promise<string | IFailureAPI> {
    console.log('CALL SAVE FName');
    const content = {
      id: memberId,
      firstName,
    }
    let response;
    try {
      response = await this.http.request({
        method: 'PUT',
        url: this.http.urlV1 + '/profile/custom/first-name',
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
    return response.member?.customFields?.['first-name'] ||
      response.member?.metaData?.['firstName'] || 'NoName';
  }


  async saveEmail (email: string, memberId: string):Promise<string | IFailureAPI> {
    console.log('CALL SAVE Email');
    const content = {
      id: memberId,
      email,
    }
    let response;
    try {
      response = await this.http.request({
        method: 'PUT',
        url: this.http.urlV1 + '/profile/custom/email',
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
    return response.member?.email || 'Null';
  }

  async savePassword(oldPassword: string, newPassword: string, confirmNewPassword: string, email: string): Promise<boolean | IFailureAPI> {
    console.log('CALL SAVE PW');
    const content = {
      email,
      oldPassword,
      newPassword,
      confirmNewPassword,
    }
    let response;
    try {
      response = await this.http.request({
        method: 'POST',
        url: this.http.urlV1 + '/profile/change-password',
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
    return response.member?.id;
  }

  async register(firstName: string, email: string, password: string, confirmPassword: string, level:string, plan: string,language: string): Promise<boolean | IFailureAPI> {
    const content = {
      firstName,
      email,
      level: level.toLowerCase(),
      password,
      confirmPassword,
      plan,
      character:language
    }
    let response;
    try {
      response = await this.http.request({
        method: 'POST',
        url: this.http.urlV1 + '/register',
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
    return response.member?.id;
  }
}

export default ProfileRepository
