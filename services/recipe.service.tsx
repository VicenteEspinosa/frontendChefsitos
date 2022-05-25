import { EditRecipeDto, NewRecipeDto } from '../dtos/recipe.dto'
import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

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
  created_at: Date
  updated_at: Date
}

interface Item {
  url: string
  body: string
  order_number: number
}

interface Ingredients {
  ingredient_id: number
  measurement_id: number
  ingredient_name: string
  measurement_name: string
  quantity: number
}

interface Tag {
  tag_id: number
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

async function edit(recipeId: number, recipeData: EditRecipeDto) {
  return BaseService.request(
    pathPrefix,
    `${recipeId}/`,
    BaseService.RequestMethod.Put,
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
  edit,
}
