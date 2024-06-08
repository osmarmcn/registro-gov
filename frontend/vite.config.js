import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Permite que o servidor seja acessível externamente
    port: 3000,
    // Caso necessário, ajuste os cabeçalhos CORS ou outras opções
    cors: true
  }

 
 
})
