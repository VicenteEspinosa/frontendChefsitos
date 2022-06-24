import Recipes from '../../components/recipes/Recipes'
import AuthContext from '../../contexts/auth-context'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FeedSelector from '../../components/recipes/FeedSelector'
import classes from './RecipePage.module.css'
import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function RecipesPage() {
  const [alignment, setAlignment] = React.useState('global')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
  }
  const authContext = useContext(AuthContext)
  const [orderByPopularity, setOrderByPopularity] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (!authContext.user) {
      router.push('/login')
    }
  })

  const handleOrderByPopularity = (value: boolean) => {
    setOrderByPopularity(value)
  }

  return (
    <>
      {authContext.user && (
        <>
          <div>
            <h1>Recetas</h1>
          </div>
          <div className={alignment === 'following' ? undefined : classes.flex}>
            <div className={classes['following-selector']}>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton value="global">Global</ToggleButton>
                <ToggleButton value="following">Mis seguidos</ToggleButton>
                <ToggleButton value="random">Receta aleatoria</ToggleButton>
              </ToggleButtonGroup>
            </div>
            {alignment === 'following' ? (
              <div></div>
            ) : (
              <div className={classes['selector-container']}>
                <FeedSelector
                  handleOrderByPopularity={handleOrderByPopularity}
                />
              </div>
            )}
          </div>

          <Recipes
            orderByPopularity={orderByPopularity}
            feedAlignment={alignment}
          />
        </>
      )}
    </>
  )
}
