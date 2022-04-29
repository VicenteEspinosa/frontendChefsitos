import { NewUserDto, LogUserDto } from '../dtos/user.dto'
import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

const pathPrefix = 'users/'

async function signup(userData: NewUserDto) {
  return BaseService.request(
    pathPrefix,
    'signup',
    BaseService.RequestMethod.Post,
    JSON.stringify(userData)
  )
}

async function signin(logUserData: LogUserDto) {
  const user = await BaseService.request(
    pathPrefix,
    'signin',
    BaseService.RequestMethod.Post,
    JSON.stringify(logUserData)
  )
  localStorage.setItem('user', JSON.stringify(user))
}

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('user') || '{}')
)

function isLogged() {
  return process.browser && localStorage.getItem('user') ? true : false
}

async function signout() {
  await BaseService.request(
    pathPrefix,
    'signout',
    BaseService.RequestMethod.Post,
    JSON.stringify({ data: { user: UserService.userValue?.username } })
  )
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user')
  }
}

export const UserService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  signup,
  signin,
  isLogged,
  signout,
}
