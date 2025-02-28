import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import './styles/index.css'


createRoot(document.getElementById('root')!).render(
  <>
    <AppRoutes/>
  </>
)
