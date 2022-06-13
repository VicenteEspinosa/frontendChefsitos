import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { RecipeService, Recipe } from '../../services/recipe.service'
import { useEffect, useState } from 'react'
import classes from './Recipe.module.css'
import { useRouter } from 'next/router'

export default function Recipes(props: {
  myRecipes?: boolean
  orderByPopularity?: boolean
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

  const like = () => {
    console.log('Like')
  }

  const dislike = () => {
    console.log('Dislike')
  }

  async function onRecipesFetch() {
    try {
      const recipesArray = props.myRecipes
        ? await RecipeService.myRecipes()
        : await RecipeService.feed(
            props.orderByPopularity ? 'popularity' : undefined
          )
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
                  console.log('click en usuario')
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
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={like}>
              {/* TODO pintar rojo si ya tiene like */}
              <ThumbUpIcon sx={{ color: 'white' }} />
            </IconButton>
            {recipe.ratings.filter((rating) => rating.like).length}
            <IconButton aria-label="add to favorites" onClick={dislike}>
              {/* TODO pintar rojo si ya tiene like */}
              <ThumbDownIcon sx={{ color: 'white' }} />
            </IconButton>
            {recipe.ratings.filter((rating) => !rating.like).length}
            {/* Aqui van los tags */}
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
