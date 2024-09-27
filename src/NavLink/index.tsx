import React from 'react'
import { useLocation, Link } from 'react-router-dom'

interface NavLinkProps {
    to: string
    activeClassName?: string
    exact?: boolean
    end?: boolean
    children: React.ReactNode
}

export const OwnNavLink = ({ to, activeClassName = 'active', exact = false, end = false, children }: NavLinkProps) => {
    const { pathname } = useLocation()

    const isActive = exact
        ? pathname === to
        : end
            ? pathname === to
            : pathname.startsWith(to)

    const className = isActive ? activeClassName : ''

    return (
        <Link to={to} className={className}>
            {children}
        </Link>
    )
}
