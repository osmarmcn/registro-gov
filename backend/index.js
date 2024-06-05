
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

//são criptografados mas envia para o banco descriptografado

// Enviar cadastro
// app.post('/pages/cadastro', (req, res) => {
//     try {
//         const { data, key } = req.body;

//         // Inclua todos os campos obrigatórios no INSERT INTO registros
//         const sql = `INSERT INTO registros (
//             nome, email, idade, cpf, cep, endereco, bairro, cidade, estado, numero, telefone, senha, confirmarsenha,
//             sexo, estadoCivil, rendafamiliar, pessoasEmCasa, escolaridade, despesasMensais, raca, filhos, profissao,
//             dadosCriptografados, chaveCriptografia
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//         const decryptedData = decryptData(data, key);

//         const values = [
//             decryptedData.nome, decryptedData.email, decryptedData.idade, decryptedData.cpf, decryptedData.cep, 
//             decryptedData.endereco, decryptedData.bairro, decryptedData.cidade, decryptedData.estado, decryptedData.numero, 
//             decryptedData.telefone, decryptedData.senha, decryptedData.confirmarsenha, decryptedData.sexo, decryptedData.estadoCivil, 
//             decryptedData.rendafamiliar, decryptedData.pessoasEmCasa, decryptedData.escolaridade, decryptedData.despesasMensais, 
//             decryptedData.raca, decryptedData.filhos, decryptedData.profissao, data, key
//         ];

//         db.query(sql, values, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
//             }
//             res.status(200).json(result);
//         });
//     } catch (error) {
//         console.error('Erro ao processar dados:', error);
//         res.status(500).json({ error: 'Erro ao processar dados' });
//     }

// });

// app.post('/pages/login', (req, res) => {
//     const { cpf, senha } = req.body;
//     const sql = "SELECT * FROM registros";

//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json('error');
//         }
//         for (let i = 0; i < data.length; i++) {
//             const secretKey = data[i].chave;
//             const decryptedData = decryptData(data[i].data, secretKey);
//             if (decryptedData.cpf === cpf && decryptedData.senha === senha) {
//                 console.log('Login bem-sucedido');
//                 return res.status(200).json('sucesso');
//             }
//         }
//         console.log('Login falhou');
//         return res.status(401).json('erro');
//     });
// });

// app.post('/pages/verificar-cpf', (req, res) => {
//     const { cpf } = req.body;
//     const sql = "SELECT * FROM registros";

//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Erro ao verificar CPF' });
//         }
//         for (let i = 0; i < data.length; i++) {
//             const secretKey = data[i].chave;
//             const decryptedData = decryptData(data[i].data, secretKey);
//             if (decryptedData.cpf === cpf) {
//                 return res.status(200).json({ existe: true });
//             }
//         }
//         return res.status(200).json({ existe: false });
//     });
// });





//ANTES DE CRIPTOGRAFAR

// const express = require('express')
// const mysql = require('mysql')
// const cors = require('cors')
// const CryptoJS = require('crypto-js')



// const app = express()
// app.use(cors())
// app.use(express.json())

// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'123456',
//     database:'registro'
   
// })

// db.connect((err) => {
//     if (err) {
//         console.error(`Erro ao conectar ao banco de dados: ${err.stack}`)
//         return
//     }

//     console.log('Conexão com o banco de dados bem-sucedida!')
    
// })

// const decryptData = (encryptedData) => {
//     const secretKey = 'your-secret-key'; // Use a mesma chave secreta usada na criptografia
//     const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
// }

// // enviar cadastro

// app.post('/pages/cadastro', (req, res) =>{
//     const sql = "INSERT INTO registros (`nome`, `email`, `idade`, `cpf`, `cep`, `endereco`, `bairro`, `cidade`, `estado`, `numero`, `telefone`, `senha`, `confirmarsenha`, `sexo`, `estadoCivil`, `rendaFamiliar`, `pessoasEmCasa`, `escolaridade`, `despesasMensais`, `raca`, `filhos`, `profissao`) VALUES (?)"
//     const values = [
//         req.body.nome, 
//         req.body.email, 
//         req.body.idade,
//         req.body.cpf,
//         req.body.cep,
//         req.body.endereco,
//         req.body.bairro,
//         req.body.cidade,
//         req.body.estado,
//         req.body.numero,
//         req.body.telefone,
//         req.body.senha, 
//         req.body.confirmarsenha,
//         req.body.sexo,
//         req.body.estadoCivil,
//         req.body.rendaFamiliar,
//         req.body.pessoasEmCasa,
//         req.body.escolaridade,
//         req.body.despesasMensais,
//         req.body.raca,
//         req.body.filhos,
//         req.body.profissao
//     ]

//     console.log(values)

//     db.query(sql, [values], (err, data) => {
//         if (err) {
//             if (!res.headersSent) {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
//             } else {
//                 console.error('Cabeçalhos HTTP já foram enviados para o cliente');
//             }
//         } else {
//             if (!res.headersSent) {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.status(200).json(data);
//             } else {
//                 console.error('Cabeçalhos HTTP já foram enviados para o cliente');
//             }
//         }
//     })

// })

// // acessar o login

// app.post('/pages/login', (req, res) => {
//     console.log('Dados recebidos do cliente:', req.body)
//     const sql = "SELECT * FROM registros WHERE `cpf` = ? AND `senha` = ?"
//     console.log(sql)
//     db.query(sql, [req.body.cpf, req.body.senha], (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json('error')
//         }
//         if (data.length > 0) {
//             console.log('Login bem-sucedido')
//             return res.status(200).json('sucesso')
//         } else {
//             console.log('Login falhou')
//             return res.status(401).json('erro')
//         }
//     })
// })


// // Verificar se o CPF já está cadastrado
// app.post('/pages/verificar-cpf', (req, res) => {
//     const { cpf } = req.body;
//     const sql = "SELECT * FROM registros WHERE `cpf` = ?";

//     db.query(sql, [cpf], (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Erro ao verificar CPF' });
//         }
//         if (data.length > 0) {
//             return res.status(200).json({ existe: true });
//         } else {
//             return res.status(200).json({ existe: false });
//         }
//     });
// });

// app.listen(8081, () =>{
//     console.log('funcionando')
// })


