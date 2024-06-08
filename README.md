# 📋 Cadastro-gov

![image](frontend/src/assets/tela-gov.png)

## 🚀 Overview 

Este projeto é um aplicativo web baseado em React, que pode ser utlilizado da forma mobile ou desktop. Fornece uma interface de login que é visualmente atraente para os usuários cadastrarem suas informações e sua situação socioeconômica. As seções incluem login, cadastro e dashboard cada uma oferecendo conteúdo e funcionalidade diferentes.

## 📋 Requirements

- Node.js (v12 or later)
- npm (v6 or later) or yarn (v1 or later)

## 🔧 Installation

1. Clone the repository:

```
git clone https://github.com/osmarmcn/registro-gov.git
```

2. Navigate to the project directory:

```
cd backend
cd frontend
```

3. Install the dependencies:

```
npm install

```

4. Run the development server:

```
ng serve --open
```

## 🛠️ Project Structure

- Page.tsx: The main page component that manages the state of the current section and renders the corresponding components (Hero, About, Product, Contact) with transitions.
- components/Hero.tsx: The Hero section, featuring a welcoming interface with a background image and an embedded Spline design. It includes a button to navigate to the About section.
- components/About.tsx: The About section, providing information about the project or service. It includes buttons to navigate to the Hero and Product sections.
- components/Product.tsx: The Product section, showcasing the main products or services. It includes navigation to other sections.
- components/Contact.tsx: The Contact section, offering contact information or a form for users to reach out.

## 📄 License

- This project is licensed under the [MIT License](LICENSE).
