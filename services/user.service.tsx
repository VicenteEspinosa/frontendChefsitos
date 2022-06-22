import { NewUserDto, EditUserDto, LogUserDto } from '../dtos/user.dto'
import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

const pathPrefix = 'users/'

async function edit(userData: EditUserDto) {
  return BaseService.request(
    pathPrefix,
    'edit/',
    BaseService.RequestMethod.Post,
    JSON.stringify(userData)
  )
}

async function delete_user() {
  return BaseService.request(
    pathPrefix,
    'delete/',
    BaseService.RequestMethod.Delete,
    ''
  )
}

async function signup(userData: NewUserDto) {
  return BaseService.request(
    pathPrefix,
    'signup/',
    BaseService.RequestMethod.Post,
    JSON.stringify(userData)
  )
}

async function signin(logUserData: LogUserDto) {
  const user = await BaseService.request(
    pathPrefix,
    'signin/',
    BaseService.RequestMethod.Post,
    JSON.stringify(logUserData)
  )
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('user') || '{}')
)

async function signout() {
  await BaseService.request(
    pathPrefix,
    'signout/',
    BaseService.RequestMethod.Post,
    JSON.stringify({ data: { user: UserService.userValue?.username } })
  )
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user')
  }
}

async function get(id: number) {
  const user = await BaseService.request(
    pathPrefix,
    `show/${id}`,
    BaseService.RequestMethod.Get,
    ''
  )
  return user
}

export interface OtherUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  description: string
  picture_url: string
  followers: number[]
  following: number[]
  is_following: boolean
}

export const UserService = {
  get userValue() {
    return Object.keys(userSubject.value).length !== 0
      ? userSubject.value
      : undefined
  },
  signup,
  signin,
  signout,
  edit,
  delete_user,
  get,
}
