import { NewRecipeDto } from '../dtos/recipe.dto'
import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

const pathPrefix = 'recipes/'

export interface Recipe {
  id: number
  user_id: number
  private: boolean
  name: string
  description: string
  picture_url: string
  created_at: Date
  updated_at: Date
}

async function create(recipeData: NewRecipeDto) {
  return BaseService.request(
    pathPrefix,
    '',
    BaseService.RequestMethod.Post,
    JSON.stringify(recipeData)
  )
}

async function get(recipeId: number) {
  return BaseService.request(
    pathPrefix,
    `${recipeId}/`,
    BaseService.RequestMethod.Get,
    ''
  )
}

async function myRecipes() {
  return BaseService.request(
    pathPrefix,
    'self/',
    BaseService.RequestMethod.Get,
    ''
  )
}

const recipeArraySubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('recipeArray') || '{}')
)

export const RecipeService = {
  get recipeArrayValue() {
    return Object.keys(recipeArraySubject.value).length !== 0
      ? (recipeArraySubject.value as Recipe[])
      : undefined
  },
  create,
  get,
  myRecipes,
}
