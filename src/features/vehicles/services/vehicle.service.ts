import Api from '../../../app/http'
import {
  Vehicle,
  CreateVehicleRequest,
  UpdateVehicleRequest,
  SetParkingStatusRequest,
} from '../types/vehicle.types'

export class VehicleService {
  private static instance: VehicleService
  private api: Api

  private constructor() {
    this.api = new Api(import.meta.env.VITE_API_URL)
  }

  public static getInstance(): VehicleService {
    if (!VehicleService.instance) {
      VehicleService.instance = new VehicleService()
    }
    return VehicleService.instance
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    try {
      const response = await this.api.get({ path: '/vehicle' })
      return response
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      throw new Error('Failed to fetch vehicles')
    }
  }

  async getVehicleById(id: string): Promise<Vehicle | null> {
    try {
      const response = await this.api.get({ path: `/vehicle/${id}` })
      return response
    } catch (error) {
      console.error('Error fetching vehicle:', error)
      throw new Error('Failed to fetch vehicle')
    }
  }

  async getVehiclesByBusinessId(businessId: string): Promise<Vehicle[]> {
    try {
      const response = await this.api.get({ path: `/vehicle/business/${businessId}` })
      return response
    } catch (error) {
      console.error('Error fetching vehicles by business:', error)
      throw new Error('Failed to fetch vehicles by business')
    }
  }

  async getMyVehicles(): Promise<Vehicle[]> {
    try {
      const response = await this.api.get({ path: '/vehicle/my-vehicles' })
      return response
    } catch (error) {
      console.error('Error fetching my vehicles:', error)
      throw new Error('Failed to fetch my vehicles')
    }
  }

  async getActiveVehicles(): Promise<Vehicle[]> {
    try {
      const response = await this.api.get({ path: '/vehicle/active' })
      return response
    } catch (error) {
      console.error('Error fetching active vehicles:', error)
      throw new Error('Failed to fetch active vehicles')
    }
  }

  async findVehicleByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    try {
      const response = await this.api.get({ path: `/vehicle/plate/${plateNumber}` })
      return response
    } catch (error) {
      console.error('Error finding vehicle by plate:', error)
      throw new Error('Failed to find vehicle by plate number')
    }
  }

  async findAllVehiclesByPlateNumber(plateNumber: string): Promise<Vehicle[]> {
    try {
      const response = await this.api.get({ path: `/vehicle/plate/${plateNumber}/all` })
      return response
    } catch (error) {
      console.error('Error finding all vehicles by plate:', error)
      throw new Error('Failed to find all vehicles by plate number')
    }
  }

  async createVehicle(vehicleData: CreateVehicleRequest): Promise<Vehicle> {
    try {
      const response = await this.api.post({ path: '/vehicle', data: vehicleData })
      return response
    } catch (error) {
      console.error('Error creating vehicle:', error)
      throw new Error('Failed to create vehicle')
    }
  }

  async updateVehicle(id: string, vehicleData: UpdateVehicleRequest): Promise<Vehicle> {
    try {
      const response = await this.api.patch({ path: `/vehicle/${id}`, data: vehicleData })
      return response
    } catch (error) {
      console.error('Error updating vehicle:', error)
      throw new Error('Failed to update vehicle')
    }
  }

  async setParkingStatus(plateNumber: string, parkingData: SetParkingStatusRequest): Promise<Vehicle> {
    try {
      const response = await this.api.patch({ 
        path: `/vehicle/plate/${plateNumber}/parking`, 
        data: parkingData 
      })
      return response
    } catch (error) {
      console.error('Error setting parking status:', error)
      throw new Error('Failed to set parking status')
    }
  }

  async deleteVehicle(id: string): Promise<Vehicle> {
    try {
      const response = await this.api.delete({ path: `/vehicle/${id}` })
      return response
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      throw new Error('Failed to delete vehicle')
    }
  }
}

export default VehicleService
