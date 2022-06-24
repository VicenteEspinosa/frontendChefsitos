import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import AuthContext from '../../contexts/auth-context'
import Home from '../../pages'

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

describe('home page', () => {
  test('page displays welcome text correctly', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user: mockedUser }}>
          <Home />
        </AuthContext.Provider>
      )
    })

    expect(
      screen.getByText('Bienvenido MockedUser a RecipeLib')
    ).toBeInTheDocument()
  })
})
