import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import './'


createRoot(document.getElementById('root')!).render(
  <>
    <AppRoutes/>
  </>
)
