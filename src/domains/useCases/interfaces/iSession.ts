import {ILoginDTO} from '@domains/dto/UserDTO'
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {ISessionEntity} from "@domains/entities/interfaces/iSession";
import SessionEntity from "@domains/entities/Session";

export interface ISessionUseCase {
    login(userDTO: ILoginDTO): Promise<SessionEntity | IFailureAPI>
    getSessionUserInfo(): Promise<ISessionEntity>
    setSessionUserInfo(userInfo: ISessionEntity): void
    setTokenToHttp(token: string): void
    removeToken(): void
    getHideOnBoarding(): Promise<boolean>
    setHideOnBoarding(isHide: string): void
}
