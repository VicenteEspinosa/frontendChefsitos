import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import IngredientSelector from '../../components/ingredients/Ingredient'
import { IngredientService } from '../../services/ingredient.service'

jest.mock('../../services/ingredient.service')
const mockedIngredientService = IngredientService as jest.Mocked<
  typeof IngredientService
>

describe('ingredient form component', () => {
  mockedIngredientService.getAllIngredients.mockResolvedValue([
    { id: 1, name: 'ingredient 1' },
    { id: 2, name: 'ingredient 2' },
  ])

  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(
        <IngredientSelector
          initialId={1}
          isMobile={false}
          onSelectionChange={jest.fn()}
        />
      )
    })

    expect(screen.getAllByText('Ingrediente')[0]).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
