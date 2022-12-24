import React from 'react'
import { useAppContext } from '../context/appContext'

const Alert = () => {
    const { alertType, alertText } = useAppContext();
    return (
        <div className={ `alert alert-${ alertType }` }> { alertText || 'General Error' } </div>
    )
}

export default Alert