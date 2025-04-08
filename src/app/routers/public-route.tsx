import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'


export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSelector((state: RootState) => state.auth.token)
    console.log(accessToken)
    return accessToken ? <Navigate to="/" replace /> : <>{children}</>
}