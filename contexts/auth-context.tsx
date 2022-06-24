import React, { Dispatch, SetStateAction } from 'react'
interface UserThemeContext {
  user: User | undefined
  setUser?: Dispatch<SetStateAction<User | undefined>>
}

interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  picture_url: string
  description: string
  is_superuser: boolean
}

const defaultState = {
  user: undefined,
}

const AuthContext = React.createContext<UserThemeContext>(defaultState)

export default AuthContext
