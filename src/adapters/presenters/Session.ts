import LoginDTO from '@domains/dto/UserDTO'
import {ISessionUseCase} from '@domains/useCases/interfaces/iSession'
import { ISessionPresenter } from '@adapters/presenters/interfaces/iSession'
import {ISessionActions, ILoginAction, ISessionAction, IMembershipAction} from './action-interfaces/iSession'
import {IFailureAPI} from "@adapters/infrastructures/interfaces/iHttp";
import {ISessionEntity} from "@domains/entities/interfaces/iSession";
import {IProfileActions} from "@adapters/presenters/action-interfaces/iProfile";
import {IStreaksActions} from "@adapters/presenters/action-interfaces/iStreaks";
import {IStoryActions} from "@adapters/presenters/action-interfaces/iStory";
import {IQuizActions} from "@adapters/presenters/action-interfaces/iQuiz";
import {IQuestionActions} from "@adapters/presenters/action-interfaces/iQuestion";
import {membershipType} from "@domains/entities/interfaces/iProfile";

class SessionPresenter implements ISessionPresenter {
  constructor(
    private readonly useCases: ISessionUseCase,
    private readonly actions: ISessionActions,
    private readonly streaksActions: IStreaksActions,
    private readonly profileActions: IProfileActions,
    private readonly storyActions: IStoryActions,
    private readonly quizActions: IQuizActions,
    private readonly questionActions: IQuestionActions,
  ) {
  }

  async login(name: string, pw: string): Promise<ILoginAction | IFailureAPI> {
    const res: ISessionEntity | IFailureAPI = await this.useCases.login(new LoginDTO({name, pw}))
    const userLogedInDTO = res as ISessionEntity;
    const failure = res as IFailureAPI;
    if (userLogedInDTO?.token) {
      return this.setSession(userLogedInDTO)
    } else {
      return failure;
    }
  }

  getSessionUserInfo(): Promise<ISessionEntity> {
    return this.useCases.getSessionUserInfo()
  }

  setSession(sessionEntity: ISessionEntity): ILoginAction {
    this.useCases.setSessionUserInfo(sessionEntity);
    return this.actions.setSessionUserInfo(sessionEntity)
  }

  removeToken(): ILoginAction {
    this.useCases.removeToken()
    return this.setSession(undefined)
  }
  async signOut(dispatch: any) {
    dispatch(await this.removeToken());
    dispatch(this.profileActions.clearProfile());
    dispatch(this.streaksActions.clearStreak());
    dispatch(this.storyActions.clearStory());
    dispatch(this.quizActions.clear());
    dispatch(this.questionActions.clear());
  }

  getHideOnBoarding(): Promise<boolean> {
    return this.useCases.getHideOnBoarding()
  }
  setHideOnBoarding(isHide: boolean, setStorage: boolean): ISessionAction {
    if(setStorage) {
      if (isHide) {
        this.useCases.setHideOnBoarding(isHide + '');
      } else {
        this.useCases.setHideOnBoarding(''); //remove
      }
    }
    return this.actions.setSessionHideOnBoarding(isHide)
  }

  setMembershipName(membershipName: membershipType): IMembershipAction {
    return this.actions.setMembership(membershipName)
  }
}

export default SessionPresenter
