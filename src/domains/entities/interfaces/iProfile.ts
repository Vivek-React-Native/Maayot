export type levelType = 'beginner' | 'intermediate' | 'advanced'
export type membershipPaymentType =  'free' | 'standard'
export type membershipType =  'maayot Free' | 'maayot Standard' | 'maayot Premium' | 'school'
export type languageType = 'Simplified' | 'Traditional'
export interface IProfileEntity {
  id: string
  name: string
  email: string,
  membership: membershipType
  membershipId: string,
  iapMembershipType?: membershipPaymentType
  level: levelType,
  language: languageType
  setLevel(level:levelType): IProfileEntity
  setAccount(firstName:string, email: string): IProfileEntity
  setLanguage(language:languageType): IProfileEntity
}

export interface IProfileData {
  id: string
  email: string,
  name: string
  membership: membershipType
  membershipId: string,
  level: levelType
  iapMembershipType?: membershipPaymentType
  language: languageType
}
