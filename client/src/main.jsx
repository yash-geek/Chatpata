import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <CssBaseline />
      <div onContextMenu={(e) => e.preventDefault()}
        style={{
          boxSizing: 'border-box', 
          width: '100vw', 
          height: '100vh', 
        }}
        >
        <App />
      </div>
    </HelmetProvider>
  </StrictMode>,
)
