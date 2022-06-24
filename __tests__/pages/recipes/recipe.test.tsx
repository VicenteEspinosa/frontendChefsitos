import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import { ApiError } from '../../../infrastructure/errors/api.error'
import { InternalCode } from '../../../infrastructure/errors/internal-codes'
import RecipePage from '../../../pages/recipes/[id]'
import { RecipeService } from '../../../services/recipe.service'

jest.mock('../../../services/recipe.service')
const mockedRecipeService = RecipeService as jest.Mocked<typeof RecipeService>

const mockedPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: '1' },
      push: mockedPush,
    }
  },
}))

describe('recipe page', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined)
  })
  test('displays recipe when user is logged in', async () => {
    const recipe = {
      id: 1,
      user_id: 1,
      private: false,
      name: 'test recipe',
      description: 'this is a test recipe',
      picture_url: 'https://google.cl',
      created_at: Date.now(),
      updated_at: Date.now(),
      ratings: [],
      tags: [],
      ingredients: [],
      items: [],
    }
    mockedRecipeService.get.mockResolvedValue(recipe)

    await act(async () => {
      render(<RecipePage />)
    })

    expect(screen.getByText('test recipe')).toBeInTheDocument()
    expect(screen.getByText('this is a test recipe')).toBeInTheDocument()
  })
  test('router.push is called when user is not logged in', async () => {
    mockedRecipeService.get.mockImplementation(() => {
      throw new ApiError({ internalCode: InternalCode.AuthError })
    })

    await act(async () => {
      render(<RecipePage />)
    })

    expect(mockedPush).toHaveBeenCalledWith('/login')
  })
})
