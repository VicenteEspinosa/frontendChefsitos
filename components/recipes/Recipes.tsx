import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { RecipeService, Recipe } from '../../services/recipe.service'
import { useEffect, useState } from 'react'
import classes from './Recipe.module.css'
import { useRouter } from 'next/router'
import Like from './Like'

export default function Recipes(props: {
  myRecipes?: boolean
  orderByPopularity?: boolean
  userId?: number
}) {
  const [data, setData] = useState([] as Recipe[])
  const router = useRouter()

  useEffect(() => {
    getList()
  }, [props.orderByPopularity])

  const getList = async () => {
    const preload = RecipeService.recipeArrayValue
    if (preload) {
      setData(preload)
      return
    }
    const fetchLoad = await onRecipesFetch()
    if (fetchLoad) {
      setData(fetchLoad)
    }
    return
  }

  async function onRecipesFetch() {
    try {
      let recipesArray = []
      console.log(props.userId)
      if (props.myRecipes) {
        recipesArray = await RecipeService.myRecipes()
      } else if (!props.myRecipes && props.userId == null) {
        recipesArray = await RecipeService.feed(props.orderByPopularity ? 'popularity' : undefined)
      } else {
        recipesArray = await RecipeService.get_chef_recipes(props.userId as number)
      }
      if (recipesArray) {
        return recipesArray
      }
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  return (
    <div className={classes.mapCards}>
      {data.map((recipe: Recipe) => (
        <Card
          variant="outlined"
          sx={{
            maxWidth: 345,
            backgroundColor: 'rgb(165, 95, 8)',
            color: 'white',
          }}
          key={recipe.id}
          className={classes.card}
        >
          <CardHeader
            avatar={
              <Avatar
                onClick={() => {
                  router.push(`/profile/${recipe.user_id}`)
                }}
                sx={{ bgcolor: red[500], cursor: 'pointer' }}
                aria-label="recipe"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" // TODO usar la imagen del usuario
              ></Avatar>
            }
            title={recipe.name}
            sx={{ color: 'white', textTransform: 'capitalize' }}
            subheader={new Date(recipe.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          />
          <CardMedia
            onClick={() => {
              router.push(`/recipes/${recipe.id}`)
            }}
            component="img"
            height="194"
            sx={{ cursor: 'pointer' }}
            image={
              recipe.picture_url
                ? recipe.picture_url
                : 'https://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png'
            }
            alt="image"
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: 'white' }}
            >
              {recipe.description}
            </Typography>
          </CardContent>
          <Like recipeId={recipe.id} ratings={recipe.ratings} />
        </Card>
      ))}
    </div>
  )
}
