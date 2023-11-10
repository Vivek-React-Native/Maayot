import {IProfileData, IProfileEntity, levelType, membershipPaymentType} from "@domains/entities/interfaces/iProfile";

class ProfileEntity implements IProfileEntity {
  private readonly _id: string
  private _name: string
  private readonly _membership: 'maayot Free' | 'maayot Standard' | 'maayot Premium' | 'school'
  private _email: string;
  private readonly _membershipId: string;
  private _level: "beginner" | "intermediate" | "advanced"
  private _language: "Simplified" | "Traditional"
  private _iapMembershipType?: membershipPaymentType


  constructor(params: IProfileData) {
    this._id = params.id
    this._name = params.name
    this._membership = params.membership
    this._membershipId = params.membershipId
    this._email = params.email
    this._level = params.level
    this._language = params.character
    this._iapMembershipType = params.iapMembershipType
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get membership() {
    return this._membership
  }
  get membershipId() {
    return this._membershipId
  }

  get email() {
    return this._email
  }

  get level() {
    return this._level
  }
  get language() {
    return this._language
  }
  get iapMembershipType() {
    return this._iapMembershipType
  }

  setLevel(level:levelType): IProfileEntity {
    this._level = level
    return this;
  }
  setLanguage(language:levelType): IProfileEntity {
    this._language = language
    return this;
  }

  setAccount(firstName: string, email: string): IProfileEntity {
    this._name = firstName;
    this._email = email;
    return this;
  }
}

export default ProfileEntity
