import React from 'react'

const Footer = () => {
    return (
        <div className='footer' >
            <footer style={{
                marginTop: 'calc(10% + 60px)',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                textAlign: "center",
                backgroundColor:'#212E52',
                color:'white' 
            }}>
                All Rights Reserverd &copy; Zensar Technologies
            </footer>
        </div>
    )
}

export default Footer