import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api, authApi } from '../utils/api'
import { IAuthContext, IChildren, IUser, IUsuarioLogado, toastConfig } from '../utils/interfaces'
import axios from 'axios'

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: IChildren) => {
    const navigate = useNavigate()
    const [roles, setRoles] = useState<string[] | undefined>([]);
    const [dadosUsuarioLogado, setDadosUsuarioLogado] = useState<IUsuarioLogado | {}>({});
    const accessToken = localStorage.getItem('token')

    const parseJwt = async (token: any) => {
        try {
          let decodedJWT = JSON.parse(atob(token.split('.')[1]));
          let roleArray = decodedJWT.cargos;
          return roleArray;
    
        } catch (e) {
          return null;
        };
    };
    
    const loggedUser = async () => {
      try {
        authApi.defaults.headers.common['Authorization'] = accessToken;
        const { data } = await authApi.get('/usuario/logged-user');
        setDadosUsuarioLogado(data);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 403) {
          toast.error('Sessão expirada!');
          handleLogout();
        }
      };
    };

    const handleLogin = async (user: IUser) => {
        try {
    
          const { data } = await authApi.post('/usuario/login', user);
          authApi.defaults.headers.common['Authorization'] = data;
          localStorage.setItem('token', data);
          localStorage.setItem('user', user.username);
          let rolesArray = await parseJwt(localStorage.getItem('token'));
          setRoles(rolesArray);
    
          navigate('/acesso')
    
        } catch (error) {
          console.error(error);
    
          if (axios.isAxiosError(error) && error.response && error.response.data) {
            if (error.response.data.message) {
              toast.error(error.response.data.message);
            } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
              toast.error(error.response.data.errors.join("\n"));
            }
          } else {
            toast.error('Houve um erro no servidor, por favor tente novamente mais tarde.');
          }
        };
      };

      const handleLogout = async () => {
        navigate('/');
        setRoles(undefined);
        api.defaults.headers.common['Authorization'] = undefined;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    
      const refreshAuth = (token: string) => {
        let decodedJWT = JSON.parse(atob(token.split('.')[1]));
        let roleArray = decodedJWT.cargos;
        setRoles(roleArray)
      }


      // Atualizar foto do PRÓPRIO usuário
      const inserirFotoUsuario = async (data: any) => {
        try {
          authApi.defaults.headers.common['Authorization'] = accessToken
          await authApi.put(`/foto/upload-image-perfil`, data)
          loggedUser()
          toast.success('Foto de perfil alterada com sucesso', toastConfig)

        } catch (error) {
          toast.error('Houve algum error, tente novamente!', toastConfig)
          console.log(error)
        } 
      }



    return (
        <AuthContext.Provider value={{
            handleLogin,
            roles,
            handleLogout,
            dadosUsuarioLogado,
            loggedUser,
            refreshAuth,
            inserirFotoUsuario
        }}>
            {children}
        </AuthContext.Provider>
    )
}
