import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { saveEngagementSettings } from '../../API/Engagement.api'
import { Frequency } from '../../utils/enums'
import FrequencyRadio from './FrequencyRadio'

jest.mock('../../API/Engagement.api', () => ({
  saveEngagementSettings: jest.fn(),
}))

describe('FrequencyRadio Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly', () => {
    render(<FrequencyRadio />)

    expect(screen.getByText('Select Engagement Backup Frequency')).toBeInTheDocument()
  })

  test('renders radio buttons with correct labels', () => {
    render(<FrequencyRadio />)

    Object.values(Frequency).forEach(value => {
      expect(screen.getByLabelText(value)).toBeInTheDocument()
    })
  })

  test('sets frequency and shows footer when a radio button is clicked', () => {
    render(<FrequencyRadio />)

    const radioButton = screen.getByLabelText(Object.values(Frequency)[0])
    fireEvent.click(radioButton)

    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  test('handles save button click and API call', async () => {
    render(<FrequencyRadio />)

    const radioButton = screen.getByLabelText(Object.values(Frequency)[0])
    fireEvent.click(radioButton)

    fireEvent.click(screen.getByText('Save'))

    await waitFor(() => {
      expect(saveEngagementSettings).toHaveBeenCalledWith({
        backupFrequency: Object.values(Frequency)[0],
      })
    })
  })

  test('hides footer after saving', async () => {
    render(<FrequencyRadio />)

    const radioButton = screen.getByLabelText(Object.values(Frequency)[0])
    fireEvent.click(radioButton)

    fireEvent.click(screen.getByText('Save'))

    await waitFor(() => {
      expect(screen.queryByText('Save')).not.toBeInTheDocument()
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    })
  })

  test('clears frequency and hides footer on cancel button click', () => {
    render(<FrequencyRadio />)

    const radioButton = screen.getByLabelText(Object.values(Frequency)[0])
    fireEvent.click(radioButton)

    fireEvent.click(screen.getByText('Cancel'))

    expect(screen.queryByText('Save')).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(Object.values(Frequency)[0])).toBeInTheDocument()
  })
})
