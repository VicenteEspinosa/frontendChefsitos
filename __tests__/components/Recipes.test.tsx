import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import Recipes from '../../components/recipes/Recipes'
import { RecipeService } from '../../services/recipe.service'

jest.mock('../../services/recipe.service')
const mockedRecipeService = RecipeService as jest.Mocked<typeof RecipeService>

jest.mock('../../components/ui/SearchBar', () => {
  const SearchBar = () => <div>SearchBar Mock</div>
  return SearchBar
})

describe('recipes component', () => {
  mockedRecipeService.myRecipes.mockResolvedValue([
    {
      id: 1,
      user_id: 1,
      private: true,
      name: 'username',
      description: 'this is a test recipe',
      picture_url: 'https://google.cl',
      created_at: Date.now(),
      updated_at: Date.now(),
      ratings: [],
      tags: [],
    },
    {
      id: 2,
      user_id: 2,
      private: false,
      name: 'second_username',
      description: 'this is another test recipe',
      picture_url: 'https://google.cl',
      created_at: Date.now(),
      updated_at: Date.now(),
      ratings: [],
      tags: [],
    },
  ])

  test('my recipes component shows recipes titles and authors', async () => {
    await act(async () => {
      render(<Recipes myRecipes={true} />)
    })

    expect(screen.getByText('this is a test recipe')).toBeInTheDocument()
    expect(screen.getByText('username')).toBeInTheDocument()
    expect(screen.getByText('this is another test recipe')).toBeInTheDocument()
    expect(screen.getByText('second_username')).toBeInTheDocument()
  })
})
