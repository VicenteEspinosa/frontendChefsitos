import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import NewUserForm from '../../../components/forms/NewUserForm'

describe('new user form component', () => {
  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(
        <NewUserForm isMobile={false} onAddUser={jest.fn()} showAlert={false} />
      )
    })

    expect(screen.getByText('Nombre de usuario')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Apellido')).toBeInTheDocument()
  })
})
