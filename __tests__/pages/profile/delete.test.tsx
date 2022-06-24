import '@testing-library/jest-dom'

import { act, render } from '@testing-library/react'
import AuthContext from '../../../contexts/auth-context'
import DeleteUser from '../../../pages/profile/delete'

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

const mockRouterPush = jest.fn()

jest.mock('next/router', () => {
  const originalModule = jest.requireActual('next/router')

  return {
    __esModule: true,
    ...originalModule,
    useRouter: () => {
      return { push: mockRouterPush, query: { id: '1' } }
    },
  }
})

jest.mock('../../../services/user.service')

describe('profile delete page', () => {
  test('redirects to index', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user: mockedUser, setUser: jest.fn() }}>
          <DeleteUser />
        </AuthContext.Provider>
      )
    })

    expect(mockRouterPush).toBeCalledWith('/')
  })
})
