import { NewRecipeDto } from '../dtos/recipe.dto'
import BaseService from './base.service'

const pathPrefix = 'recipes/'

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

export const RecipeService = {
  create,
  get,
}
