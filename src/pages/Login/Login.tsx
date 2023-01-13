import { Typography, Container, Box, Button, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, InputLabel } from '@mui/material'
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUser } from '../../utils/interfaces';
import logoDbc from '../../assets/logo-white.webp'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {

  const { handleLogin } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>({
    // resolver: yupResolver(UserAuthSchema),
  })
  
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Box sx={{ height: '100vh', width: '100%', backgroundColor: '#1E62FE' }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ mb: 3 }}>
            <img src={logoDbc} alt="" width="250px" />
          </Box>
          <Box
            boxShadow={3}
            borderRadius={'8px'}
            sx={{
              p: 3,
              width: '100%',
              height: '400px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: 'center' }}
            >
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit((data: IUser) => handleLogin(data))}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="Email"
                autoFocus
                {...register('username')}
              />

              <FormControl
                variant="outlined"
                sx={{ mb: 1, mt: 2, width: '100%' }}
              >
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  {...register('password')}
                  required
                  fullWidth
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
                {/* {errors.password && (
                  <span

                    id="login-error-senha"
                  >
                    {errors.password.message}
                  </span>
                )} */}
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
