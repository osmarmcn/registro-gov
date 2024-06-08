# 📋 Cadastro-gov

![image](frontend/src/assets/tela-gov.png)

## 🚀 Overview 


Este projeto é um aplicativo web baseado em React, que pode ser utilizado no formato mobile ou desktop. Fornece uma interface de login que é visualmente atraente para os usuários cadastrarem suas informações e sua situação socioeconômica. Além disso, incluem login, cadastro e painel de controle cada uma oferecendo conteúdo e funcionalidades diferentes.


## 📋 Requirements

- Node.js (v12 ou posterior)
- npm (v6 ou posterior) ou fio (v1 ou posterior)

## 🔧 Installation

1. Clone o repositório:

```
git clone https://github.com/osmarmcn/registro-gov.git
```

2. Navegue até os diretórios do projeto:

```
cd backend
cd frontend
```


3. Instale as dependências no diretório backend e no frontend:

```
npm install

```


4. Execute o servidor de desenvolvimento no diretório backend:

```
npm start
```

5. Execute o projeto no diretório frotend:

```
npm run dev:mobile
```

## 🛠️ Project Structure

- Page.tsx: The main page component that manages the state of the current section and renders the corresponding components (Hero, About, Product, Contact) with transitions.
- components/Hero.tsx: The Hero section, featuring a welcoming interface with a background image and an embedded Spline design. It includes a button to navigate to the About section.
- components/About.tsx: The About section, providing information about the project or service. It includes buttons to navigate to the Hero and Product sections.
- components/Product.tsx: The Product section, showcasing the main products or services. It includes navigation to other sections.
- components/Contact.tsx: The Contact section, offering contact information or a form for users to reach out.

## 📄 License

- This project is licensed under the [MIT License](LICENSE).
