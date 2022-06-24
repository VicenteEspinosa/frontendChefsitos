import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import ProfilePage from '../../../pages/profile'
import AuthContext from '../../../contexts/auth-context'

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

const mockedUser = {
  id: 1,
  username: 'user',
  email: 'user@test.com',
  first_name: 'MockedUser',
  last_name: 'Test',
  picture_url: 'https://test.com',
  description: 'A mocked user',
  is_superuser: false,
}

jest.mock('../../../components/recipes/Recipes', () => {
  const Recipes = () => <div>Recipes mock</div>
  return Recipes
})

describe('profile main page', () => {
  test('page shows user data', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user: mockedUser }}>
          <ProfilePage />
        </AuthContext.Provider>
      )
    })

    expect(screen.getByText('MockedUser Test')).toBeInTheDocument()
    expect(screen.getByText('user@test.com')).toBeInTheDocument()
    expect(screen.getByText('A mocked user')).toBeInTheDocument()
  })
})
