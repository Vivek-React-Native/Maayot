import {ISessionData, ISessionEntity} from "@domains/entities/interfaces/iSession";
import {membershipType} from "@domains/entities/interfaces/iProfile";

class SessionEntity implements ISessionEntity {
  private readonly _token: string
  private _membershipName: membershipType

  constructor(params: ISessionData) {
    this._token = params.token
    this._membershipName = params.membershipName
  }

  get token() {
    return this._token
  }

  get membershipName() {
    return this._membershipName
  }

  setMembershipName(membershipName: membershipType) {
    this._membershipName = membershipName
    return this;
  }
}

export default SessionEntity
