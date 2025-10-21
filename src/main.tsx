import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import BreadcrumbNav from './components/BreadCrumbNav.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {!['/', '/sign-in', '/sign-up'].includes(window.location.pathname) && <BreadcrumbNav />}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
