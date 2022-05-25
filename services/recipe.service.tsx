import { NewRecipeDto } from '../dtos/recipe.dto'
import BaseService from './base.service'

const pathPrefix = 'recipes/'

export interface Recipe {
  id: number
  name: string
  picture_url: string
  description: string
  private: boolean
  user_id: number
  items: Item[]
  ingredients: Ingredients[]
  tags: Tag[]
}

interface Item {
  url: string
  body: string
  order_number: number
}

interface Ingredients {
  ingredient_name: string
  measurement_name: string
  quantity: number
}

interface Tag {
  tag_name: string
  tag_placeholder_url: string
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

export const RecipeService = {
  create,
  get,
}
