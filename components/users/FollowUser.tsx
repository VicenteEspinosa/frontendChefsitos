import React, { useEffect, useState } from 'react'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { UserService } from '../../services/user.service'
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1'
import styles from './Follow.module.css'

export default function FollowUser(props: {
  following: boolean | null | undefined
  userId: number | undefined
  onFollow?: () => void
  onUnfollow?: () => void
}) {
  const [isFollowing, setIsFollowing] = useState(props.following)

  const followUser = async () => {
    const response = await sendFollow()
    if (response) {
      isFollowing
        ? props.onUnfollow && props.onUnfollow()
        : props.onFollow && props.onFollow()
      setIsFollowing(!isFollowing)
    }
  }

  useEffect(() => {
    setIsFollowing(props.following)
  }, [props.following])

  async function sendFollow() {
    try {
      if (!props.userId) {
        return undefined
      }
      isFollowing
        ? await UserService.unfollow(props.userId)
        : await UserService.follow(props.userId)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <>
      <div className={styles.follow} onClick={followUser}>
        {isFollowing ? (
          <div className={styles.flex}>
            <PersonRemoveAlt1Icon />
            <p>Dejar de Seguir</p>
          </div>
        ) : isFollowing !== false ? null : (
          <div className={styles.flex}>
            <PersonAddAlt1Icon />
            <p>Seguir</p>
          </div>
        )}
      </div>
    </>
  )
}
