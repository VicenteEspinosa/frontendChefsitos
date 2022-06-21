import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import Like from '../../components/recipes/Like'
import AuthContext from '../../contexts/auth-context'
import { RecipeService } from '../../services/recipe.service'

const user = {
  id: 1,
  username: 'test',
  email: 'test@text.cl',
  first_name: 'test',
  last_name: '',
  picture_url: '',
  description: '',
}

jest.mock('../../services/recipe.service')
const mockedRecipeService = RecipeService as jest.Mocked<typeof RecipeService>

describe('like component', () => {
  mockedRecipeService.rate.mockResolvedValue({})
  mockedRecipeService.deleteRate.mockResolvedValue({})

  const recipeId = 1
  const ratings = [
    {
      user_id: 1,
      recipe_id: recipeId,
      like: true,
    },
    {
      user_id: 2,
      recipe_id: recipeId,
      like: false,
    },
    {
      user_id: 3,
      recipe_id: recipeId,
      like: false,
    },
  ]
  test('gets rendered correctly', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user }}>
          <Like recipeId={recipeId} ratings={ratings} />
        </AuthContext.Provider>
      )
    })

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', {
        name: 'like',
      }).length
    ).toBe(1)
    expect(
      screen.getAllByRole('button', {
        name: 'dislike',
      }).length
    ).toBe(1)
  })

  test('clicking in like-button remove like', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user }}>
          <Like recipeId={recipeId} ratings={ratings} />
        </AuthContext.Provider>
      )
    })

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: 'like',
        })
      )
    })

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('clicking in dislike-button dislikes', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user }}>
          <Like recipeId={recipeId} ratings={ratings} />
        </AuthContext.Provider>
      )
    })

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: 'dislike',
        })
      )
    })

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
