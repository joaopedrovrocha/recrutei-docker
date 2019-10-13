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

import { useParams } from 'react-router-dom';

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

export default function Editar({ history }) {
    const classes = useStyles();

    const { idDemanda } = useParams();

    const [demanda, setDemanda] = useState({ resumo: '', descricao: '', status: '', desenvolvedor_id: { nome: '' }, relator_id: {} });
    const [openedSnackbar, setOpenedSnackbar] = React.useState(false);
    const [error, setError] = useState('');
    
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const handleAtribuir = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await api.post(`atribuir-demanda/${idDemanda}`, null, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                setTimeout(() => {
                    window.location.reload();

                }, 3500);

                openSnackbar();
            }

        } catch (err) {
            const errorMessage = err.response ? err.response.data : (err.message || err);

            setError(errorMessage);
        }
    };

    const handleFinalizar = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await api.post(`finalizar-demanda/${idDemanda}`, null, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                setTimeout(() => {
                    window.location.reload();

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

        async function getDemanda() {
            const response = await api.get(`demanda/${idDemanda}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            const { resumo, descricao, status, desenvolvedor_id, relator_id } = response.data;

            setDemanda({ resumo, descricao, status, desenvolvedor_id, relator_id });
        };

        if (!token) {
            return history.push('/login');
        }

        getDemanda();
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
                            Demanda atualizada com sucesso!
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

                <Typography paragraph> Atualizar Demanda </Typography>

                <Paper className={classes.root}>
                    <form className={classes.form}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ display: 'flex' }}>
                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    label="Resumo"
                                    id="resumo"
                                    name="resumo"
                                    value={demanda.resumo}
                                    style={{ flex: 0.3 }}
                                    maxLength="10"
                                    disabled={true}
                                />

                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    label="Descricao"
                                    id="descricao"
                                    name="descricao"
                                    value={demanda.descricao}
                                    style={{ flex: 0.7 }}
                                    rows={5}
                                    multiline={true}
                                    disabled={true}
                                />
                            </Grid>
                                
                            <TextField
                                className={classes.textField}
                                margin="normal"
                                label="Status"
                                id="status"
                                name="status"
                                value={demanda.status}
                                style={{ flex: 0.3 }}
                                maxLength="10"
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                            />

                            {demanda.desenvolvedor_id ? (<Grid item xs={12} style={{ display: 'flex' }}>
                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    label="Atribuido a"
                                    id="attr"
                                    name="attr"
                                    value={demanda.desenvolvedor_id.nome}
                                    style={{ flex: 0.3 }}
                                    maxLength="10"
                                    InputLabelProps={{ shrink: true }}
                                    disabled={true}
                                />
                            </Grid>) : null}

                            <Typography className={classes.error} variant="body2" gutterBottom>{error}</Typography>

                            <Grid item xs={12}>
                                { usuario.perfil_id.regra === 'D' && !demanda.desenvolvedor_id ? (<Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleAtribuir}
                                >
                                    Atribuir a Mim
                                </Button>) : null }

                                &nbsp;&nbsp;

                                { usuario.perfil_id.regra === 'D' && demanda.desenvolvedor_id && demanda.status === 'Aberto' ? (<Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleFinalizar}
                                >
                                    Finalizar Demanda
                                </Button>) : null }
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
