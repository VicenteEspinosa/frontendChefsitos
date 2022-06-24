import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  MeasurementService,
  Measurement,
} from '../../services/measurement.service'

export default function MeasurementSelector(props: {
  initialId?: number
  isMobile: boolean
  onSelectionChange: (measurementId: number | null) => void
}) {
  const [data, setData] = useState([] as Measurement[])
  const [measurementChosen, setMeasurementChosen] =
    React.useState<Measurement | null>(null)
  const formWidth = props.isMobile ? 2 / 2 : 1 / 2

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    props.onSelectionChange(measurementChosen ? measurementChosen.id : null)
  }, [measurementChosen])

  useEffect(() => {
    if (props.initialId) {
      const initialMeasurement = data!.find(
        (measurement) => props.initialId === measurement.id
      )
      if (initialMeasurement) {
        setMeasurementChosen(initialMeasurement)
      }
    }
  }, [props.initialId, data])

  const getList = async () => {
    const preload = MeasurementService.measurementArrayValue
    if (preload) {
      setData(preload)
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
      console.log(error)
      return undefined
    }
  }

  return (
    <>
      <Autocomplete
        className="measurements-field"
        value={measurementChosen}
        onChange={(
          event: object,
          value: Measurement | null,
          reason: string
        ) => {
          if (reason === 'selectOption') {
            setMeasurementChosen(value)
          } else if (reason === 'clear') {
            setMeasurementChosen(null)
          }
        }}
        id="grouped-measurements"
        options={data.sort(
          (a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))
        )}
        groupBy={(option) => option.name.charAt(0).toUpperCase()}
        getOptionLabel={(option) => option.name}
        sx={{ width: formWidth }}
        renderInput={(params) => <TextField {...params} label="Unidad" />}
      />
    </>
  )
}
