import { useState } from 'react'
import './App.css'
import AppRoutes from './routes'

function App() {
  const [count, setCount] = useState(0)

  const handleSet = () => {
    setCount((prev) => prev + 1);
  }

  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App
