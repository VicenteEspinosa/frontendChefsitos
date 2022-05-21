import MeasurementSelector from '../components/measurements/Measurement'
import { useMediaQuery } from 'react-responsive'
// import { useContext } from 'react'
import { MeasurementService } from '../services/measurement.service'
import MeasurementContext from '../contexts/measurement-context'
import { ApiError } from '../infrastructure/errors/api.error'
import { InternalCode } from '../infrastructure/errors/internal-codes'

export default function Home() {
  const mobileCheck = useMediaQuery({ query: `(max-width: 600px)` })
  // const measurementContext = useContext(MeasurementContext)
  async function onMeasurementFetchHandler() {
    try {
      interface Measurement {
        id: number
        name: string
      }
      const measurementArray = await MeasurementService.getAllMeasurements()
      if (measurementArray) {
        const stronglyTypedArray = measurementArray.map(
          (msrmnt) => msrmnt as Measurement
        ) as Measurement[]
        console.log('AWSASASSA')
        console.log(typeof stronglyTypedArray)
        console.log(stronglyTypedArray)
        console.log(stronglyTypedArray[0])
        console.log('AWSASASSA')
        //measurementContext.setAll_measurements!(stronglyTypedArray)
        return measurementArray
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.internalCode == InternalCode.EntityNotFound) {
          return
        }
      }
      throw error
    }
  }
  /* type Measurement = {
    id: number;
    name: string;
  };
  const rr : Measurement[] = [{"id": 2, "name": "JJJJJ"}]; */

  return (
    <MeasurementContext.Consumer>
      {({ all_measurements }) => (
        <>
          <MeasurementSelector
            onMeasurementFetch={onMeasurementFetchHandler}
            isMobile={mobileCheck}
            options={all_measurements}
          />
        </>
      )}
    </MeasurementContext.Consumer>
  )
}
