import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import FooterButtons from './FooterButtons'

describe('FooterButtons', () => {
  it('renders Cancel and Save buttons', () => {
    const { getByText } = render(<FooterButtons handleSave={() => {}} setFrequency={() => {}} setShowFooter={() => {}} />)
    
    expect(getByText('Cancel')).toBeInTheDocument()
    expect(getByText('Save')).toBeInTheDocument()
  })

  it('calls setFrequency with empty string and setShowFooter with false when Cancel button is clicked', () => {
    const setFrequency = jest.fn()
    const setShowFooter = jest.fn()
    const { getByText } = render(
      <FooterButtons
        handleSave={() => {}}
        setFrequency={setFrequency}
        setShowFooter={setShowFooter}
      />
    )

    fireEvent.click(getByText('Cancel'))
    
    expect(setFrequency).toHaveBeenCalledWith('')
    expect(setShowFooter).toHaveBeenCalledWith(false)
  })

  it('calls handleSave when Save button is clicked', () => {
    const handleSave = jest.fn()
    const { getByText } = render(
      <FooterButtons
        handleSave={handleSave}
        setFrequency={() => {}}
        setShowFooter={() => {}}
      />
    )

    fireEvent.click(getByText('Save'))
    
    expect(handleSave).toHaveBeenCalled()
  })
})
