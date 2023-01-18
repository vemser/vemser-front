import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'

import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'

import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import { Link, useNavigate } from 'react-router-dom'
import imgLogo from '../../assets/login-logo.png'

import { AuthContext } from '../../context/AuthContext'
import './Header.css'   
import { ListItemIcon } from '@mui/material'
import { Logout, PersonAdd, Settings } from '@mui/icons-material'

export const Header = () => {
  const { dadosUsuarioLogado, handleLogout, loggedUser, roles } =
    React.useContext<any>(AuthContext)

  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  useEffect(() => {
    loggedUser()
  }, [])

  const imagemBase = dadosUsuarioLogado.imagem
  const userEmail = localStorage.getItem('user')


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position="static"
      className={'header'}
      sx={{ backgroundColor: '#ffffff' }}
    >
      <Container maxWidth={false} className={'headerContainer'}>
        <Toolbar disableGutters className={'toolbar'}>
            <Box
              data-testid="id-logo"
              className={'logoImg'}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Link to="/acesso">
                <img src={imgLogo} alt="Logo DBC" />
              </Link>
            </Box>
          <Box
            className={'menuBurgerContainer'}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon className={'burgerIcon'} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
            </Menu>
          </Box>

          <Box
            className={'logoImg'}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <Link to="/acesso">
              <img src={imgLogo} alt="Logo DBC" />
            </Link>
          </Box>

          <Box
            className={'navbar'}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
          </Box>

          <Box className={'usuario'}>
            <Box className='nome-usuario' sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
              <h3 style={{ textTransform: 'capitalize' }}>{dadosUsuarioLogado.login?.replace('.', ' ')}</h3>
              <span>{dadosUsuarioLogado?.login}</span>
            </Box>

            <Tooltip title="Exibir detalhes">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {dadosUsuarioLogado.imagem === null ? (
                  <Avatar
                    alt={`${dadosUsuarioLogado.imagem}`}
                    src={dadosUsuarioLogado.imagem}
                  />
                ) : (
                  <img
                    data-testid="imagem-usuario"
                    alt=""
                    width={'250px'}
                    className={'BorderRadius'}
                    src={`data:image/png;base64, ${dadosUsuarioLogado.imagem}`}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              onClick={handleCloseUserMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => { navigate('/perfil') }}>
                {dadosUsuarioLogado.imagem === null ? (
                  <Avatar
                    alt={`${dadosUsuarioLogado.imagem}`}
                    src={dadosUsuarioLogado.imagem}
                  />
                ) : (
                  <img
                    data-testid="imagem-usuario"
                    alt=""
                    width={'20px'}
                    className={'minImg'}
                    src={`data:image/png;base64, ${dadosUsuarioLogado.imagem}`}
                  />
                )}
                Editar Perfil
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" fill={'red'} />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}