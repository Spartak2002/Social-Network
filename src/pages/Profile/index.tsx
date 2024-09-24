import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { handleLogout, handleVerify } from "../../lib/api"
import { IWideUser } from "../../lib/types"

export const Profile = () => {
    // const location = useLocation()
    // console.log(location);

    const [account, setAccount] = useState<IWideUser | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        handleVerify()
            .then(response => {
                if (!response.user) {
                    navigate('/login')
                } else {
                    setAccount(response.user)
                }
            })
    }, [])

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

    return account && <>
        <nav>
            <NavLink to='/profile' end>Profile </NavLink>
            <NavLink to='profile/settings'>Settings </NavLink>
            <NavLink to='profile/search'>Search </NavLink>
            <NavLink to='profile/posts'>Posts </NavLink>
            <NavLink to='profile/followers'>Followers </NavLink>
            <NavLink to='profile/followings'>Followings </NavLink>
            <button onClick={onSubmit}>Logout</button>
        </nav>

        <Outlet
            context={{ account, setAccount }}

        />
    </>
}