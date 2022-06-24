import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import { MeasurementService } from '../../../services/measurement.service'
import { TagService } from '../../../services/tag.service'
import { IngredientService } from '../../../services/ingredient.service'
import NewRecipePage from '../../../pages/recipes/new'

const mockRouterPush = jest.fn()

jest.mock('next/router', () => {
  const originalModule = jest.requireActual('next/router')

  return {
    __esModule: true,
    ...originalModule,
    useRouter: () => {
      return { push: mockRouterPush }
    },
  }
})

jest.mock('../../../services/measurement.service')
const mockedMeasurementService = MeasurementService as jest.Mocked<
  typeof MeasurementService
>

jest.mock('../../../services/tag.service')
const mockedTagService = TagService as jest.Mocked<typeof TagService>

jest.mock('../../../services/ingredient.service')
const mockedIngredientService = IngredientService as jest.Mocked<
  typeof IngredientService
>

jest.mock('../../../services/recipe.service')

describe('recipe form component', () => {
  mockedMeasurementService.getAllMeasurements.mockResolvedValue([
    { id: 1, name: 'measurement 1' },
    { id: 2, name: 'measurement 2' },
  ])

  mockedTagService.getAllTags.mockResolvedValue([
    { id: 1, name: 'Tag 1' },
    { id: 2, name: 'Tag 2' },
  ])

  mockedIngredientService.getAllIngredients.mockResolvedValue([
    {
      id: 1,
      name: 'Ingredient 1',
    },
  ])

  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(<NewRecipePage isMobile={false} />)
    })

    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Descripción')).toBeInTheDocument()
    expect(screen.getByText('Privada')).toBeInTheDocument()
  })
})