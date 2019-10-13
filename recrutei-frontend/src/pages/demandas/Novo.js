import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

import Navegacao from '../../components/Navegacao';

import api from '../../services/api';

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
    form: {
        display: 'flex',
        flex: 1,
        padding: 20,
        flexDirection: 'row',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    error: {
        color: 'red'
    },
    success: {
        backgroundColor: green[600],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

export default function Novo({ history }) {
    const classes = useStyles();

    const [demanda, setDemanda] = useState({ resumo: '', descricao: '' });
    const [openedSnackbar, setOpenedSnackbar] = React.useState(false);
    const [error, setError] = useState('');

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (['A', 'R'].indexOf(usuario.perfil_id.regra) < 0) {
        history.push('/demandas');
    }

    const handleChange = e => {
        const { name, value } = e.target;

        setDemanda({ ...demanda, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const translate = {};

            for (let i in demanda) {
                if (!demanda[i]) {
                    let field = translate[i] || i;

                    throw `O campo ${field} é obrigatório`;
                }
            }

            const token = localStorage.getItem('token');

            const response = await api.post('/demanda', demanda, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                setTimeout(() => {
                    history.push('/demandas');

                }, 3500);

                openSnackbar();
            }

        } catch (err) {
            const errorMessage = err.response ? err.response.data : (err.message || err);

            setError(errorMessage);
        }
    };

    const openSnackbar = () => {
        setOpenedSnackbar(true);
    };

    const closeSnackbar = () => {
        setOpenedSnackbar(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            return history.push('/login');
        }
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Navegacao />

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={openedSnackbar}
                autoHideDuration={3000}
                onClose={closeSnackbar}
            >
                <SnackbarContent
                    className={classes.success}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <CheckCircleIcon className={clsx(classes.icon, classes.iconVariant)} />
                            Demanda cadastrada com sucesso!
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={closeSnackbar}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    ]}
                />
            </Snackbar>

            <main className={classes.content}>
                <div className={classes.toolbar} />

                <Typography paragraph> Nova Demanda </Typography>

                <Paper className={classes.root}>
                    <form className={classes.form}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    required
                                    label="Resumo"
                                    id="resumo"
                                    name="resumo"
                                    autoFocus
                                    value={demanda.resumo}
                                    onChange={handleChange}
                                    style={{ flex: 0.3 }}
                                    maxLength="10"
                                />

                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    required
                                    label="Descricao"
                                    id="descricao"
                                    name="descricao"
                                    value={demanda.descricao}
                                    onChange={handleChange}
                                    style={{ flex: 0.7 }}
                                    rows={5}
                                    multiline={true}
                                />
                            </Grid>

                            <Typography className={classes.error} variant="body2" gutterBottom>{error}</Typography>

                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Cadastrar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                <br />

                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => { history.push('/demandas') }}
                >
                    <ArrowBack /> &nbsp; Voltar
                </Button>
            </main>
        </div>
    );
}
