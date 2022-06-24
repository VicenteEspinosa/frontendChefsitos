import '@testing-library/jest-dom'

import { act, fireEvent, render, screen } from '@testing-library/react'
import FollowUser from '../../../components/users/FollowUser'
import { UserService } from '../../../services/user.service'

jest.mock('../../../services/user.service')
const mockedUserService = UserService as jest.Mocked<typeof UserService>

describe('follow user component', () => {
  mockedUserService.follow.mockResolvedValue(jest.fn())
  mockedUserService.unfollow.mockResolvedValue(jest.fn())

  test('component gets rendered correctly', async () => {
    await act(async () => {
      render(
        <FollowUser
          following={false}
          userId={1}
          onFollow={jest.fn()}
          onUnfollow={jest.fn()}
        />
      )
    })

    expect(screen.getByText('Seguir')).toBeInTheDocument()
  })

  test('following user updates button', async () => {
    await act(async () => {
      render(
        <FollowUser
          following={false}
          userId={1}
          onFollow={jest.fn()}
          onUnfollow={jest.fn()}
        />
      )
      fireEvent.click(screen.getByText('Seguir'))
    })

    expect(screen.getByText('Dejar de Seguir')).toBeInTheDocument()
  })
})
