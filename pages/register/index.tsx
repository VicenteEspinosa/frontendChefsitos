import { useRouter } from 'next/router'
import React from 'react'
import NewUserForm from '../../components/users/NewUserForm'
import { NewUserDto } from '../../dtos/user.dto'
import { UserService } from '../../services/user.service'

export default function RegisterPage(props: { isMobile: boolean }) {
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
      console.log(error)
    }
  }
  if (UserService.isLogged()) {
    router.push('/')
  }

  return <NewUserForm onAddUser={onAddUserHandler} isMobile={props.isMobile} />
}
