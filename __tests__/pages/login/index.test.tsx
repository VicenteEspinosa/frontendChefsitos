import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { UserService } from '../../../services/user.service'
import LoginPage from '../../../pages/login'
import React from 'react'

jest.mock('../../../services/user.service')
const mockedUserService = UserService as jest.Mocked<typeof UserService>

describe('login page', () => {
  mockedUserService.signin.mockResolvedValue({ username: 'test' })

  jest.mock('@hookform/resolvers/yup', () => {
    return {
      ...jest.requireActual('@hookform/resolvers/yup'),
      yupResolver: jest.fn(),
    }
  })

  test('displays sign in form when not logged in', async () => {
    await act(async () => {
      render(<LoginPage isMobile={false} />)
    })

    expect(screen.getByText('Nombre de usuario')).toBeInTheDocument()
    expect(screen.getByText('Contraseña')).toBeInTheDocument()
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
  })

  test('show error messages when click on submit with empty form', async () => {
    await act(async () => {
      render(<LoginPage isMobile={false} />)
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Iniciar sesión'))
    })

    expect(
      screen.getByText('El nombre de usuario es requerido')
    ).toBeInTheDocument()
    expect(screen.getByText('La contraseña es requerida')).toBeInTheDocument()
  })

  test.skip('form show input written', async () => {
    await act(async () => {
      render(<LoginPage isMobile={false} />)
    })

    await act(async () => {
      fireEvent.change(screen.getByTestId('username-field'), {
        target: { value: 'test' },
      })
      fireEvent.change(screen.getByTestId('password-field'), {
        target: { value: '123456' },
      })
    })
  })
})
