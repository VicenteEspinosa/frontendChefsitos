import EditUserForm from '../../components/forms/EditUserForm'
import { EditUserDto } from '../../dtos/user.dto'
import { UserService } from '../../services/user.service'
import React, { useContext, useState } from 'react'
import AuthContext from '../../contexts/auth-context'
import { ApiError } from '../../infrastructure/errors/api.error'
import { InternalCode } from '../../infrastructure/errors/internal-codes'
import { useRouter } from 'next/router'

export default function EditProfilePage(props: { isMobile: boolean }) {
  const [usernameIsForbidden, setUsernameIsForbidden] = useState(false)
  const router = useRouter()
  const authContext = useContext(AuthContext)
  async function onAddUserHandler(enteredUserData: EditUserDto) {
    try {
      enteredUserData = Object.fromEntries(
        Object.entries(enteredUserData).filter(([, v]) => v != '')
      )
      const user = await UserService.edit(enteredUserData)
      authContext.setUser!(user)
      router.push('/profile')
    } catch (error) {
      if (error instanceof ApiError) {
        if (
          error.internalCode == InternalCode.EntityNotProcesable &&
          error.path == 'username'
        ) {
          setUsernameIsForbidden(true)
          return
        }
      }
      throw error
    }
  }
  return (
    <EditUserForm
      onEditUser={onAddUserHandler}
      isMobile={props.isMobile}
      showAlert={usernameIsForbidden}
    />
  )
}
