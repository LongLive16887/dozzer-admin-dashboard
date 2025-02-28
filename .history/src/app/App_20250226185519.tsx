import './styles/index.css'
import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import { Button } from '@/shared/ui/button'
import { StoreProvider } from './providers/store-provider'


createRoot(document.getElementById('root')!).render(
    <StoreProvider>
      <>
        <AppRoutes/>
        <Button variant="default" className='cursor-pointer'>Button</Button>
      </>
    </StoreProvider>
)
