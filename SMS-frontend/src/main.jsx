import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
// 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
const GOOGLE_CLIENT_ID="1040411573504-8lcdvufvdarj69ujqb2qbc8a3h113c4j.apps.googleusercontent.com";
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>,
)
