import './styles/index.css'
import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'



createRoot(document.getElementById('root')!).render(
  <>
    <AppRoutes/>
  </>
)
