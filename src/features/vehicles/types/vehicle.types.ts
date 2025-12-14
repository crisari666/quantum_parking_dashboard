export type VehicleType = 'car' | 'motorcycle'

export type PaymentMethod = 0 | 1 | 2 | 3 | 4

export type BusinessInfo = {
  readonly _id: string
  readonly businessName: string
}

export interface Vehicle {
  readonly _id: string
  readonly plateNumber: string
  readonly vehicleType: VehicleType
  readonly inParking: boolean
  readonly lastLog: string
  readonly businessId: string
  readonly userName: string
  readonly phone: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly business?: BusinessInfo
}

export interface VehicleLog {
  readonly _id: string
  readonly vehicleId: string | Vehicle
  readonly businessId: string
  readonly entryTime: string
  readonly exitTime: string | null
  readonly duration: number
  readonly cost: number
  readonly paymentMethod: PaymentMethod | null
  readonly hasMembership: boolean
  readonly membershipId: string | null
  readonly message?: string
  readonly vehicleType?: VehicleType
  readonly userName?: string
  readonly phone?: string
  readonly inParking?: boolean
  readonly lastLog?: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface CreateVehicleRequest {
  readonly plateNumber: string
  readonly vehicleType: VehicleType
}

export interface UpdateVehicleRequest {
  readonly plateNumber?: string
  readonly vehicleType?: VehicleType
}

export interface CreateVehicleLogRequest {
  readonly plateNumber: string
  readonly vehicleType: VehicleType
}

export interface UpdateVehicleLogRequest {
  readonly plateNumber?: string
  readonly vehicleType?: VehicleType
  readonly cost: number
}

export interface SetParkingStatusRequest {
  readonly parking: boolean
}

export interface CheckoutVehicleRequest {
  readonly plateNumber?: string
  readonly vehicleType?: VehicleType
  readonly cost: number
}

export interface FindVehicleRequest {
  readonly plateNumber: string
  readonly business?: string
}

export interface FilterVehicleLogsRequest {
  readonly dateStart: string
  readonly dateEnd: string
  readonly businessId: string
}
