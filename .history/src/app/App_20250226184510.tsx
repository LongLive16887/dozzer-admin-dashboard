import './styles/index.css'
import AppRoutes from './routers'
import { createRoot } from 'react-dom/client'
import { Button } from '@/shared/ui/button'
import { useGetCategoriesQuery } from '@/shared/api/categories'
import { useState } from 'react'


createRoot(document.getElementById('root')!).render(

  return(
    <>
      <AppRoutes/>
      <Button variant="default" className='cursor-pointer'>Button</Button>
    </>
  )
)
