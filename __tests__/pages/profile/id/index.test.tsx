import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import AnotherProfilePage from '../../../../pages/profile/[id]'
import { UserService } from '../../../../services/user.service'

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

jest.mock('../../../../components/recipes/Recipes', () => {
  const Recipes = () => <div>Recipes mock</div>
  return Recipes
})

jest.mock('../../../../services/user.service')
const mockedUserService = UserService as jest.Mocked<typeof UserService>

describe('profile id page', () => {
  mockedUserService.show_user_by_id.mockResolvedValue(mockedUser)

  test('profile show user info', async () => {
    await act(async () => {
      render(<AnotherProfilePage />)
    })

    expect(screen.getByText('MockedUser Test')).toBeInTheDocument()
    expect(screen.getByText('user@test.com')).toBeInTheDocument()
    expect(screen.getByText('A mocked user')).toBeInTheDocument()
  })
})
