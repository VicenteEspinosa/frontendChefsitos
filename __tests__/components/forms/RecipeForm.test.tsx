import '@testing-library/jest-dom'

import { act, fireEvent, render, screen } from '@testing-library/react'
import { MeasurementService } from '../../../services/measurement.service'
import { RecipeService } from '../../../services/recipe.service'
import { TagService } from '../../../services/tag.service'
import RecipeForm from '../../../components/forms/RecipeForm'
import { IngredientService } from '../../../services/ingredient.service'

const mockRouterPush = jest.fn()

jest.mock('next/router', () => {
  const originalModule = jest.requireActual('next/router')

  return {
    __esModule: true,
    ...originalModule,
    useRouter: () => {
      return { push: mockRouterPush }
    },
  }
})

jest.mock('../../../services/measurement.service')
const mockedMeasurementService = MeasurementService as jest.Mocked<
  typeof MeasurementService
>

jest.mock('../../../services/tag.service')
const mockedTagService = TagService as jest.Mocked<typeof TagService>

jest.mock('../../../services/ingredient.service')
const mockedIngredientService = IngredientService as jest.Mocked<
  typeof IngredientService
>

jest.mock('../../../services/recipe.service')
const mockedRecipeService = RecipeService as jest.Mocked<typeof RecipeService>

const mockedRecipe = {
  id: 1,
  name: 'Mocked recipe',
  picture_url: 'https://test.com',
  description: 'A mocked recipe',
  private: false,
  user_id: 1,
  items: [{ url: 'https://test.com', body: 'An item', order_number: 0 }],
  ingredients: [
    {
      ingredient_id: 1,
      measurement_id: 1,
      ingredient_name: 'An ingredient',
      measurement_name: 'A measurement',
      quantity: 1,
    },
  ],
  tags: [
    { tag_id: 1, tag_name: 'A tag', tag_placeholder_url: 'https://test.com' },
  ],
  ratings: [{ recipe_id: 1, user_id: 1, like: true }],
  created_at: new Date(),
  updated_at: new Date(),
}

describe('recipe form component', () => {
  mockedMeasurementService.getAllMeasurements.mockResolvedValue([
    { id: 1, name: 'measurement 1' },
    { id: 2, name: 'measurement 2' },
  ])

  mockedTagService.getAllTags.mockResolvedValue([
    { id: 1, name: 'Tag 1' },
    { id: 2, name: 'Tag 2' },
  ])

  mockedIngredientService.getAllIngredients.mockResolvedValue([
    {
      id: 1,
      name: 'Ingredient 1',
    },
  ])

  mockedRecipeService.edit.mockResolvedValue(mockedRecipe)

  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(<RecipeForm isMobile={false} />)
    })

    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Descripción')).toBeInTheDocument()
    expect(screen.getByText('Privada')).toBeInTheDocument()
  })

  test('form displays existing recipe correctly', async () => {
    await act(async () => {
      render(<RecipeForm isMobile={false} recipe={mockedRecipe} />)
    })

    expect(screen.getByText('A mocked recipe')).toBeInTheDocument()
  })

  test('form submit button works correctly', async () => {
    await act(async () => {
      render(<RecipeForm isMobile={false} recipe={mockedRecipe} />)
      fireEvent.click(screen.getByText('Publicar'))
    })

    expect(mockRouterPush).toBeCalled()
  })
})
