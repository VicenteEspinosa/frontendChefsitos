import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import EditUserForm from '../../../components/forms/EditUserForm'

describe('edit user form component', () => {
  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(
        <EditUserForm
          isMobile={false}
          onEditUser={jest.fn()}
          showAlert={false}
        />
      )
    })

    expect(screen.getByText('Nombre de usuario')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Apellido')).toBeInTheDocument()
    expect(screen.getByText('Descripcion')).toBeInTheDocument()
    expect(screen.getByText('Url imagen de perfil')).toBeInTheDocument()
    expect(screen.getByText('Editar perfil')).toBeInTheDocument()
  })
})
