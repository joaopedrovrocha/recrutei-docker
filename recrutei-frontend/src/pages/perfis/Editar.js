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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

    const { idPerfil } = useParams();

    const [perfil, setPerfil] = useState({ nome: '', regra: '' });
    const [openedSnackbar, setOpenedSnackbar] = React.useState(false);
    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;

        setPerfil({ ...perfil, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const translate = { regra: 'perfil' };
            const notRequired = ['senha'];

            for (let i in perfil) {
                if (!perfil[i] && notRequired.indexOf(i) < 0) {
                    let field = translate[i] || i;

                    throw `O campo ${field} é obrigatório`;
                }
            }
            const token = localStorage.getItem('token');

            const response = await api.put(`perfil/${idPerfil}`, perfil, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                setTimeout(() => {
                    history.push('/perfis');

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

        async function getPerfil() {
            const response = await api.get(`perfil/${idPerfil}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            const { nome, regra } = response.data;

            setPerfil({ nome, regra });
        };

        if (!token) {
            return history.push('/login');
        }

        getPerfil();
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
                            Perfil atualizado com sucesso!
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={closeSnackbar}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </Snackbar>

            <main className={classes.content}>
                <div className={classes.toolbar} />

                <Typography paragraph> Novo Perfil </Typography>

                <Paper className={classes.root}>
                    <form className={classes.form}>
                        <FormControl className={classes.formControl} style={{ marginTop: 16 }}>
                            <InputLabel htmlFor="regra">Regra *</InputLabel>

                            <Select
                                value={perfil.regra}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'regra',
                                    id: 'regra',
                                }}
                                style={{ width: 300 }}
                            >
                                <MenuItem value='A'>Administrador</MenuItem>
                                <MenuItem value='R'>Relator</MenuItem>
                                <MenuItem value='D'>Desenvolvedor</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            className={classes.textField}
                            margin="normal"
                            required
                            label="Nome"
                            id="nome"
                            name="nome"
                            autoFocus
                            value={perfil.nome}
                            onChange={handleChange}
                            style={{ width: 300 }}
                        />

                        <Typography className={classes.error} variant="body2" gutterBottom>{error}</Typography>

                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Atualizar
                        </Button>
                    </form>
                </Paper>

                <br />

                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => { history.push('/perfis') }}
                >
                    <ArrowBack /> &nbsp; Voltar
                </Button>
            </main>
        </div>
    );
}
