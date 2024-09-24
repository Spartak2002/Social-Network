import { useNavigate } from "react-router-dom"
import { handleLogout } from "../../lib/api"

export const Logout = () => {
    const navigate = useNavigate()
    const onSubmit = () => {
        handleLogout()
            .then(response => {
                if (response.status === 'error' && response.message) {
                    console.error(response.message)
                } else {
                    console.log('User logged out successfully')
                    navigate('/login')
                }
            })
    }
    return <>
        <button onClick={onSubmit}>Logout</button>
    </>
}