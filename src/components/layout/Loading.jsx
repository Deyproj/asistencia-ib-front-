import React from 'react'
import './Loading.css'

function Loading() {
    return (
        <>
        <div className='container principal '  style={{ display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
        <div className="spinner-border text-success " style={{ width: '5rem', height: '5rem' }} role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </div>
        </>
    )
}

export default Loading
