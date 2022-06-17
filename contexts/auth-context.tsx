import React, { Dispatch, SetStateAction } from 'react'
interface IThemeContext {
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
}

const defaultState = {
  user: undefined,
}

const AuthContext = React.createContext<IThemeContext>(defaultState)

export default AuthContext
