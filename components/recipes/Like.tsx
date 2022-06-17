import { Rating } from '../../services/recipe.service'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../contexts/auth-context'

export default function Like(props: { ratings: Rating[] }) {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (props.ratings && user) {
      const likeRatings = props.ratings.filter((rating) => rating.like)
      setLikes(likeRatings.length)
      setDislikes(props.ratings.length - likeRatings.length)
      let userIds = likeRatings.map((rating) => rating.user_id)
      if (userIds.includes(user.id)) {
        setLike(true)
      } else {
        userIds = props.ratings.reduce((filtered: number[], rating) => {
          if (!rating.like) {
            filtered.push(rating.user_id)
          }
          return filtered
        }, [])
        if (userIds.includes(user.id)) setDislike(true)
      }
    }
  }, [props.ratings])
  const likeHandle = () => {
    console.log('Like')
  }

  const dislikeHandle = () => {
    console.log('Dislike')
  }

  return (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={likeHandle}>
        {/* TODO pintar rojo si ya tiene like */}
        <ThumbUpIcon sx={{ color: like ? 'brown' : 'white' }} />
      </IconButton>
      {likes}
      <IconButton aria-label="add to favorites" onClick={dislikeHandle}>
        {/* TODO pintar rojo si ya tiene like */}
        <ThumbDownIcon sx={{ color: dislike ? 'brown' : 'white' }} />
      </IconButton>
      {dislikes}
    </CardActions>
  )
}
