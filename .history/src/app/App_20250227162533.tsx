import './styles/index.css'
import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import { StoreProvider,ThemeProvider } from './providers'
import { Toaster } from "sonner";


createRoot(document.getElementById('root')!).render(
    <StoreProvider>
      <ThemeProvider>
        
      <ThemeProvider/>
      <>
        <Toaster position="top-right" theme="system" />
        <AppRoutes/>
      </>
    </StoreProvider>
)
