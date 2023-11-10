import {ILoginDTO, IUserLogedInDTO} from '@domains/dto/UserDTO'
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {membershipType} from "@domains/entities/interfaces/iProfile";

export interface ISessionRepository {
    login(userDTO: ILoginDTO): Promise<IUserLogedInDTO | IFailureAPI>
    getSessionUserInfo(): Promise<string>
    setSessionUserInfo(infoString: string, token: string): void
    setTokenToHttp(token: string): void
    removeToken(): void
    getHideOnBoarding(): Promise<string>
    setHideOnBoarding(isHide: string): void
    removeHideOnBoarding(): void
}
