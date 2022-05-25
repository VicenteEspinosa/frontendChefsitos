import { ApiError } from '../../../infrastructure/errors/api.error'
import { useEffect, useState } from 'react'
import { RecipeService, Recipe } from '../../../services/recipe.service'
import { useRouter } from 'next/router'
import { InternalCode } from '../../../infrastructure/errors/internal-codes'
import RecipeForm from '../../../components/forms/RecipeForm'

export default function EditRecipePage(props: { isMobile: boolean }) {
  const [recipe, setRecipe] = useState<Recipe | undefined>()
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (typeof id === 'string') {
      getRecipe(parseInt(id))
    }
  }, [id])

  const getRecipe = async (id: number) => {
    if (id) {
      try {
        const resRecipe = await RecipeService.get(id)
        setRecipe(resRecipe)
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.internalCode == InternalCode.AuthError) {
            router.push('/login')
          }
        }
        console.log(error)
      }
    }
  }
  return (
    <>{recipe && <RecipeForm isMobile={props.isMobile} recipe={recipe} />}</>
  )
}
