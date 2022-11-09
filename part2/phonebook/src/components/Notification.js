import React from 'react'

const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    if (messageType.includes('red')) {
        return (
            <div className='error'>
                {message}
            </div>
        )
    } else {
        return (
            <div className='success'>
                {message}
            </div>
        )
    }
}

export default Notification