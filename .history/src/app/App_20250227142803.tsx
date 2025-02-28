import './styles/index.css'
import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from './providers/store-provider'
import { Toaster } from "sonner";


createRoot(document.getElementById('root')!).render(
    <StoreProvider>
      <>
        <Toaster position="bottom-top" theme="system" />
        <AppRoutes/>
      </>
    </StoreProvider>
)
