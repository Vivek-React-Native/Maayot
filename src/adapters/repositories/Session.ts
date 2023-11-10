import { ISessionRepository } from '@domains/useCases/repository-interfaces/iSession'
import {ILoginDTO, IUserLogedInDTO, UserLogedInDTO} from '@domains/dto/UserDTO'
import {IFailureAPI, IHttp} from '@adapters/infrastructures/interfaces/iHttp'
import { IStorage } from '@adapters/infrastructures/interfaces/iStorage'

class SessionRepository implements ISessionRepository {
  constructor(
    private readonly http: IHttp,
    private readonly storage: IStorage
  ) {
  }

  async login(loginDTO: ILoginDTO): Promise<IUserLogedInDTO | IFailureAPI> {
    const response = await this.http.request({
      method: 'POST',
      url: this.http.url + '/login',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: loginDTO.name,
        password: loginDTO.pw
      }
    })
    if (response.token) {
      return new UserLogedInDTO({
        id: response.information.id,
        email: response.email,
        level: response.information.level?.toLowerCase(),
        membership: {
          id: response.membership.id,
          name: response.membership.name
        },
        token: response.token
      })
    } else if(response.status || response.statusCode) {
      return {
        status: 401,
        message: response.message
      }
    }
  }

  getSessionUserInfo(): Promise<string> {
    return this.storage.get('token')
  }

  setSessionUserInfo(userInfo: string, token: string): void {
    this.setTokenToHttp(token);
    this.storage.set('token', userInfo)
  }

  setTokenToHttp(token: string): void {
    this.http.setToken(token);
  }

  removeToken(): void {
    this.setTokenToHttp('');
    this.storage.remove('token')
  }


  getHideOnBoarding(): Promise<string> {
    return this.storage.get('hideOnBoarding')
  }
  setHideOnBoarding(isHide: string): void {
    return this.storage.set('hideOnBoarding', isHide)
  }
  removeHideOnBoarding():void {
    this.storage.remove('hideOnBoarding')
  }
}

export default SessionRepository
