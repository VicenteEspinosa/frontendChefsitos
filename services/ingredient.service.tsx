import BaseService from './base.service'
import { BehaviorSubject } from 'rxjs'

const pathPrefix = 'ingredients/'

export interface Ingredient {
  id: number
  name: string
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
  process.browser &&
    JSON.parse(localStorage.getItem('ingredientArray') || '{}')
)

export const IngredientService = {
  get ingredientArrayValue() {
    return Object.keys(ingredientArraySubject.value).length !== 0
      ? ingredientArraySubject.value as Ingredient[]
      : undefined
  },
  getAllIngredients,
}