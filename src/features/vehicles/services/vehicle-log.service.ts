import Api from '../../../app/http'
import {
  VehicleLog,
  CreateVehicleLogRequest,
  UpdateVehicleLogRequest,
  CheckoutVehicleRequest,
  FilterVehicleLogsRequest,
} from '../types/vehicle.types'

export class VehicleLogService {
  private static instance: VehicleLogService
  private api: Api

  private constructor() {
    this.api = new Api(import.meta.env.VITE_API_URL)
  }

  public static getInstance(): VehicleLogService {
    if (!VehicleLogService.instance) {
      VehicleLogService.instance = new VehicleLogService()
    }
    return VehicleLogService.instance
  }

  async getAllVehicleLogs(): Promise<VehicleLog[]> {
    try {
      const response = await this.api.get({ path: '/vehicle-log' })
      return response
    } catch (error) {
      console.error('Error fetching vehicle logs:', error)
      throw new Error('Failed to fetch vehicle logs')
    }
  }

  async getActiveVehicleLogs(): Promise<VehicleLog[]> {
    try {
      const response = await this.api.get({ path: '/vehicle-log/active' })
      return response
    } catch (error) {
      console.error('Error fetching active vehicle logs:', error)
      throw new Error('Failed to fetch active vehicle logs')
    }
  }

  async getVehicleLogById(id: string): Promise<VehicleLog> {
    try {
      const response = await this.api.get({ path: `/vehicle-log/${id}` })
      return response
    } catch (error) {
      console.error('Error fetching vehicle log:', error)
      throw new Error('Failed to fetch vehicle log')
    }
  }

  async getVehicleLogsByPlateNumber(plateNumber: string): Promise<VehicleLog[]> {
    try {
      const response = await this.api.get({ path: `/vehicle-log/vehicle/${plateNumber}/logs` })
      return response
    } catch (error) {
      console.error('Error fetching vehicle logs by plate:', error)
      throw new Error('Failed to fetch vehicle logs by plate number')
    }
  }

  async getLastVehicleLogByPlateNumber(plateNumber: string): Promise<VehicleLog> {
    try {
      const response = await this.api.get({ path: `/vehicle-log/vehicle/${plateNumber}/last` })
      return response
    } catch (error) {
      console.error('Error fetching last vehicle log:', error)
      throw new Error('Failed to fetch last vehicle log')
    }
  }

  async getVehicleLogsByDate(date: string): Promise<VehicleLog[]> {
    try {
      const response = await this.api.get({ path: `/vehicle-log/date/${date}` })
      return response
    } catch (error) {
      console.error('Error fetching vehicle logs by date:', error)
      throw new Error('Failed to fetch vehicle logs by date')
    }
  }

  async getVehicleLogsByBusinessId(businessId: string): Promise<VehicleLog[]> {
    try {
      const response = await this.api.get({ path: `/vehicle-log/business/${businessId}` })
      return response
    } catch (error) {
      console.error('Error fetching vehicle logs by business:', error)
      throw new Error('Failed to fetch vehicle logs by business')
    }
  }

  async createVehicleLog(logData: CreateVehicleLogRequest): Promise<VehicleLog> {
    try {
      const response = await this.api.post({ path: '/vehicle-log', data: logData })
      return response
    } catch (error) {
      console.error('Error creating vehicle log:', error)
      throw new Error('Failed to create vehicle log')
    }
  }

  async updateVehicleLog(id: string, logData: UpdateVehicleLogRequest): Promise<VehicleLog> {
    try {
      const response = await this.api.patch({ path: `/vehicle-log/${id}`, data: logData })
      return response
    } catch (error) {
      console.error('Error updating vehicle log:', error)
      throw new Error('Failed to update vehicle log')
    }
  }

  async checkoutVehicle(plateNumber: string, checkoutData: CheckoutVehicleRequest): Promise<VehicleLog> {
    try {
      const response = await this.api.patch({ 
        path: `/vehicle-log/vehicle/${plateNumber}/checkout`, 
        data: checkoutData 
      })
      return response
    } catch (error) {
      console.error('Error checking out vehicle:', error)
      throw new Error('Failed to checkout vehicle')
    }
  }

  async deleteVehicleLog(id: string): Promise<VehicleLog> {
    try {
      const response = await this.api.delete({ path: `/vehicle-log/${id}` })
      return response
    } catch (error) {
      console.error('Error deleting vehicle log:', error)
      throw new Error('Failed to delete vehicle log')
    }
  }

  async filterVehicleLogs(filterData: FilterVehicleLogsRequest): Promise<VehicleLog[]> {
    try {
      const response = await this.api.post({ path: '/vehicle-log/filter', data: filterData })
      return response
    } catch (error) {
      console.error('Error filtering vehicle logs:', error)
      throw new Error('Failed to filter vehicle logs')
    }
  }
}

export default VehicleLogService
