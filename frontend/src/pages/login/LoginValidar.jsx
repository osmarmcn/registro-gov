
export const LoginValidar = (values) => {
    let error = {}

    // const email_val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const senha_val = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (!values.cpf || values.cpf.trim() === '') {
        error.cpf = 'Campo obrigatório';
    } else if (!/^\d{11}$/.test(values.cpf)) {
        error.cpf = 'CPF inválido';
    }

    if (!values.senha) {
        error.senha = 'Campo obrigatório'
    } else if (!senha_val.test(values.senha)) {
        error.senha = 'Senha deve ter no mínimo 8 caracteres, incluindo um número e uma letra maiúscula'
    }

    return error
}


