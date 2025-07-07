import { useFileHandler, useInputValidation } from '6pp'
import { CameraAlt } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'
import { server } from '../constants/config'
import { userExists } from '../redux/reducers/auth'
import { userNameValidator } from '../utils/validators'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const toggleLogin = () => setIsLogin((prev) => !prev)

  const name = useInputValidation('')
  const bio = useInputValidation('')
  const username = useInputValidation('', userNameValidator)
  const password = useInputValidation('')

  const avatar = useFileHandler('single')
  const dispatch = useDispatch()

  const handleLogin = async (e) => {

    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
        username: username.value,
        password: password.value,

      }, config);
      dispatch(userExists(data.user))
      toast.success(data.message,{id:toastId })

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {id:toastId})
    } finally{
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {id:toastId})
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {id:toastId});
    } finally{
      setIsLoading(false);
    }


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
                disabled={isLoading}
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

                <Button 
                disabled={isLoading}
                variant="text" 
                fullWidth onClick={toggleLogin}>
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
                  disabled={isLoading}
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

                <Button 
                disabled={isLoading}
                variant="text" 
                fullWidth 
                onClick={toggleLogin}>
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
