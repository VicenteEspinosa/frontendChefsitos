import React, { Dispatch, SetStateAction } from 'react'
interface IContext {
  all_measurements: Measurement[]
  setAll_measurements?: Dispatch<SetStateAction<Measurement[]>>
}

interface Measurement {
  id: number
  name: string
}

const defaultState = {
  all_measurements: [] as Measurement[],
}

const MeasurementContext = React.createContext<IContext>(defaultState)

export default MeasurementContext
