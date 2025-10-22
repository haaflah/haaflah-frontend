import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import BreadcrumbNav from './components/BreadCrumbNav.tsx'
import { AuthProvider } from './contexts/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {!['/', '/sign-in', '/sign-up', '/forgot-password'].includes(window.location.pathname) && <BreadcrumbNav />}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
