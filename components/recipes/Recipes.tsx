import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { RecipeService, Recipe } from '../../services/recipe.service'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '../../contexts/auth-context'
import classes from './Recipe.module.css'
import { useRouter } from 'next/router'
import Like from './Like'
import SearchBar from '../ui/SearchBar'

export default function Recipes(props: {
  myRecipes?: boolean
  orderByPopularity?: boolean
  userId?: number
  feedAlignment?: string
}) {
  const [data, setData] = useState([] as Recipe[])
  const [tagIds, setTagIds] = useState<number[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState([] as Recipe[])
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    getList()
  }, [props.orderByPopularity, props.userId, props.feedAlignment])

  useEffect(() => {
    let filterResult = []
    if (tagIds.length === 0) {
      filterResult = data
    } else {
      filterResult = data.filter((recipe: Recipe) =>
        recipe.tags.some((tag) => tagIds.includes(tag.tag_id))
      )
    }
    if (props.feedAlignment === 'random' && filterResult.length > 1) {
      const index = Math.floor(Math.random() * filterResult.length);
      filterResult = [filterResult[index]];
    }
    setFilteredRecipes(filterResult)
  }, [data, tagIds])

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
      if (props.myRecipes) {
        recipesArray = await RecipeService.myRecipes()
      } else if (props.feedAlignment === 'following') {
        recipesArray = await RecipeService.following_feed()
      } else if (!props.myRecipes && props.userId == null) {
        recipesArray = await RecipeService.feed(
          props.orderByPopularity ? 'popularity' : undefined
        )
      } else if (!props.myRecipes && props.userId == user?.id) {
        recipesArray = await RecipeService.myRecipes()
      } else {
        recipesArray = await RecipeService.get_chef_recipes(
          props.userId as number
        )
      }
      if (recipesArray) {
        return recipesArray
      }
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  const handleSearchBarChange = (tags: number[]) => {
    setTagIds(tags)
  }

  return (
    <div>
      <div className={classes.tags}>
        <SearchBar
          initialValues={tagIds}
          onSelectionChange={handleSearchBarChange}
        />
      </div>
      <div className={classes.mapCards}>
        {filteredRecipes.map((recipe: Recipe) => (
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
              subheader={new Date(recipe.created_at).toLocaleDateString(
                'es-ES',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            />
            <CardMedia
              className="recipe-image"
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
    </div>
  )
}
