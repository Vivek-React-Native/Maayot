import {ISessionUseCase} from '@domains/useCases/interfaces/iSession'
import { ISessionRepository } from '@domains/useCases/repository-interfaces/iSession'
import {ILoginDTO, IUserLogedInDTO} from '@domains/dto/UserDTO'
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {ISessionEntity} from "@domains/entities/interfaces/iSession";
import SessionEntity from "@domains/entities/Session";

class SessionUseCase implements ISessionUseCase {
    constructor(private readonly sessionRepo: ISessionRepository) {}

    async login(userDTO: ILoginDTO): Promise<SessionEntity | IFailureAPI> {
      const res: IUserLogedInDTO | IFailureAPI = await this.sessionRepo.login(userDTO)
      const userLogedIn = res as IUserLogedInDTO;
      const failure = res as IFailureAPI;
      if (userLogedIn?.token) {
        return new SessionEntity({
          token: userLogedIn.token,
          membershipName: userLogedIn.membership.name
        })
      } else if (failure?.status) {
        return failure;
      }
    }

    async getSessionUserInfo(): Promise<ISessionEntity> {
        const sessionString = await this.sessionRepo.getSessionUserInfo()
        if(sessionString) {
          try {
            const sessionInfo = new SessionEntity(JSON.parse(sessionString))
            return sessionInfo
          } catch (e) {
            console.log("token err", e);
          }
        }
    }

    setSessionUserInfo(userInfoObj: ISessionEntity): void {
      if(userInfoObj?.token &&  userInfoObj.membershipName) {
        const userToken: string = JSON.stringify({
          token: userInfoObj.token,
          membershipName: userInfoObj.membershipName,
        });
        this.sessionRepo.setSessionUserInfo(userToken, userInfoObj.token);
      } else {
        this.removeToken();
      }
    }
    setTokenToHttp(token: string): void {
      this.sessionRepo.setTokenToHttp(token);
    }

    removeToken(): void {
        this.sessionRepo.removeToken()
    }

    async getHideOnBoarding(): Promise<boolean> {
      const hideOnBoarding = await this.sessionRepo.getHideOnBoarding();
      return !!hideOnBoarding;
    }
    setHideOnBoarding(isHide: string): void {
      if(isHide === '') {
        this.sessionRepo.removeHideOnBoarding()
      } else {
        this.sessionRepo.setHideOnBoarding(isHide);
      }
    }
}

export default SessionUseCase
