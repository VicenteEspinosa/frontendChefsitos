import IngredientSelector from '../components/ingredients/Ingredient'
import { useMediaQuery } from 'react-responsive'

export default function Home() {
  const mobileCheck = useMediaQuery({ query: `(max-width: 600px)` })

  return (
    <IngredientSelector
    isMobile={mobileCheck}
    />
  )
}