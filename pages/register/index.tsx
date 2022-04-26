import React from 'react'
import NewUserForm from '../../components/users/NewUserForm'
import UserDto from '../../dtos/user.dto'
import singup from '../../services/user.service'

export default class RegisterPage extends React.Component {
  async onAddUserHandler(enteredUserData: UserDto) {
    try {
      await singup(enteredUserData)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return <NewUserForm onAddUser={this.onAddUserHandler} />
  }
}
