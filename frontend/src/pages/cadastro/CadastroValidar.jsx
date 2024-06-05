export const CadastroValidar = (values) => {
    let errors = {};

    const email_val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senha_val = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;

    if (!values.nome) {
        errors.nome = 'Campo obrigatório';
    }

    if (!values.email) {
        errors.email = 'Campo obrigatório';
    } else if (!email_val.test(values.email)) {
        errors.email = 'Email inválido';
    }

    const senha = String(values.senha || '').trim();
    if (!senha) {
        errors.senha = 'Campo obrigatório';
    } else if (!senha_val.test(senha)) {
        errors.senha = 'A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula e um número.';
    }

    const confirmarSenha = String(values.confirmarsenha || '').trim();
    if (!confirmarSenha) {
        errors.confirmarsenha = 'Campo obrigatório';
    } else if (confirmarSenha !== senha) {
        errors.confirmarsenha = 'As senhas não coincidem';
    }


    if (!values.telefone || values.telefone.trim() === '') {
        errors.telefone = 'Campo obrigatório';
    } else if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(values.telefone)) {
        errors.telefone = 'Telefone inválido';
    }
    
    if (!values.idade || values.idade.trim() === '') {
        errors.idade = 'Campo obrigatório';
    } else if (isNaN(values.idade)) {
        errors.idade = 'Idade inválida';
    }

    if (!values.cpf || values.cpf.trim() === '') {
        errors.cpf = 'Campo obrigatório';
    } else if (!/^\d{11}$/.test(values.cpf)) {
        errors.cpf = 'CPF inválido';
    }

    if (!values.cep || values.cep.trim() === '') {
        errors.cep = 'Campo obrigatório';
    } else if (!/^\d{5}-\d{3}$/.test(values.cep)) {
        errors.cep = 'CEP inválido';
    }

    return errors;
};

// export const CadastroValidar = (values) => {
//     let error = {}

//     const email_val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     const senha_val = /^(?=.*\d)(?=.*[a-z])(?=.*)[0-9a-zA-Z$*&@#]{8,}$/

//     if(values.nome === ''){
//         error.nome = 'Campo obrigatório'
//     }
        
//     else{
//         error.nome = ''
        
//     }


//     if(values.email === ''){
//         error.email = 'Campo obrigatório'
//     }
        
//     else if(!email_val.test(values.email)){
//             error.email = 'Campo obrigatório'
        
//     }else{
//         error.email = ''
        
//     }



//     // Verificação do campo 'senha'
//     const senha = String(values.senha || '').trim()
//     if (!senha) {
//         error.senha = 'Campo obrigatório'
//     } else if (!senha_val.test(senha)) {
//         error.senha = 'A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula e um número.'
//     }

//     // Verificação do campo 'confirmarSenha'
//     const confirmarSenha = String(values.confirmarSenha || '').trim()
//     if (!confirmarSenha) {
//         error.confirmarSenha = 'Campo obrigatório'
//     } else if (confirmarSenha !== senha) {
//         error.confirmarSenha = 'As senhas não coincidem'
//     }

//     // Se não houverem erros, adicionar uma mensagem de sucesso
//     if (Object.keys(error).length === 0) {
//         error.sucesso = 'Cadastro realizado com sucesso!'
//     }


//     // if(values.senha === ''){
//     //         error.senha = 'Campo obrigatório'
//     // }
        
//     // else if(!senha_val.test(values.senha)){
//     //     error.senha = 'Campo obrigatório'
        
//     // }else{
//     //     error.senha = ''
//     // }


//     // if(values.confirmarsenha === ''){
//     //     error.confirmarsenha = 'Campo obrigatório'
//     // }
    
//     // else if(values.confirmarsenha!== senha_val.test(values.senha)){
//     //     error.confirmarsenha = 'Campos diferentes'
//     // }
    
//     // else{
//     //     error.confirmarsenha = ''
//     // }
        
//     return error
// }
