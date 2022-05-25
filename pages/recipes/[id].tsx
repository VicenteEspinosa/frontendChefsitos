import { useRouter } from 'next/router'
import { ApiError } from '../../infrastructure/errors/api.error'

import { useEffect, useState } from 'react'
import { RecipeService, Recipe } from '../../services/recipe.service'
import Card from '../../components/ui/Card'
import classes from './RecipePage.module.css'
import { InternalCode } from '../../infrastructure/errors/internal-codes'

export default function RecipePage() {
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
        resRecipe.items[2].url =
          'https://media.discordapp.net/attachments/971206953592315946/978863311795920916/hamburguesa-3.jpeg?width=829&height=473'
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
    <>
      {recipe && (
        <Card>
          <h1>{recipe.name}</h1>
          <div className="flex">
            {recipe.picture_url && (
              <div className="left">
                <img
                  className={classes.picture}
                  alt="picture"
                  src={recipe.picture_url}
                />
              </div>
            )}
            <div className={classes.information}>
              {recipe.description && (
                <>
                  <h2> Descripción</h2>
                  <p>{recipe.description}</p>
                </>
              )}
              {recipe.tags.length > 0 && (
                <>
                  <h2> Tags</h2>
                  <ul>
                    {recipe.tags.map((tag, index) => (
                      <li key={index}>
                        <p>{tag.tag_name}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {recipe.ingredients.length > 0 && (
                <>
                  <h2> Ingredientes</h2>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.quantity} {ingredient.measurement_name} de{' '}
                        {ingredient.ingredient_name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          {recipe.items.length > 0 && (
            <div>
              <h2>Preparación</h2>
              <ol>
                {recipe.items.map((item, index) => (
                  <li className={classes.item} key={index}>
                    {item.body && <p>{item.body}</p>}
                    {item.url && <img src={item.url} />}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Card>
      )}
    </>
  )
}
