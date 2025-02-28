import './styles/index.css'
import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from './providers/store-provider'


createRoot(document.getElementById('root')!).render(
    <StoreProvider>
      <>
        <AppRoutes/>
      </>
    </StoreProvider>
)
