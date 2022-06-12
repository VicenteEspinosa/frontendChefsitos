import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

const pathPrefix = 'tags/'

export interface Tag {
  id: number
  name: string
}

async function getAllTags() {
  const tagArray = await BaseService.request(
    pathPrefix,
    '',
    BaseService.RequestMethod.Get,
    ''
  )
  localStorage.setItem('tagArray', JSON.stringify(tagArray))
  return tagArray as Tag[]
}

const tagArraySubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('tagtArray') || '{}')
)

export const TagService = {
  get tagArrayValue() {
    return Object.keys(tagArraySubject.value).length !== 0
      ? (tagArraySubject.value as Tag[])
      : undefined
  },
  getAllTags,
}
