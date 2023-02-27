import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ padding: '8px', marginTop: '10px', color: "#2C3333", fontSize: "30Px", textAlign: "center" }}>
        <div>Not Found</div>
        <Link to='/login'>Login</Link>
    </div>
  )
}

export default NotFound