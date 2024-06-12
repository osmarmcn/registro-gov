
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const CryptoJS = require('crypto-js')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'registro'
})

db.connect((err) => {
    if (err) {
        console.error(`Erro ao conectar ao banco de dados: ${err.stack}`)
        return;
    }
    console.log('Conexão com o banco de dados bem-sucedida!')
});

const decryptData = (encryptedData, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}


app.post('/pages/cadastro', (req, res) => {
    try {
        const { data, key } = req.body

        // Corrigindo os nomes das colunas para corresponder à estrutura da tabela
        const sql = "INSERT INTO registros (dadosCriptografados, chaveCriptografia) VALUES (?, ?)"
        const values = [data, key]

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' })
            }
            res.status(200).json(result)
        })
    } catch (error) {
        console.error('Erro ao processar dados:', error)
        res.status(500).json({ error: 'Erro ao processar dados' })
    }
})





// Acessar o login
app.post('/pages/login', (req, res) => {
    const { cpf, senha } = req.body
    const sql = "SELECT dadosCriptografados, chaveCriptografia FROM registros"

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json('error')
        }

        let loginSucesso = false

        for (let i = 0; i < data.length; i++) {
            const secretKey = data[i].chaveCriptografia;
            const decryptedData = decryptData(data[i].dadosCriptografados, secretKey)

            if (decryptedData && decryptedData.cpf === cpf && decryptedData.senha === senha) {
                loginSucesso = true
                console.log('Login bem-sucedido')
                return res.status(200).json('sucesso')
            }
        }

        if (!loginSucesso) {
            console.log('Login falhou');
            return res.status(401).json('erro')
        }
    })
});

// Verificar se o CPF já está cadastrado
app.post('/pages/verificar-cpf', (req, res) => {
    const { cpf } = req.body
    const sql = "SELECT dadosCriptografados, chaveCriptografia FROM registros"

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao verificar CPF' })
        }

        let cpfEncontrado = false

        for (let i = 0; i < data.length; i++) {
            const secretKey = data[i].chaveCriptografia
            const decryptedData = decryptData(data[i].dadosCriptografados, secretKey)

            // Adicionar log para verificar os dados descriptografados
            console.log('Decrypted Data:', decryptedData)

            if (decryptedData && decryptedData.cpf === cpf) {
                cpfEncontrado = true;
                return res.status(200).json({ existe: true })
            }
        }

        if (!cpfEncontrado) {
            return res.status(200).json({ existe: false })
        }
    });
});

app.listen(8081, () => {
    console.log('funcionando')
})

