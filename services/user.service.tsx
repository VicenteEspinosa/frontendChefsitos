import UserDto from '../dtos/user.dto'
import BaseService from './base.service'

const pathPrefix = 'users/'

export default async function singUp(userData: UserDto) {
  return BaseService.request(
    pathPrefix,
    'signup',
    BaseService.RequestMethod.Post,
    JSON.stringify(userData)
  )
}
