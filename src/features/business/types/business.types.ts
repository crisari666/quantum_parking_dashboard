export type Business = {
  readonly _id: string
  readonly name?: string
  readonly userId: string
  readonly users: string[]
  readonly businessName: string
  readonly businessBrand: string
  readonly carHourCost: number
  readonly motorcycleHourCost: number
  readonly carMonthlyCost: number
  readonly motorcycleMonthlyCost: number
  readonly carDayCost: number
  readonly motorcycleDayCost: number
  readonly carNightCost: number
  readonly motorcycleNightCost: number
  readonly studentMotorcycleHourCost: number
  readonly businessNit: string
  readonly businessResolution: string
  readonly address: string
  readonly schedule: string
  readonly createdAt: string
  readonly updatedAt: string
}

export type CreateBusinessDto = {
  readonly name?: string
  readonly businessName: string
  readonly businessBrand: string
  readonly carHourCost: number
  readonly motorcycleHourCost: number
  readonly carMonthlyCost: number
  readonly motorcycleMonthlyCost: number
  readonly carDayCost: number
  readonly motorcycleDayCost: number
  readonly carNightCost: number
  readonly motorcycleNightCost: number
  readonly studentMotorcycleHourCost: number
  readonly businessNit: string
  readonly businessResolution: string
  readonly address: string
  readonly schedule: string
}

export type UpdateBusinessDto = Partial<CreateBusinessDto>

