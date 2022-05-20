
import { Autocomplete, TextField } from '@mui/material';
import React, {useEffect, useState } from 'react';
type Measurement = {
    id: number;
    name: string;
};

export default function MeasurementSelector(props: {
    onMeasurementFetch: () => void
    options: Measurement[] | undefined
    isMobile: boolean
    }) {
    
    const [loaded, setLoaded] = useState(0);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!loaded) {
            getToken();
        }
    }, []);
    
    const getToken = async () => {
        await props.onMeasurementFetch();
        setLoaded(1);
    };

    return (
        <>
        <Autocomplete
        id="grouped-measurements"
        options={props.options ? props.options.sort((a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))) : [{name: "all_measurements esta undefined", id: 21}]}
        groupBy={(option) => option.name.charAt(0).toUpperCase()}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Unidad" />}
        />
        <p>props.options: {JSON.stringify(props)}</p>
        <p>props.onMeasurementFetch: {JSON.stringify(props.onMeasurementFetch)}</p>
        <p>estado: {loaded.toString()}</p>
        </>
    )
  }

