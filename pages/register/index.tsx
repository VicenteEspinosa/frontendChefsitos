import { useRouter } from 'next/router'
import React, { useState } from 'react'
import NewUserForm from '../../components/users/NewUserForm'
import { NewUserDto } from '../../dtos/user.dto'
import { ApiError } from '../../infrastructure/errors/api.error'
import { InternalCode } from '../../infrastructure/errors/internal-codes'
import { UserService } from '../../services/user.service'

export default function RegisterPage(props: { isMobile: boolean }) {
  const [usernameIsForbidden, setUsernameIsForbidden] = useState(false)
  const router = useRouter()
  async function onAddUserHandler(enteredUserData: NewUserDto) {
    try {
      await UserService.signup(enteredUserData)
      await UserService.signin({
        username: enteredUserData.username,
        password: enteredUserData.password,
      })
      router.push('/')
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
  if (UserService.isLogged()) {
    router.push('/')
  }

  return (
    <NewUserForm
      onAddUser={onAddUserHandler}
      isMobile={props.isMobile}
      showAlert={usernameIsForbidden}
    />
  )
}