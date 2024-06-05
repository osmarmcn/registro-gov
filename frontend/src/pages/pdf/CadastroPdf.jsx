import './CadastroPdf.css'

export const CadastroPdf = ({ data }) => {
  return (
    <div className="container-pdf">
        <img src="gov.png" alt="" />
        <h1>Dados do Cadastro</h1>
        <div className="table">
            <table>
                <tbody>
                  <tr><th>Nome</th><td>{data.nome}</td></tr>
                  <tr><th>Email</th><td>{data.email}</td></tr>
                  <tr><th>Idade</th><td>{data.idade}</td></tr>
                  <tr><th>CPF</th><td>{data.cpf}</td></tr>
                  <tr><th>CEP</th><td>{data.cep}</td></tr>
                  <tr><th>Endereço</th><td>{data.endereco}</td></tr>
                  <tr><th>Bairro</th><td>{data.bairro}</td></tr>
                  <tr><th>Cidade</th><td>{data.cidade}</td></tr>
                  <tr><th>Estado</th><td>{data.estado}</td></tr>
                  <tr><th>Número</th><td>{data.numero}</td></tr>
                  <tr><th>Telefone</th><td>{data.telefone}</td></tr>
                  <tr><th>Sexo</th><td>{data.sexo}</td></tr>
                  <tr><th>Estado Civil</th><td>{data.estadoCivil}</td></tr>
                  <tr><th>Renda Familiar</th><td>{data.rendaFamiliar}</td></tr>
                  <tr><th>Pessoas em Casa</th><td>{data.pessoasEmCasa}</td></tr>
                  <tr><th>Escolaridade</th><td>{data.escolaridade}</td></tr>
                  <tr><th>Despesas Mensais</th><td>{data.despesasMensais}</td></tr>
                  <tr><th>Raça</th><td>{data.raca}</td></tr>
                  <tr><th>Filhos</th><td>{data.filhos}</td></tr>
                  <tr><th>Profissão</th><td>{data.profissao}</td></tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
