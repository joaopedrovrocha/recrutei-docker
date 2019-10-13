import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Navegacao from '../components/Navegacao';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard({ history }) {
  const classes = useStyles();

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
          history.push('/login');
      }

      const usuario = JSON.parse(localStorage.getItem('usuario'));

      setUsuario(usuario);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Navegacao />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Bem vindo, {usuario.nome}!
        </Typography>
      </main>
    </div>
  );
}
