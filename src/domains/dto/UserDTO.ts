import {membershipType} from "@domains/entities/interfaces/iProfile";

export interface IMemberShip {
  id: string
  name: membershipType
}
export interface ILogedInParams {
  id: string
  email: string
  level: string
  membership: IMemberShip
  token: string
}


export interface IUserLogedInDTO {
  readonly id: string
  readonly email: string
  readonly level: string
  readonly membership: IMemberShip
  readonly token: string
}

export class UserLogedInDTO implements IUserLogedInDTO {
  readonly id: string
  readonly email: string
  readonly level: string
  readonly membership: IMemberShip
  readonly token: string

  constructor(param: ILogedInParams) {
    this.id = param.id
    this.email = param.email
    this.level = param.level
    this.membership = param.membership
    this.token = param.token
  }
}


export interface ILoginParams {
  name: string
  pw: string
}

export interface ILoginDTO {
  readonly name: string
  readonly pw: string
}

class LoginDTO implements ILoginDTO {
  readonly name: string
  readonly pw: string

  constructor(param: ILoginParams) {
    this.name = param.name
    this.pw = param.pw
  }
}
export default LoginDTO
