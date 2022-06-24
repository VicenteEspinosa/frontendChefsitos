import { useRef } from 'react'
import IngredientSelector from '../ingredients/Ingredient'
import MeasurementSelector from '../measurements/Measurement'
import DeleteIcon from '@mui/icons-material/Delete'
import classes from './IngredientContainer.module.css'

export default function IngredientContainer(props: {
  initialValues?: {
    quantity: number
    measurement_id: number
    ingredient_id: number
  }
  index: number
  isMobile: boolean
  info: {
    quantity: number | null
    measurement_id: number | null
    ingredient_id: number | null
  }
  onChange: (
    index: number,

    quantity?: number | null,
    measurement_id?: number | null,
    ingredient_id?: number | null
  ) => void
  onRemove: (index: number) => void
}) {
  const quantityRef = useRef<HTMLInputElement>(null)
  const handleIngredientChange = (ingredient_id: number | null) => {
    props.onChange(props.index, undefined, undefined, ingredient_id)
  }
  const handleMeasurementChange = (measurement_id: number | null) => {
    props.onChange(props.index, undefined, measurement_id)
  }
  const blockInvalidChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
  }
  const handleQuantityChange = () => {
    const quantity =
      quantityRef.current!.value.length > 0
        ? Math.max(1, parseInt(quantityRef.current!.value))
        : null
    props.onChange(props.index, quantity)
  }
  const remove = () => {
    props.onRemove(props.index)
  }

  return (
    <div className={`flex $ ${classes.container}`}>
      <div className="left">
        <IngredientSelector
          initialId={
            props.info.ingredient_id
              ? props.info.ingredient_id
              : props.initialValues?.ingredient_id
          }
          onSelectionChange={handleIngredientChange}
          isMobile={props.isMobile}
        />
      </div>
      <input
        value={props.info.quantity ? props.info.quantity : undefined}
        ref={quantityRef}
        className="quantity-field left"
        type="number"
        min={1}
        onKeyDown={blockInvalidChars}
        onChange={handleQuantityChange}
      />
      <MeasurementSelector
        initialId={
          props.info.measurement_id
            ? props.info.measurement_id
            : props.initialValues?.measurement_id
        }
        onSelectionChange={handleMeasurementChange}
        isMobile={props.isMobile}
      />
      <button onClick={remove}>
        <DeleteIcon />
      </button>
    </div>
  )
}
