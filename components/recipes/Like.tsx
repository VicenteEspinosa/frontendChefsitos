import { Rating, RecipeService } from '../../services/recipe.service'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../contexts/auth-context'

export default function Like(props: { recipeId: number; ratings: Rating[] }) {
  const [ratings, setRatings] = useState(props.ratings)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [like, setLike] = useState<boolean | undefined>(undefined)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (ratings && user) {
      const likeRatings = ratings.filter((rating) => rating.like)
      setLikes(likeRatings.length)
      setDislikes(ratings.length - likeRatings.length)
      let userIds = likeRatings.map((rating) => rating.user_id)
      if (userIds.includes(user.id)) {
        setLike(true)
      } else {
        userIds = ratings.reduce((filtered: number[], rating) => {
          if (!rating.like) {
            filtered.push(rating.user_id)
          }
          return filtered
        }, [])
        if (userIds.includes(user.id)) setLike(false)
      }
    }
  }, [ratings])

  const updateRatings = (newLike: boolean | undefined) => {
    let newRatings
    if (!ratings.some((rating) => rating.user_id === user!.id)) {
      newRatings = [...ratings]
      newRatings.push({
        recipe_id: props.recipeId,
        user_id: user!.id,
        like: newLike ? true : false,
      })
    } else if (newLike !== undefined) {
      newRatings = ratings.map((rating) => {
        if (rating.user_id === user!.id) {
          const newRating = { ...rating }
          newRating.like = newLike ? true : false
          return newRating
        }
        return rating
      })
    } else {
      newRatings = ratings.filter((rating) => rating.user_id !== user!.id)
    }
    setRatings(newRatings)
  }

  const rate = async (value: boolean) => {
    try {
      if (like === value) {
        await RecipeService.deleteRate(props.recipeId)
        setLike(undefined)
        updateRatings(undefined)
      } else {
        await RecipeService.rate(props.recipeId, value)
        setLike(value)
        updateRatings(value)
      }
    } catch (error) {
      throw error
    }
  }

  const likeHandle = async () => {
    await rate(true)
  }

  const dislikeHandle = async () => {
    await rate(false)
  }

  return (
    <CardActions disableSpacing>
      <IconButton aria-label="like" onClick={likeHandle}>
        <ThumbUpIcon className="like-icon" sx={{ color: like ? '#445c8f' : '#ccc' }} />
      </IconButton>
      <div className='likes-counter'>{likes}</div>
      <IconButton aria-label="dislike" onClick={dislikeHandle}>
        <ThumbDownIcon className="dislike-icon" sx={{ color: like === false ? '#445c8f' : '#ccc' }} />
      </IconButton>
      <div className='dislikes-counter'>{dislikes}</div>
    </CardActions>
  )
}
