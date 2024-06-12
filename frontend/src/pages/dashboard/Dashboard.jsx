

import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/')
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}




