import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

const pathPrefix = 'ingredients/'

export interface Ingredient {
  id: number
  name: string
  inputValue?: string
}

export interface NewIngredient {
  name: string
}

async function postIngredient(ingredientData: NewIngredient) {
  const ingredientResponse = await BaseService.request(
    pathPrefix,
    '',
    BaseService.RequestMethod.Post,
    JSON.stringify(ingredientData)
  )
  return ingredientResponse as Ingredient
}

async function getAllIngredients() {
  const ingredientArray = await BaseService.request(
    pathPrefix,
    '',
    BaseService.RequestMethod.Get,
    ''
  )
  localStorage.setItem('ingredientArray', JSON.stringify(ingredientArray))
  return ingredientArray as Ingredient[]
}

const ingredientArraySubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('ingredientArray') || '{}')
)

export const IngredientService = {
  get ingredientArrayValue() {
    return Object.keys(ingredientArraySubject.value).length !== 0
      ? (ingredientArraySubject.value as Ingredient[])
      : undefined
  },
  getAllIngredients,
  postIngredient,
}
