export enum UserRole {
  admin = 'admin',
  user = 'user',
  worker = 'worker'
}

export type UserRoleType = 'admin' | 'user' | 'worker'

export type User = {
  readonly _id: string
  readonly user: string
  readonly email: string
  readonly business?: string
  readonly name: string
  readonly lastName: string
  readonly role: UserRoleType
  readonly enabled: boolean
  readonly createdAt: string
  readonly updatedAt: string
}

export type UserHeader = {
  readonly uuid: string
  readonly role: string
  readonly iat: number
  readonly exp: number
  readonly business: string
}

export type CreateUserDto = {
  readonly user: string
  readonly password: string
}

export type CreateUserByUserDto = {
  readonly email: string
  readonly password: string
}

export type UpdateUserDto = {
  readonly user?: string
  readonly password?: string
  readonly role?: UserRoleType
}

export type UpdateUserRoleDto = {
  readonly role: UserRoleType
}

export type UpdateUserStatusDto = {
  readonly enabled: boolean
}

export type UpdateUserByUserDto = {
  readonly email?: string
  readonly password?: string
}

export type UpdateUserBusinessDto = {
  readonly business: string
}

