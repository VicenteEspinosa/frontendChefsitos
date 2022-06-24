import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import LogUserForm from '../../../components/forms/LogUserForm'

describe('log user form component', () => {
  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(
        <LogUserForm
          onLogUser={jest.fn()}
          entityNotFound={false}
          isMobile={false}
        />
      )
    })

    expect(screen.getByText('Nombre de usuario')).toBeInTheDocument()
    expect(screen.getByText('Contraseña')).toBeInTheDocument()
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
  })
})
