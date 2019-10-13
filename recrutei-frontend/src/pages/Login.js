import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from '../services/api';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  }
}));

export default function Login({ history }) {
  const classes = useStyles();

  const [data, setData] = useState({ login: '', senha: '' });
  const [error, setError] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleLogin = async () => {
    const { login, senha } = data;

    setError('');

    try {
      const response = await api.post('login', { login, senha });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

      return history.push('/')

    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Usuario"
            name="login"
            autoComplete="login"
            autoFocus
            value={data.login}
            onChange={handleInputChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={data.senha}
            onChange={handleInputChange}
          />

          <Typography className={classes.error} variant="body2" gutterBottom>{error}</Typography>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}