import { ApiError } from '../../infrastructure/errors/api.error'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import LogUserForm from '../../components/users/LogUserForm'
import AuthContext from '../../contexts/auth-context'
import { LogUserDto } from '../../dtos/user.dto'
import { UserService } from '../../services/user.service'
import { InternalCode } from '../../infrastructure/errors/internal-codes'

export default function LoginPage(props: { isMobile: boolean }) {
  const [entityNotFound, setEntityNotFound] = useState(false)
  const router = useRouter()
  const authContext = useContext(AuthContext)
  async function onLogUserHandler(enteredUserData: LogUserDto) {
    try {
      await UserService.signin(enteredUserData)
      authContext.setLoggedIn!(true)
      router.push('/')
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.internalCode == InternalCode.EntityNotFound) {
          setEntityNotFound(true)
          return
        }
      }
      throw error
    }
  }

  return (
    <LogUserForm
      onLogUser={onLogUserHandler}
      entityNotFound={entityNotFound}
      isMobile={props.isMobile}
    />
  )
}
