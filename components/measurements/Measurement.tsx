import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

type Measurement = {
  id: number
  name: string
}

interface MeasurementResponseItem {
  id: number
  name: string
}

export default function MeasurementSelector(props: {
  onMeasurementFetch: () => Promise<MeasurementResponseItem[] | undefined>
  options: Measurement[] | undefined
  isMobile: boolean
}) {
  const [loaded, setLoaded] = useState(0)
  const [data, setData] = useState([] as Measurement[])

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!loaded) {
      getToken()
    }
  }, [])

  const getToken = async () => {
    const as = await props.onMeasurementFetch()
    console.log('sadfeafzcc')
    console.log(as)
    if (as) {
      setData(as)
    }
    setLoaded(1)
  }

  return (
    <>
      <Autocomplete
        id="grouped-measurements"
        options={
          data
            ? data.sort(
                (a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))
              )
            : [{ name: 'all_measurements esta undefined', id: 21 }]
        }
        groupBy={(option) => option.name.charAt(0).toUpperCase()}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Unidad" />}
      />
      <p>props.options: {JSON.stringify(props)}</p>
      <p>estado: {loaded.toString()}</p>
    </>
  )
}
