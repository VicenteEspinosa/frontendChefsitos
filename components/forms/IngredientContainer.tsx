import { useRef } from 'react'
import IngredientSelector from '../ingredients/Ingredient'
import MeasurementSelector from '../measurements/Measurement'
import DeleteIcon from '@mui/icons-material/Delete'
import classes from './IngredientContainer.module.css'

export default function IngredientContainer(props: {
  index: number
  isMobile: boolean
  info: {
    quantity: number | null
    measurement_id: number | null
    ingredient_id: number | null
  }
  onChange: (
    info: {
      quantity: number | null
      measurement_id: number | null
      ingredient_id: number | null
    },
    index: number
  ) => void
  onRemove: (index: number) => void
}) {
  const quantityRef = useRef<HTMLInputElement>(null)
  const handleIngredientChange = (id: number | null) => {
    const newInfo = { ...props.info }
    newInfo.ingredient_id = id
    props.onChange(newInfo, props.index)
  }
  const handleMeasurementChange = (id: number | null) => {
    const newInfo = { ...props.info }
    newInfo.measurement_id = id
    props.onChange(newInfo, props.index)
  }
  const handleQuantityChange = () => {
    const newInfo = { ...props.info }
    newInfo.quantity =
      quantityRef.current!.value.length > 0
        ? parseInt(quantityRef.current!.value)
        : null
    props.onChange(newInfo, props.index)
  }
  const remove = () => {
    props.onRemove(props.index)
  }
  return (
    <div className={`flex $ ${classes.container}`}>
      <div className="left">
        <IngredientSelector
          onSelectionChange={handleIngredientChange}
          isMobile={props.isMobile}
        />
      </div>
      <input
        ref={quantityRef}
        className="left"
        type="number"
        onChange={handleQuantityChange}
      />
      <MeasurementSelector
        onSelectionChange={handleMeasurementChange}
        isMobile={props.isMobile}
      />
      <button onClick={remove}>
        <DeleteIcon />
      </button>
    </div>
  )
}
