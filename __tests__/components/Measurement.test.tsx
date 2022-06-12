import '@testing-library/jest-dom'
import { MeasurementService } from '../../services/measurement.service'
import { act, render, screen, fireEvent } from '@testing-library/react'
import MeasurementSelector from '../../components/measurements/Measurement'

jest.mock('../../services/measurement.service')
const mockedMeasurementService = MeasurementService as jest.Mocked<
  typeof MeasurementService
>

describe('measurement form component', () => {
  mockedMeasurementService.getAllMeasurements.mockResolvedValue([
    { id: 1, name: 'measurement 1' },
    { id: 2, name: 'measurement 2' },
  ])

  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(
        <MeasurementSelector
          initialId={1}
          onSelectionChange={jest.fn()}
          isMobile={false}
        />
      )
    })

    expect(screen.getAllByText('Unidad')[0]).toBeInTheDocument()
  })

  test('clicking in the form open arrow displays the measurement options', async () => {
    await act(async () => {
      render(
        <MeasurementSelector
          initialId={1}
          onSelectionChange={jest.fn()}
          isMobile={false}
        />
      )
    })

    fireEvent.click(screen.getByLabelText('Open'))

    expect(screen.getAllByRole('option').length).toBe(2)
    expect(screen.getByText('measurement 1')).toBeInTheDocument()
    expect(screen.getByText('measurement 2')).toBeInTheDocument()
  })
})
