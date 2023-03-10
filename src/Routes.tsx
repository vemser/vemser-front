import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AccessRoute } from './pages/PrivateRoute/PrivateRoute'
import { Acesso } from './pages/Acesso/Acesso'
import { Login } from './pages/Login/Login'
import { ToastContainer } from 'react-toastify'
import { Perfil } from './pages/Perfil/Perfil'
import 'react-toastify/dist/ReactToastify.css'
import 'nprogress/nprogress.css'

export const AppRoutes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
        <ToastContainer />
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route path='/' element={<Login />} />

                <Route path="/perfil" element={<AccessRoute />}>
                  <Route index element={<Perfil />} />
                </Route>


                <Route path='/acesso' element={<AccessRoute />}>
                    <Route index element={<Acesso/>} />
                </Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}
