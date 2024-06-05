import { Cadastro } from "./pages/cadastro/Cadastro"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { Login } from "./pages/login/Login"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateRoute from "./pages/rotaPrivada/PrivateRoute"




function App() {
 

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
