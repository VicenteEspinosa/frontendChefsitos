import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import AuthContext from '../../../contexts/auth-context'
import RecipesPage from '../../../pages/recipes/index'

const user = {
  id: 1,
  username: 'test',
  email: 'test@text.cl',
  first_name: 'test',
  last_name: '',
  picture_url: '',
  description: '',
}

jest.mock('../../../components/recipes/Recipes', () => {
  const Recipes = () => <div>Recipes mock</div>
  return Recipes
})

const mockedPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockedPush,
    }
  },
}))

describe('recipes page', () => {
  test('displays feed form when user is logged in', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user }}>
          <RecipesPage />
        </AuthContext.Provider>
      )
    })

    expect(screen.getByText('Popularidad')).toBeInTheDocument()
    expect(screen.getByText('Recipes mock')).toBeInTheDocument()
  })

  test('router.push is called when user is not logged in', async () => {
    await act(async () => {
      render(<RecipesPage />)
    })

    expect(mockedPush).toHaveBeenCalledWith('/login')
  })
})
