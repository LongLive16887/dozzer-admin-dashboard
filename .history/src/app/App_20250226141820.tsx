import './styles/index.css'
import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import { Button } from '@/shared/ui/button'



createRoot(document.getElementById('root')!).render(
  <>
    <AppRoutes/>
    <Button variant="outline">Button</Button>

  </>
)
