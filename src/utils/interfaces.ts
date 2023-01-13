export interface IUser {
    username: string;
    password: string;
}

export interface IChildren {
    children?: React.ReactNode
}

export interface IAuthContext {
    handleLogin: (user: IUser) => Promise<void>
    roles: string[] | undefined
    handleLogout: () => Promise<void>
    dadosUsuarioLogado: any
    loggedUser: () => Promise<void>
    refreshAuth: (token: string) => void
}

export const toastConfig: object = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
}

export interface IUsuarioLogado {
    cargos: any,
    email: string,
    idUsuario: number,
    imagem: any,
    nome: string,
    status: string
}
  