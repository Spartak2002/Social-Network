import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { handleLogout, handleVerify } from "../../lib/api"
import { IWideUser } from "../../lib/types"
import { OwnNavLink } from "../../NavLink"

export const Profile = () => {

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
            <OwnNavLink to='/profile' end>Profile </OwnNavLink>
            <OwnNavLink to='profile/settings' end>Settings </OwnNavLink>
            <OwnNavLink to='profile/search' end>Search </OwnNavLink>
            <OwnNavLink to='profile/posts'>Posts </OwnNavLink>
            <OwnNavLink to='profile/followers'>Followers </OwnNavLink>
            <OwnNavLink to='profile/followings'>Followings </OwnNavLink>
            <button onClick={onSubmit}>Logout</button>
        </nav>

        <Outlet
            context={{ account, setAccount }}

        />
    </>
}