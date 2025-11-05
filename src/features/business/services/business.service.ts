import Api from '../../../app/http'
import { Business, CreateBusinessDto, UpdateBusinessDto } from '../types/business.types'

export class BusinessService {
  private static instance: BusinessService
  private api: Api 

  private constructor() {
    this.api = new Api(import.meta.env.VITE_API_URL)
  }

  public static getInstance(): BusinessService {
    if (!BusinessService.instance) {
      BusinessService.instance = new BusinessService()
    }
    return BusinessService.instance
  }

  async getAllBusinesses(): Promise<Business[]> {
    try {
      const response = await this.api.get({ path: '/business/all' })
      return response
    } catch (error) {
      console.error('Error fetching all businesses:', error)
      throw new Error('Failed to fetch all businesses')
    }
  }

  async getUserBusinesses(): Promise<Business[]> {
    try {
      const response = await this.api.get({ path: '/business' })
      return response
    } catch (error) {
      console.error('Error fetching user businesses:', error)
      throw new Error('Failed to fetch user businesses')
    }
  }

  async getMyBusinesses(): Promise<Business[]> {
    try {
      const response = await this.api.get({ path: '/business/my-businesses' })
      return response
    } catch (error) {
      console.error('Error fetching my businesses:', error)
      throw new Error('Failed to fetch my businesses')
    }
  }

  async getBusinessById(id: string): Promise<Business> {
    try {
      const response = await this.api.get({ path: `/business/${id}` })
      return response
    } catch (error) {
      console.error('Error fetching business:', error)
      throw new Error('Failed to fetch business')
    }
  }

  async createBusiness(businessData: CreateBusinessDto): Promise<Business> {
    try {
      const response = await this.api.post({ path: '/business', data: businessData })
      return response
    } catch (error) {
      console.error('Error creating business:', error)
      throw new Error('Failed to create business')
    }
  }

  async updateBusiness(id: string, businessData: UpdateBusinessDto): Promise<Business> {
    try {
      const response = await this.api.patch({ path: `/business/${id}`, data: businessData })
      return response
    } catch (error) {
      console.error('Error updating business:', error)
      throw new Error('Failed to update business')
    }
  }

  async deleteBusiness(id: string): Promise<Business> {
    try {
      const response = await this.api.delete({ path: `/business/${id}` })
      return response
    } catch (error) {
      console.error('Error deleting business:', error)
      throw new Error('Failed to delete business')
    }
  }

  async setUserToBusiness(id: string): Promise<Business> {
    try {
      const response = await this.api.patch({ path: `/business/${id}/set-user`, data: {} })
      return response
    } catch (error) {
      console.error('Error setting user to business:', error)
      throw new Error('Failed to set user to business')
    }
  }
}

export default BusinessService

