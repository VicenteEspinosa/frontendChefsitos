import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

const pathPrefix = 'measurements/'

async function getAllMeasurements() {
    const measurementArray = await BaseService.request(
      pathPrefix,
      '',
      BaseService.RequestMethod.Get,
      ''
    )
    localStorage.setItem('measurementArray', JSON.stringify(measurementArray))
    return measurementArray
  }

const measurementArraySubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('measurementArray') || '[]')
)

export const MeasurementService = {
  get measurementArrayValue() {
    return Object.keys(measurementArraySubject.value).length !== 0
      ? measurementArraySubject.value
      : undefined
  },
  getAllMeasurements
}