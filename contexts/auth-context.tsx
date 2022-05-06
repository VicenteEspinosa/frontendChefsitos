import React, { Dispatch, SetStateAction } from 'react'
interface IThemeContext {
  user: User | undefined
  setUser?: Dispatch<SetStateAction<User | undefined>>
}

interface User {
  username: string
  email: string
  first_name: string
  last_nanme: string
}

const defaultState = {
  user: undefined,
}

const AuthContext = React.createContext<IThemeContext>(defaultState)

export default AuthContext
