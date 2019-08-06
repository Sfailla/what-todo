import React from 'react'

const styleDiv = {
    position: 'absolute', 
    top: '50%', 
    left: '50%',        
    transform: 'translate(-50%, -50%)', 
    lineHeight: '1.7'
}

const styleA = {
    display: 'block', 
    textAlign: 'center',
    textDecoration: 'none'
}

const NotFoundPage = () => (
    <div style={styleDiv}>
        <h1 style={{textAlign: 'center'}}>404</h1>
        <h1>Sorry Page Not Found</h1>
        <a href="/" style={styleA}>go back</a>
    </div>
)

export default NotFoundPage