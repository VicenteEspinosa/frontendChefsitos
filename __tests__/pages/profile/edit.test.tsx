import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import AuthContext from '../../../contexts/auth-context'
import NewRecipePage from '../../../pages/profile/edit'

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

describe('profile edit page', () => {
  test('page user form fields', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user: mockedUser }}>
          <NewRecipePage isMobile={false} />
        </AuthContext.Provider>
      )
    })

    expect(screen.getByText('Nombre de usuario')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Apellido')).toBeInTheDocument()
    expect(screen.getByText('Descripcion')).toBeInTheDocument()
    expect(screen.getByText('Url imagen de perfil')).toBeInTheDocument()
    expect(screen.getByText('Editar perfil')).toBeInTheDocument()
  })
})
