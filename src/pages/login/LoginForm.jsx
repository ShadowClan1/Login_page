import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {getUser, setUser} from '../../localstorage/localStorage'
const LoginForm = () => {
  const navigate = useNavigate()
const handleSubmit = e => {
  e.preventDefault()
    form.handleSubmit()
}
const initialValues = {
  email : "",
  password : "",
  rememberMe : false
}
const form = useFormik({
  initialValues,
  validationSchema : Yup.object({
    email : Yup.string().email(). required(),
    password : Yup.string().required()
  }),
  onSubmit : ()=>{
    console.log(form.values)
    setUser({...form.values, plan : false})
    console.log(getUser())
    navigate("/dashboard")

  } 
})

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
        opacity : '0.955'
    }}>
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate  sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={form.handleChange}
          value={form.values.email}
          error={ form.touched.email &&  Boolean(form.errors.email) }
          helperText = {form.touched.email && form.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={form.handleChange}
          value={form.values.password}
          error={ form.touched.password &&  Boolean(form.errors.password) }
          helperText = {form.touched.password && form.errors.password}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox  color="primary"  name="rememberMe" value={form.values.rememberMe} onChange={form.handleChange} />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to='/signup' variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  </Grid>
  )
}


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


export default LoginForm

