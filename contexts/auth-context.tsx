import React, { Dispatch, SetStateAction } from 'react'
interface IThemeContext {
  loggedIn: boolean
  setLoggedIn?: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
  loggedIn: false,
}

const AuthContext = React.createContext<IThemeContext>(defaultState)

export default AuthContext
