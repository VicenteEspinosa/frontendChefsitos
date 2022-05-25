import { useRouter } from 'next/router'
import { ApiError } from '../../../infrastructure/errors/api.error'

import { useEffect, useState } from 'react'
import { RecipeService, Recipe } from '../../../services/recipe.service'
import Card from '../../../components/ui/Card'
import classes from '../RecipePage.module.css'
import { InternalCode } from '../../../infrastructure/errors/internal-codes'
import Chip from '@mui/material/Chip'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'

export default function RecipePage() {
  const [recipe, setRecipe] = useState<Recipe | undefined>()
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (typeof id === 'string') {
      getRecipe(parseInt(id))
    }
  }, [id])

  async function handleDelete() {
    try {
      if (typeof id === 'string') {
        await RecipeService.delete_recipe(id)
      }
      router.push('/')
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.internalCode == InternalCode.EntityNotProcesable) {
          return
        }
      }
      throw error
    }
  }

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
    <>
      {recipe && (
        <Card>
          <div className={classes.flexHeader}>
            <h1>{recipe.name}</h1>
            <div>
              <Chip
                label="Borrar Receta"
                onClick={handleDelete}
                onDelete={handleDelete}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                color="error"
              />
              <Link href={`/recipes/${recipe!.id}/edit`}>Editar</Link>
            </div>
          </div>
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
