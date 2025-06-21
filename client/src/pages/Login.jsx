import React, { useState } from 'react'
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
  Box,
} from '@mui/material'
import { CameraAlt } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'
import { useFileHandler, useInputValidation } from '6pp'
import { userNameValidator } from '../utils/validators'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const toggleLogin = () => setIsLogin((prev) => !prev)

  const name = useInputValidation('')
  const bio = useInputValidation('')
  const username = useInputValidation('', userNameValidator)
  const password = useInputValidation('')

  const avatar = useFileHandler('single')

  const handleLogin = (e) => {
    e.preventDefault()
  }

  const handleSignUp = (e) => {
    e.preventDefault()
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(to bottom, #60a5fa, #facc15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ mt: 2, width: '100%' }}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>

                <Typography align="center" sx={{ py: 2 }}>
                  OR
                </Typography>

                <Button variant="text" fullWidth onClick={toggleLogin}>
                  Create Account
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h5">Create Account</Typography>

              <Box
                component="form"
                onSubmit={handleSignUp}
                sx={{ mt: 2, width: '100%' }}
              >
                <Stack
                  sx={{
                    position: 'relative',
                    width: '10rem',
                    margin: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    src={avatar.preview}
                    sx={{
                      width: '10rem',
                      height: '10rem',
                      objectFit: 'contain',
                    }}
                  />
                  {avatar.error && (
                    <Typography color="error" variant="caption" sx={{ pt: 1 }}>
                      {avatar.error}
                    </Typography>
                  )}
                  <IconButton
                    component="label"
                    sx={{
                      height: '2rem',
                      width: '2rem',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.7)',
                      },
                    }}
                  >
                    <CameraAlt />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>

                <TextField
                  required
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="dense"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  variant="outlined"
                  margin="dense"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="dense"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="dense"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Create
                </Button>

                <Typography align="center" sx={{ py: 2 }}>
                  OR
                </Typography>

                <Button variant="text" fullWidth onClick={toggleLogin}>
                  Login Instead
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
