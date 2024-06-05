

import { useState } from 'react';
import { createRoot } from 'react-dom/client';

import './Cadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import { CadastroValidar } from './CadastroValidar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';


import axios from 'axios';
import { CadastroPdf } from '../pdf/CadastroPdf';

export const Cadastro = () => {
  const [values, setValues] = useState({
    nome: '',
    email: '',
    idade: '',
    cpf: '',
    cep: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    senha: '',
    confirmarsenha: '',
    sexo: 'homem',
    estadoCivil: 'solteiro',
    rendaFamiliar: 'Até 02 salários mínimos', 
    pessoasEmCasa: 'moro sozinho', 
    escolaridade: 'ensino fundamental completo',
    despesasMensais: 'gastos até R$ 500,00', 
    raca: 'branca', 
    filhos: 'nenhum', 
    profissao: 'empregado' 
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === 'cpf' || name === 'idade' || name === 'telefone') {
      if (value === '' || /^[0-9\b]+$/.test(value)) {
        setValues(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setValues(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCepChange = async (event) => {
    const { value } = event.target;
    const formattedCep = codeCep(value);
    setValues(prev => ({ ...prev, cep: formattedCep }));

    const cleanCep = formattedCep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValues(prev => ({
            ...prev,
            endereco: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }));
        } else {
          setValues(prev => ({
            ...prev,
            endereco: '',
            bairro: '',
            cidade: '',
            estado: ''
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const codeCep = (value) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
  };

  const foneEvent = (event) => {
    const { value } = event.target;
    const formattedPhone = codeFone(value);
    setValues(prev => ({ ...prev, telefone: formattedPhone }));
  };

  const codeFone = (value) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const handleCpfVerificar = () => {
    const { cpf } = values;
    if (cpf.length === 11) {
      axios.post('http://localhost:8081/pages/verificar-cpf', { cpf })
        .then(res => {
          if (res.data.existe) {
            setErrors(prev => ({ ...prev, cpf: 'CPF já cadastrado' }));
          }
        })
        .catch(err => console.log(err));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    const secretKey = uuidv4()

    // Criptografar dados
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(values), secretKey).toString()

    const validationErrors = CadastroValidar(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
       
        const res = await axios.post('http://localhost:8081/pages/cadastro', { data: encryptedData, key: secretKey });
        console.log(res)

        await generatePdf();

        navigate('/');
        // const res = await axios.post('http://localhost:8081/pages/cadastro', values);
        // console.log(res);

        
        // await generatePdf();

        // navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };


  // const generatePdf = async () => {
  //   const pdfContainer = document.createElement('div');
  //   pdfContainer.style.position = 'absolute';
  //   pdfContainer.style.top = '-9999px';
  //   pdfContainer.style.left = '-9999px';
  //   pdfContainer.style.width = '210mm';
  //   pdfContainer.style.minHeight = 'auto';
  //   document.body.appendChild(pdfContainer);

  //   const root = createRoot(pdfContainer);
  //   root.render(<CadastroPdf data={values} />);

  //   await new Promise(resolve => setTimeout(resolve, 1000)); // Espera para garantir a renderização

  //   const pdf = new jsPDF('p', 'mm', 'a4');
  //   const pageHeight = pdf.internal.pageSize.getHeight();
  //   const pageWidth = pdf.internal.pageSize.getWidth();

  //   const canvas = await html2canvas(pdfContainer, { scale: 2 });
  //   const imgData = canvas.toDataURL('image/png');
  //   const imgWidth = pageWidth;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   let heightLeft = imgHeight;
  //   let position = 0;

  //   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //   heightLeft -= pageHeight;

  //   while (heightLeft > 0) {
  //     position = heightLeft - imgHeight;
  //     pdf.addPage();
  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //   }

  //   pdf.save('cadastro.pdf');

  //   root.unmount(); // Desmonta o componente do React
  //   document.body.removeChild(pdfContainer); // Remove o container do DOM após a captura
  // };


  const generatePdf = async () => {
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.top = '-9999px';
    pdfContainer.style.left = '-9999px';
    document.body.appendChild(pdfContainer);

    const root = createRoot(pdfContainer);
    root.render(<CadastroPdf data={values} />);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const canvas = await html2canvas(pdfContainer, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    pdf.save('cadastro.pdf');

    root.unmount(); 
    document.body.removeChild(pdfContainer); 
  };


  

  return (
    <section className="container">
      <form id="formdados" onSubmit={handleSubmit}>
        <h2>Dados Pessoais</h2>

        <div className="formbox">
          <label htmlFor="nome">Nome</label>
          <input type="text" placeholder="digite seu nome" name="nome" id="nome" value={values.nome} onChange={handleInput} />
          {errors.nome && <span className='res'>{errors.nome}</span>}
        </div>

        <div className="formbox">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="digite seu email" name="email" id="email" value={values.email} onChange={handleInput} />
          {errors.email && <span className='res'>{errors.email}</span>}
        </div>

        <div className="formbox">
          <label htmlFor="idade">Idade</label>
          <input type="text" placeholder="digite sua idade" name="idade" maxLength='3' value={values.idade} onChange={handleInput} id="idade" />
          {errors.idade && <span className='res'>{errors.idade}</span>}
        </div>

        <div className="formbox">
          <label htmlFor="cpf">CPF</label>
          <input type="text" placeholder="digite seu cpf" name="cpf" maxLength="11" value={values.cpf} onChange={handleInput} onBlur={handleCpfVerificar} id="cpf" />
          {errors.cpf && <span className='res'>{errors.cpf}</span>}
        </div>

        <div className="formbox">
          <label htmlFor="cep">CEP</label>
          <input type="text" placeholder="digite seu cep" name="cep" value={values.cep} onChange={handleCepChange} maxLength="9" id="cep" />
          {errors.cep && <span className='res'>{errors.cep}</span>}
        </div>

        <div className="formbox">
          <label htmlFor="endereco">Endereço</label>
          <input type="text" placeholder="digite seu endereço" name="endereco" value={values.endereco} onChange={handleInput} id="endereco" />
        </div>

        <div className="formbox">
          <label htmlFor="bairro">Bairro</label>
          <input type="text" placeholder="digite seu Bairro" name="bairro" value={values.bairro} onChange={handleInput} id="bairro" />
        </div>

        <div className="formbox">
          <label htmlFor="cidade">Cidade</label>
          <input type="text" placeholder="digite sua cidade" name="cidade" value={values.cidade} onChange={handleInput} id="cidade" />
        </div>

        <div className="formbox">
          <label htmlFor="estado">Estado</label>
          <input type="text" placeholder="digite seu estado" name="estado" value={values.estado} onChange={handleInput} id="estado" />
        </div>

        <div className="formbox">
          <label htmlFor="numero">Número</label>
          <input type="text" placeholder="digite seu numero" name="numero" value={values.numero} onChange={handleInput} id="numero" />
        </div>

        <div className="formbox">
          <label htmlFor="telefone">Telefone</label>
          <input type="text" placeholder="digite seu telefone" name="telefone" maxLength="15" value={values.telefone} onChange={foneEvent} id="telefone" />
          {errors.telefone && <span className='res'>{errors.telefone}</span>}
        </div>

        <div className="formbox">
          <label htmlFor="senha">Senha</label>
          <input type="password" placeholder="digite sua senha" name="senha" minLength="6" value={values.senha} onChange={handleInput} id="senha" />
          {errors.senha && <span className='res'>{errors.senha}</span>}
        </div>

        <div className="formbox">
          <label htmlFor="confirmarsenha">Confirme a Senha</label>
          <input type="password" placeholder="Confirme sua senha" name="confirmarsenha" minLength="6" value={values.confirmarsenha} onChange={handleInput} id="confirmarsenha" />
          {errors.confirmarsenha && <span className='res'>{errors.confirmarsenha}</span>}
        </div>

        <div className="formbox">
          <fieldset>
            <legend>Sexo</legend>
            <div className="formradio">
              <input type="radio" name="sexo" value="homem" checked={values.sexo === 'homem'} onChange={handleChange} />
              <label htmlFor="homem">homem</label>
            </div>
            <div className="formradio">
              <input type="radio" name="sexo" value="mulher" checked={values.sexo === 'mulher'} onChange={handleChange} />
              <label htmlFor="mulher">Mulher</label>
            </div>
            <div className="formradio">
              <input type="radio" name="sexo" value="outros" checked={values.sexo === 'outros'} onChange={handleChange} />
              <label htmlFor="outros">Outros</label>
            </div>
          </fieldset>
        </div>

        <h2>Formulário socioeconômico</h2>

        <div className="formbox">
          <label htmlFor="estadoCivil">Estado civil</label>
          <select name="estadoCivil" value={values.estadoCivil} onChange={handleChange}>
            <option value="solteiro">solteiro</option>
            <option value="casado">casado</option>
            <option value="divorciado">divorciado</option>
            <option value="uniao estavel">união estável</option>
            <option value="viuvo ou viuva">viúvo ou viúva</option>
          </select>
        </div>

        <div className="formbox">
          <label htmlFor="rendaFamiliar">Renda familiar</label>
          <select name="rendaFamiliar" value={values.rendaFamiliar} onChange={handleChange}>
            <option value="menos de salário mínimo">menos de salário mínimo</option>
            <option value="Até 01 salário mínimo">Até 01 salário mínimo</option>
            <option value="Até 02 salários mínimos">Até 02 salários mínimos</option>
            <option value="de 03 até 05 salários mínimos">de 03 até 05 salários mínimos</option>
            <option value="de 05 até 08 salários mínimos">de 05 até 08 salários mínimos</option>
            <option value="Superior a 08 salários mínimos">Superior a 08 salários mínimos</option>
          </select>
        </div>

        <div className="formbox">
          <label htmlFor="pessoasEmCasa">Quantas pessoas moram em sua casa? (incluindo você)</label>
          <select name="pessoasEmCasa" value={values.pessoasEmCasa} onChange={handleChange}>
            <option value="moro sozinho">moro sozinho</option>
            <option value="01 pessoa">01 pessoa</option>
            <option value="02 pessoas">02 pessoas</option>
            <option value="03 pessoas">03 pessoas</option>
            <option value="mais de 03 pessoas">mais de 03 pessoas</option>
          </select>
        </div>

        <div className="formbox">
          <label htmlFor="escolaridade">Nível de escolaridade</label>
          <select name="escolaridade" value={values.escolaridade} onChange={handleChange}>
            <option value="ensino fundamental completo">ensino fundamental completo</option>
            <option value="ensino fundamental incompleto">ensino fundamental incompleto</option>
            <option value="ensino medio completo">ensino médio completo</option>
            <option value="ensino medio incompleto">ensino médio incompleto</option>
            <option value="ensino superior completo">ensino superior completo</option>
            <option value="ensino superior incompleto">ensino superior incompleto</option>
            <option value="pós-graduação ou MBA">pós-graduação ou MBA</option>
            <option value="mestrado">mestrado</option>
            <option value="doutorado">doutorado</option>
          </select>
        </div>

        <div className="formbox">
          <label htmlFor="despesasMensais">Despesas mensais</label>
          <select name="despesasMensais" value={values.despesasMensais} onChange={handleChange}>
            <option value="gastos até R$ 500,00">gastos até R$ 500,00</option>
            <option value="gastos até R$ 999,00">gastos até R$ 999,00</option>
            <option value="gastos entre R$ 1000,00 a R$ 1999,00">gastos entre R$ 1000,00 a R$ 1999,00</option>
            <option value="gastos entre R$ 2000,00 a R$ 2999,00">gastos entre R$ 2000,00 a R$ 2999,00</option>
            <option value="gastos superiores a R$ 4000,00">gastos superiores a R$ 4000,00</option>
          </select>
        </div>

        <div className="formbox">
          <label htmlFor="autoDeclaracao">Auto declaração</label>
          <select name="autoDeclaracao" value={values.raca} onChange={handleChange}>
            <option value="branca">branca</option>
            <option value="indigina">indígena</option>
            <option value="preta">preta</option>
            <option value="parda">parda</option>
            <option value="amarela">amarela</option>
          </select>
        </div>

        <div className="formbox">
          <label htmlFor="possuiFilhos">Possui filhos?</label>
          <select name="possuiFilhos" value={values.filhos} onChange={handleChange}>
            <option value="nenhum">nenhum</option>
            <option value="um">um</option>
            <option value="dois">dois</option>
            <option value="tres">três</option>
            <option value="mais de tres">mais de três</option>
          </select>
        </div>

        <div className="formbox">
          <label htmlFor="atividadeFuncao">Atividade/Função</label>
          <select name="atividadeFuncao" value={values.profissao} onChange={handleChange} >
            <option value="empregado">empregado</option>
            <option value="desempregado">desempregado</option>
            <option value="autonomo">autônomo</option>
            <option value="estudante">estudante</option>
            <option value="aposentado">aposentado</option>
          </select>
        </div>

        <input type="submit" id="enviar" value="Cadastrar" />
      </form>
      <div className="voltar">
         <Link to='/'>Pagina inicial</Link>
     </div>
    </section>
  );
};


