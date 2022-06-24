import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import AuthContext from '../../contexts/auth-context'
import Avatar from '@mui/material/Avatar'
import Card from '../../components/ui/Card'
import Recipes from '../../components/recipes/Recipes'

export default function ProfilePage() {
  // const [entityNotFound, setEntityNotFound] = useState(false)
  const router = useRouter()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  const EditProfileRoute = () => {
    router.push('/profile/edit')
  }

  const DeleteUserRoute = () => {
    router.push('/profile/delete')
  }

  return (
    <>
      <Card>
        <Avatar alt="No" src={user?.picture_url} />
        <h2>{user?.username}</h2>
        <h3>
          {user?.first_name} {user?.last_name}
        </h3>
        <h3>{user?.email}</h3>
        <div>{user?.description}</div>

        <div>
          <Button onClick={EditProfileRoute}>Editar</Button>
          <Button className="delete-button" onClick={DeleteUserRoute}>Eliminar</Button>
        </div>
        <Recipes myRecipes={true} />
      </Card>
    </>
  )
}
