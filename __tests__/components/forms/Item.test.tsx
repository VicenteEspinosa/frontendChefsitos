import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import Item from '../../../components/forms/Item'

describe('item form component', () => {
  test('form gets rendered correctly', async () => {
    await act(async () => {
      render(
        <Item
          orderNumber={0}
          onChange={jest.fn()}
          onDelete={jest.fn()}
          onChangeForNextItem={jest.fn()}
          body={'Item'}
        />
      )
    })

    expect(screen.getByText('Item')).toBeInTheDocument()
    expect(screen.getByText('1.')).toBeInTheDocument()
  })
})
