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

