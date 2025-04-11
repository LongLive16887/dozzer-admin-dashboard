import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  useEffect(() => {
    if (!accessToken) {
      window.location.replace("/login");
    }
  }, [accessToken, navigate])

  if (!accessToken) {
    return null
  }

  return <>{children}</>
}
