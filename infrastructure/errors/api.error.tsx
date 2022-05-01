export class ApiError extends Error {
  internalCode!: string
  message!: string
  path?: string
  constructor(values: object) {
    super()
    Object.assign(this, values)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
