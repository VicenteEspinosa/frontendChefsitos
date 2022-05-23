import { ApiError } from '../../infrastructure/errors/api.error'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import LogUserForm from '../../components/forms/LogUserForm'
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
      const user = await UserService.signin(enteredUserData)
      authContext.setUser!(user)
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
  if (authContext.user) {
    router.push('/')
  }

  return (
    <AuthContext.Consumer>
      {({ user }) => (
        <div>
          {!user && (
            <LogUserForm
              onLogUser={onLogUserHandler}
              entityNotFound={entityNotFound}
              isMobile={props.isMobile}
            />
          )}
        </div>
      )}
    </AuthContext.Consumer>
  )
}
