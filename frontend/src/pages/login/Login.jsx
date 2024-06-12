
import { useEffect, useState } from 'react'
import './Login.css'
import { Link, useNavigate, } from 'react-router-dom'
import { LoginValidar } from './LoginValidar'
import axios from 'axios'


export const Login = () => {
    const [values, setValues] = useState({
        cpf: '',
        senha: ''
    })
    
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    // não permitir voltar a página principal sem logar
    useEffect( () =>{
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            navigate('/dashboard');
        }
    }, [navigate])

    const handleInput = (event) => {
        const { name, value } = event.target
        setValues(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        console.log('Valores submetidos:', values);
        const LoginErrors = LoginValidar(values);
        setErrors(LoginErrors);
    
        const loginData = {
            cpf: values.cpf,
            senha: values.senha
        };
    
        axios.post('http://192.168.18.22:8081/pages/login', loginData)
            .then(res => {
                console.log('Resposta do servidor:', res.data);
                if (res.data === 'sucesso') {
                    localStorage.setItem('authToken', 'someAuthToken');
                    navigate('/dashboard');
                } else {
                    alert('Erro ao logar');
                }
            })
            .catch(err => console.log(err));
    }

    

  return (
        <div className='box'>
            <span className="borderline"></span>
            <form id="form" onSubmit={handleSubmit}>
                <img src="gov.png" alt="" />
                <div className="inputbox">
                    <input type="text" name="cpf" id="usuario" onChange={handleInput} />
                    <span>usuário</span>
                    <i></i>
                    
                </div>
                {errors.email && <span className='res'>{errors.email}</span>}
                <div className="inputbox">
                    <input type="text" name="senha" id="ususenha" onChange={handleInput} />
                    <span>senha</span>
                    <i></i>
                </div>
                {errors.senha && <span className='res'>{errors.senha}</span>}
                <div className="links">
                    <a href="#">politica e privacidade</a>
                    <Link to='/cadastro'>cadastrar</Link>
                </div>
              
                <input type="submit" value="Login" id="logar"/>
            </form>
    </div>
  )
}





