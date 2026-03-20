import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import Admin from './Admin.jsx'
import CategoryPage from './CategoryPage.jsx'
import HowItWorks from './HowItWorks.jsx'
import OurMission from './OurMission.jsx'
import RootLayout from './RootLayout.jsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/category/:category', element: <CategoryPage /> },
      { path: '/how-it-works', element: <HowItWorks /> },
      { path: '/our-mission', element: <OurMission /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
