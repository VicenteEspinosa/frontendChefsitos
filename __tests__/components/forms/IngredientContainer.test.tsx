import '@testing-library/jest-dom'
import { MeasurementService } from '../../../services/measurement.service'
import { IngredientService } from '../../../services/ingredient.service'
import { act, render, screen } from '@testing-library/react'
import IngredientContainer from '../../../components/forms/IngredientContainer'

jest.mock('../../../services/measurement.service')
const mockedMeasurementService = MeasurementService as jest.Mocked<
  typeof MeasurementService
>

jest.mock('../../../services/ingredient.service')
const mockedIngredientService = IngredientService as jest.Mocked<
  typeof IngredientService
>

describe('ingredient container form component', () => {
  mockedMeasurementService.getAllMeasurements.mockResolvedValue([
    { id: 1, name: 'measurement 1' },
    { id: 2, name: 'measurement 2' },
  ])

  mockedIngredientService.getAllIngredients.mockResolvedValue([
    { id: 1, name: 'Ingredient 1' },
    { id: 2, name: 'Ingredient 2' },
  ])

  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(
        <IngredientContainer
          index={0}
          isMobile={false}
          info={{ quantity: null, measurement_id: null, ingredient_id: null }}
          onChange={jest.fn()}
          onRemove={jest.fn()}
        />
      )
    })

    expect(screen.getAllByText('Ingrediente').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Unidad').length).toBeGreaterThan(0)
  })
})
