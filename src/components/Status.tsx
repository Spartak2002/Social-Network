import { useState } from 'react'
import publicLock from '../assets/827747.png Public.png'
import privateLock from '../assets/827766.png Priwate.png'
import { IStatus } from '../lib/types'
import { handleStatusChange } from '../lib/api'

export const Status = ({ user }: { user: IStatus }) => {
    const [isPrivate, setIsPrivate] = useState(user.isPrivate)

    const toggle = async () => {
        const newStatus = isPrivate ? 'public' : 'private'
        setIsPrivate(!isPrivate)
        const response = await handleStatusChange()
        if (response.status === 'ok') {
            console.log(`Status updated to: ${newStatus}`)
        } else {
            console.error(response.message)
        }
    }

    return (
        <>
            <h3>Status</h3>
            <img
                src={isPrivate ? privateLock : publicLock}
                alt={isPrivate ? 'Private' : 'Public'}
                onClick={toggle}
                style={{ cursor: 'pointer', width: '50px', height: '50px' }}
            />
            <p>Your current status is {isPrivate ? 'Private' : 'Public'}</p>
        </>
    )
}
