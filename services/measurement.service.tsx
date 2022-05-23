import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

const pathPrefix = 'measurements/'

export interface Measurement {
  id: number
  name: string
}

async function getAllMeasurements() {
  const measurementArray = await BaseService.request(
    pathPrefix,
    '',
    BaseService.RequestMethod.Get,
    ''
  )
  localStorage.setItem('measurementArray', JSON.stringify(measurementArray))
  return measurementArray as Measurement[]
}

const measurementArraySubject = new BehaviorSubject(
  process.browser &&
    JSON.parse(localStorage.getItem('measurementArray') || '{}')
)

export const MeasurementService = {
  get measurementArrayValue() {
    return Object.keys(measurementArraySubject.value).length !== 0
      ? (measurementArraySubject.value as Measurement[])
      : undefined
  },
  getAllMeasurements,
}
