import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ApiError } from '../../../infrastructure/errors/api.error'
import { UserService, OtherUser } from '../../../services/user.service'
import Avatar from '@mui/material/Avatar'
import Card from '../../../components/ui/Card'
import Recipes from '../../../components/recipes/Recipes'
import { InternalCode } from '../../../infrastructure/errors/internal-codes'
import FollowUser from '../../../components/users/FollowUser'

export default function AnotherProfilePage() {
  const [profileData, setProfileData] = useState<OtherUser | undefined>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (typeof id === 'string') {
      getProfileData(parseInt(id))
    }
  }, [id])

  const getProfileData = async (id: number) => {
    if (id) {
      try {
        const resProfile = await UserService.show_user_by_id(id)
        setProfileData(resProfile)
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
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Avatar alt="No" src={profileData?.picture_url} />
          <FollowUser
            following={profileData?.is_following}
            userId={profileData?.id}
          />
        </div>
        <h2>{profileData?.username}</h2>
        <h3>
          {profileData?.first_name} {profileData?.last_name}
        </h3>
        <h3>{profileData?.email}</h3>
        <div>{profileData?.description}</div>
        <Recipes 
          myRecipes={false} 
          userId={profileData?.id} 
        />
      </Card>
    </>
  )
}
