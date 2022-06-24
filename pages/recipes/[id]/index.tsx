import { useRouter } from 'next/router'
import { ApiError } from '../../../infrastructure/errors/api.error'

import { useContext, useEffect, useState } from 'react'
import { RecipeService, Recipe } from '../../../services/recipe.service'
import { UserService, OtherUser } from '../../../services/user.service'
import Card from '../../../components/ui/Card'
import classes from '../RecipePage.module.css'
import { InternalCode } from '../../../infrastructure/errors/internal-codes'
import Chip from '@mui/material/Chip'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Like from '../../../components/recipes/Like'
import Avatar from '@mui/material/Avatar'
import FollowUser from '../../../components/users/FollowUser'
import AuthContext from '../../../contexts/auth-context'

export default function RecipePage() {
  const [recipe, setRecipe] = useState<Recipe | undefined>()
  const [user, setUser] = useState<OtherUser | undefined>()
  const [followers, setFollowers] = useState<number>(0)
  const router = useRouter()
  const authContext = useContext(AuthContext);
  const { id } = router.query
  useEffect(() => {
    if (typeof id === 'string') {
      getRecipe(parseInt(id))
    }
  }, [id])

  useEffect(() => {
    if (user) {
      setFollowers(user?.followers.length)
    }
  }, [user])

  useEffect(() => {
    if (recipe) {
      getUser(recipe.user_id)
    }
  }, [recipe])

  async function handleDelete() {
    try {
      if (typeof id === 'string') {
        await RecipeService.delete_recipe(id)
      }
      router.push('/profile')
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

  const getUser = async (id: number) => {
    if (id) {
      try {
        const resUser = await UserService.get(id)
        setUser(resUser)
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

  const handleEdit = () => {
    router.push(`/recipes/${recipe!.id}/edit`)
  }

  return (
    <>
      {recipe && (
        <Card>
          <div className={classes.flexHeader}>
            <h1>{recipe.name}</h1>
            <div className={classes.actions}>
              <Like recipeId={recipe.id} ratings={recipe.ratings} />
              { (recipe.user_id === authContext.user?.id || authContext.user?.is_superuser) && (
                <div className={classes['chip-container']}>
                  <Chip
                    className="delete-button"
                    label="Borrar Receta"
                    onClick={handleDelete}
                    onDelete={handleDelete}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                    color="error"
                  />
                  <Chip
                    className="edit-button"
                    label="Editar Receta"
                    onClick={handleEdit}
                    onDelete={handleEdit}
                    deleteIcon={<EditIcon />}
                    variant="outlined"
                    color="info"
                  />
                </div>
              )}
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
              <div className={classes['user-info']}>
                <div className={classes['user-info-avatar-username']}>
                  <div className={classes['user-avatar']}>
                    <Avatar
                      alt={user?.first_name}
                      src={user?.picture_url}
                      className={classes.avatar}
                    />
                  </div>
                  <h2
                    onClick={() => {
                      router.push(`/profile/${user?.id}`)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {user?.first_name} {user?.last_name}
                  </h2>
                </div>
                <div className={classes['user-follow']}>
                  <h3>{followers} seguidores</h3>
                  <FollowUser
                    following={user?.is_following}
                    userId={user?.id}
                    onFollow={() => setFollowers(followers + 1)}
                    onUnfollow={() => setFollowers(followers - 1)}
                  />
                </div>
              </div>
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
                        <p className="tag-name">{tag.tag_name}</p>
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
