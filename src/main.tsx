import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Dashboard } from './pages/Profile/Dashboard'
import { Settings } from './pages/Profile/Settings/indexx'
import { Posts } from './pages/Profile/Posts'
import { Search } from './pages/Profile/Search'
import { Account } from './pages/Profile/IAccount'

const routes = createBrowserRouter([
  {
    path: '',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: 'profile',
    element: <Profile />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'profile/settings',
        element: <Settings />
      },
      {
        path: 'profile/posts',
        element: <Posts />
      },
      {
        path: 'profile/search',
        element: <Search />
      },
      {
        path: 'profile/:id',
        element: <Account />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}>
    </RouterProvider>
  </StrictMode>,
)
