import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Box>
      <div style={{ padding: '8px', marginTop: '10px', color: "#2C3333", fontSize: "30Px", textAlign: "center" }}>
        Not Found
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
    </Box>
  )
}

export default NotFound