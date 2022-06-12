import Recipes from '../../components/recipes/Recipes'
import AuthContext from '../../contexts/auth-context'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FeedSelector from '../../components/recipes/FeedSelector'
import classes from './RecipePage.module.css'

export default function RecipesPage() {
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
          <div className={classes['selector-container']}>
            <FeedSelector handleOrderByPopularity={handleOrderByPopularity} />
          </div>
          <Recipes orderByPopularity={orderByPopularity} />
        </>
      )}
    </>
  )
}
