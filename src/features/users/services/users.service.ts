import Api from '../../../app/http'
import {
  User,
  CreateUserDto,
  CreateUserByUserDto,
  UpdateUserDto,
  UpdateUserRoleDto,
  UpdateUserStatusDto,
  UpdateUserByUserDto,
  UpdateUserBusinessDto
} from '../types/user.types'

export class UsersService {
  private static instance: UsersService
  private api: Api

  private constructor() {
    this.api = new Api(import.meta.env.VITE_API_URL)
  }

  public static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService()
    }
    return UsersService.instance
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await this.api.get({ path: '/users' })
      return response
    } catch (error) {
      console.error('Error fetching users:', error)
      throw new Error('Failed to fetch users')
    }
  }

  async getUsersByBusiness(businessId: string): Promise<User[]> {
    try {
      const response = await this.api.get({ path: `/users/business/${businessId}` })
      return response
    } catch (error) {
      console.error('Error fetching users by business:', error)
      throw new Error('Failed to fetch users by business')
    }
  }

  async getUsersByMyBusiness(): Promise<User[]> {
    try {
      const response = await this.api.get({ path: '/users/my-business' })
      return response
    } catch (error) {
      console.error('Error fetching users by my business:', error)
      throw new Error('Failed to fetch users by my business')
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await this.api.get({ path: `/users/${id}` })
      return response
    } catch (error) {
      console.error('Error fetching user:', error)
      throw new Error('Failed to fetch user')
    }
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const response = await this.api.post({ path: '/users/create', data: userData })
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user')
    }
  }

  async createUserByUser(userData: CreateUserByUserDto): Promise<User> {
    try {
      const response = await this.api.post({ path: '/users/create-by-user', data: userData })
      return response
    } catch (error) {
      console.error('Error creating user by user:', error)
      throw new Error('Failed to create user by user')
    }
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    try {
      const response = await this.api.patch({ path: `/users/${id}`, data: userData })
      return response
    } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('Failed to update user')
    }
  }

  async updateUserRole(id: string, roleData: UpdateUserRoleDto): Promise<User> {
    try {
      const response = await this.api.patch({ path: `/users/${id}/role`, data: roleData })
      return response
    } catch (error) {
      console.error('Error updating user role:', error)
      throw new Error('Failed to update user role')
    }
  }

  async updateUserStatus(id: string, statusData: UpdateUserStatusDto): Promise<User> {
    try {
      const response = await this.api.patch({ path: `/users/${id}/status`, data: statusData })
      return response
    } catch (error) {
      console.error('Error updating user status:', error)
      throw new Error('Failed to update user status')
    }
  }

  async updateUserByUser(id: string, userData: UpdateUserByUserDto): Promise<User> {
    try {
      const response = await this.api.patch({ path: `/users/${id}/update-by-user`, data: userData })
      return response
    } catch (error) {
      console.error('Error updating user by user:', error)
      throw new Error('Failed to update user by user')
    }
  }

  async updateUserBusiness(id: string, businessData: UpdateUserBusinessDto): Promise<User> {
    try {
      const response = await this.api.patch({ path: `/users/${id}/business`, data: businessData })
      return response
    } catch (error) {
      console.error('Error updating user business:', error)
      throw new Error('Failed to update user business')
    }
  }
}

export default UsersService

