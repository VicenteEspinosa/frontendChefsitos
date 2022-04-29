import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import LogUserForm from '../../components/users/LogUserForm'
import AuthContext from '../../contexts/auth-context'
import { LogUserDto } from '../../dtos/user.dto'
import { UserService } from '../../services/user.service'

export default function LoginPage() {
  const router = useRouter()
  const authContext = useContext(AuthContext)
  async function onLogUserHandler(enteredUserData: LogUserDto) {
    try {
      await UserService.signin(enteredUserData)
      authContext.setLoggedIn!(true)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return <LogUserForm onLogUser={onLogUserHandler} />
}
