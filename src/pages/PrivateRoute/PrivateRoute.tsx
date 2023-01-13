import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext'

const useAuth = () => {

    const { roles } = useContext(AuthContext);
    let userToken = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    let userRoles = parseJwt(userToken);

    if (user) {
        return {
            auth: true,
            authRoles: roles
        }
    } else {
        return {
            auth: false,
            authRoles: null
        }
    }
}


const parseJwt = async (token: any) => {
    try {
        let decodedJWT = JSON.parse(atob(token.split('.')[1]));
        let roleArray = decodedJWT.cargos;

        return roleArray;

    } catch (e) {
        return null;

    };
};


export const AccessRoute = () => {
    const { authRoles } = useAuth()
    let access = false

    authRoles?.includes('ROLE_ADMIN') ? access = true : access = false
    authRoles?.includes('ROLE_GESTAO_DE_PESSOAS') ? access = true : access = false
    authRoles?.includes('ROLE_INSTRUTOR') ? access = true : access = false
    authRoles?.includes('ROLE_ALUNO') ? access = true : access = false
    authRoles?.includes('ROLE_COLABORADORES') ? access = true : access = false
    authRoles?.includes('ROLE_GESTOR') ? access = true : access = false

    if (access = true) {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }
}