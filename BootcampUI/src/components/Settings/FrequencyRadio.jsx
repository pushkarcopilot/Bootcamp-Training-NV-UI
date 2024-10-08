import { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import FooterButtons from './FooterButtons'
import { Frequency } from '../../utils/enums'
import { saveEngagementSettings } from '../../API/Engagement.api'

const FrequencyRadio = () => {
  const [frequency, setFrequency] = useState('')
  const [showFooter, setShowFooter] = useState(false)

  const handleSave = async () => {
    try {
      await saveEngagementSettings({ backupFrequency: frequency })
    } catch (err) {
      console.error('An error occurred while saving Engagement setting', err)
    } finally {
      setShowFooter(false)
    }
  }

  return (
    <>
      <FormControl>
        <FormLabel id='frequency-radio-buttons-group-label'>
          Select Engagement Backup Frequency
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby='frequency-radio-buttons-group-label'
          name='frequency-radio-buttons-group'
          value={frequency}
        >
          {Object.entries(Frequency).map(([_, value]) => (
            <FormControlLabel
              value={value}
              control={
                <Radio
                  onClick={e => {
                    setFrequency(e.target.value)
                    setShowFooter(true)
                  }}
                />
              }
              label={value}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {showFooter && <FooterButtons handleSave={handleSave} setFrequency={setFrequency} setShowFooter={setShowFooter} />}
    </>
  )
}

export default FrequencyRadio
