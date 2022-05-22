import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MeasurementService, Measurement } from '../../services/measurement.service'

export default function MeasurementSelector(props: {
  isMobile: boolean
}) {
  const [data, setData] = useState([] as Measurement[])
  const [measurementChosen, setMeasurementChosen] = React.useState<Measurement | null>(null);
  const formWidth = props.isMobile ? 2/5 : 1/5

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const preload = MeasurementService.measurementArrayValue
    if (preload) {
      setData(preload)
      return 
    }
    const fetchLoad = await onMeasurementFetch()
    if (fetchLoad) {
      setData(fetchLoad)
    }
    return
  }

  async function onMeasurementFetch() {
    try {
      const measurementArray = await MeasurementService.getAllMeasurements()
      if (measurementArray) {
        return measurementArray
      }
    } catch (error) {
      console.log("Error en linea 40 de Measurement.tsx")
      console.log(error)
      return undefined
    }
  }

  return (
    <>
      <Autocomplete
        onChange={(event: object, value: Measurement | null, reason: string) => {
          console.log(typeof event)
          if (reason === "selectOption") {
            setMeasurementChosen(value)
          }
          else if (reason === "clear") {
            setMeasurementChosen(null)
          }
        }}
        id="grouped-measurements"
        options={
          data.sort(
            (a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))
          )
        }
        groupBy={(option) => option.name.charAt(0).toUpperCase()}
        getOptionLabel={(option) => option.name}
        sx={{ width: formWidth}}
        renderInput={(params) => <TextField {...params} label="Unidad" />}
      />
      <div>{`Valor escogido: ${JSON.stringify(measurementChosen)}`}</div>
    </>
  )
}
