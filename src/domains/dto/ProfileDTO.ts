import {levelType, membershipPaymentType, membershipType, languageType} from "@domains/entities/interfaces/iProfile";

export interface IProfileDTO {
  id: string
  name: string
  email: string,
  membershipId: string,
  membership?: membershipType
  level: levelType
  character: languageType
  iapMembershipType?: membershipPaymentType
}

export interface iProfileDTOData {
  id: string
  name: string
  email: string,
  membershipId: string,
  membership?: membershipType
  level: levelType,
  character: languageType,
  iapMembershipType?: membershipPaymentType
}

class ProfileDTO implements IProfileDTO {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly level: levelType
  readonly character: languageType
  readonly membership?: membershipType
  readonly membershipId: string
  readonly iapMembershipType?: membershipPaymentType

  constructor(params: iProfileDTOData) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.level = params.level
    this.character = params.character
    this.membership = params.membership
    this.membershipId = params.membershipId
    this.iapMembershipType = params.iapMembershipType
  }
}

export default ProfileDTO
