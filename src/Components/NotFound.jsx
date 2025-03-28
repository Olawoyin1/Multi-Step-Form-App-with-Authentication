import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <div className="container2">
            <div className="error d-flex align-items-center justify-content-center flex-column gap-3">
                <h1 className='fw-bold'>404 Not Found</h1>
                <p className='text-center'>Your visited page not found. You may go home page.</p>
                <Link to="/" className='nav-link main-btn'>Back to home page</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound