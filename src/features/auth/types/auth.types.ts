import { Business } from '../../business/types/business.types'

export type UserRole = 'admin' | 'user' | 'worker'

export interface User {
  readonly id: string
  readonly username: string
  readonly enabled: boolean
  readonly business?: string
  readonly role?: UserRole
}

export interface AuthState {
  readonly user: User | null
  readonly token: string | null
  readonly isAuthenticated: boolean
  readonly isLoading: boolean
  readonly error: string | null
  readonly business: Business | null
}

export interface SignInRequest {
  readonly user: string
  readonly password: string
}

export type SignInResponse = {
  readonly token: string
  readonly id: string
  readonly business: string
  readonly email: string | null
  readonly name: string
  readonly lastName: string
  readonly role: 'admin' | 'user' | 'worker'
}

export interface UnauthorizedResponse {
  readonly message: string
  readonly error: string
  readonly statusCode: number
}
