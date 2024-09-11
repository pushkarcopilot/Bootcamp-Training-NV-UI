import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const FooterButtons = ({ handleSave, setFrequency }) => (
  <Box
    style={{
      marginTop: 20,
    }}
  >
    <Button
      onClick={() => {
        setFrequency('')
      }}
      variant='outlined'
      color='error'
      size='small'
    >
      Cancel
    </Button>
    <Button
      style={{
        marginLeft: 10,
      }}
      onClick={handleSave}
      variant='outlined'
      color='success'
      size='small'
    >
      Save
    </Button>
  </Box>
)

export default FooterButtons
