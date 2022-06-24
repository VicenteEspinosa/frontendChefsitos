import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

export default function FeedSelector(props: {
  handleOrderByPopularity: (value: boolean) => void
}) {
  const [value, setValue] = useState(1)
  const handleChange = (event: SelectChangeEvent<number>) => {
    setValue(event.target.value as number)
    props.handleOrderByPopularity(event.target.value === 1)
  }
  return (
    <Box sx={{ maxWidth: 300, alignItems: 'center' }}>
      <FormControl fullWidth>
        <Select value={value} onChange={handleChange}>
          <MenuItem value={0}>Mas recientes</MenuItem>
          <MenuItem value={1}>Popularidad</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
