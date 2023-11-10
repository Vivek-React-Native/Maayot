import {membershipType} from "@domains/entities/interfaces/iProfile";

export interface ISessionEntity {
  token: string
  membershipName: membershipType
  setMembershipName(membershipName: membershipType): this
}

export interface ISessionData {
  token: string
  membershipName: membershipType
}
