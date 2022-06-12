import '@testing-library/jest-dom'

import { act, fireEvent, render, screen } from '@testing-library/react'
import TagSelector from '../../components/tags/Tag'
import { TagService } from '../../services/tag.service'

jest.mock('../../services/tag.service')
const mockedTagService = TagService as jest.Mocked<typeof TagService>

describe('tag component', () => {
  mockedTagService.getAllTags.mockResolvedValue([
    {
      id: 1,
      name: 'Tag 1',
    },
    {
      id: 2,
      name: 'Tag 2',
    },
  ])

  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(<TagSelector isMobile={false} onSelectionChange={jest.fn()} />)
    })

    expect(screen.getAllByText('Tags')[0]).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  test('clicking in the form open arrow displays the tags options', async () => {
    await act(async () => {
      render(<TagSelector isMobile={false} onSelectionChange={jest.fn()} />)
    })

    fireEvent.click(screen.getByLabelText('Open'))

    expect(screen.getAllByRole('option').length).toBe(2)
    expect(screen.getByText('Tag 1')).toBeInTheDocument()
    expect(screen.getByText('Tag 2')).toBeInTheDocument()
  })
})
