import React, { Dispatch, SetStateAction } from 'react'
interface IThemeContext {
  all_measurements: Measurement[] | undefined
  setMeasurementArray?: Dispatch<SetStateAction<Measurement[] | undefined>>
}

interface Measurement {
  id: number
  name: string
}

const defaultState = {
    all_measurements: [],
}

const MeasurementContext = React.createContext<IThemeContext>(defaultState)

export default MeasurementContext
