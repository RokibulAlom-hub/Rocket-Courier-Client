import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tailwind from './Tailwind'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tailwind></Tailwind>
  </StrictMode>,
)
