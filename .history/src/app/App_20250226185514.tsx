import './styles/index.css'
import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import { Button } from '@/shared/ui/button'
import Store


createRoot(document.getElementById('root')!).render(
    <StoreProvider>
      <>
        <AppRoutes/>
        <Button variant="default" className='cursor-pointer'>Button</Button>
      </>
    </StoreProvider>
    
)
