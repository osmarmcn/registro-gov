

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




// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// export const Dashboard = () => {
//     const navigate = useNavigate();
//     const [userInfo, setUserInfo] = useState({ nome: '', cpf: '' });

//     useEffect(() => {
//         const storedUserInfo = localStorage.getItem('userInfo');
//         if (storedUserInfo) {
//             setUserInfo(JSON.parse(storedUserInfo));
//         } else {
//             navigate('/');
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userInfo');
//         navigate('/');
//     };

//     return (
//         <section className='container-dash'>

//             <div className="text-title">
//                 <h1>Bem-vindo, {userInfo.nome}</h1>
//             </div>
            
//             <button onClick={handleLogout}>Logout</button>
//         </section >
//     );
// };



// import { useNavigate } from 'react-router-dom'

// export const Dashboard = () => {
//     const navigate = useNavigate()

//     const handleLogout = () => {
//         localStorage.removeItem('authToken')
//         navigate('/')
//     }

//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     )
// }

