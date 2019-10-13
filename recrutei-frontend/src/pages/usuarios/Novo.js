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
import ArrowBack from '@material-ui/icons/ArrowBack';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

    const [usuario, setUsuario] = useState({ perfil_id: '', nome: '', login: '', senha: '' });
    const [openedSnackbar, setOpenedSnackbar] = React.useState(false);
    const [perfis, setPerfis] = React.useState([]);
    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;

        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const translate = { perfil_id: 'perfil' };

            for (let i in usuario) {
                if (!usuario[i]) {
                    let field = translate[i] || i;

                    throw `O campo ${field} é obrigatório`;
                }
            }
            const token = localStorage.getItem('token');

            const response = await api.post('/usuario', usuario, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                setTimeout(() => {
                    history.push('/usuarios');

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

        async function getPerfis() {
            const response = await api.get('/perfil', {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            setPerfis(response.data);
        };

        if (!token) {
            return history.push('/login');
        }

        getPerfis();
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
                            Usuario cadastrado com sucesso!
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

                <Typography paragraph> Novo Usuário </Typography>

                <Paper className={classes.root}>
                    <form className={classes.form}>
                        <FormControl className={classes.formControl} style={{ marginTop: 16 }}>
                            <InputLabel htmlFor="perfil_id">Perfil *</InputLabel>

                            <Select
                                value={usuario.perfil_id}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'perfil_id',
                                    id: 'perfil_id',
                                }}
                                style={{ width: 300 }}
                            >
                                {perfis.map(row => <MenuItem key={row._id} value={row._id}>{row.nome}</MenuItem>)}
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
                            value={usuario.nome}
                            onChange={handleChange}
                            style={{ width: 300 }}
                        />

                        <TextField
                            className={classes.textField}
                            margin="normal"
                            required
                            label="Login"
                            id="login"
                            name="login"
                            value={usuario.login}
                            onChange={handleChange}
                            style={{ width: 200 }}
                        />

                        <TextField
                            className={classes.textField}
                            margin="normal"
                            required
                            label="Senha"
                            id="senha"
                            name="senha"
                            type="password"
                            value={usuario.senha}
                            onChange={handleChange}
                            style={{ width: 200 }}
                        />

                        <Typography className={classes.error} variant="body2" gutterBottom>{error}</Typography>

                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Cadastrar
                        </Button>
                    </form>
                </Paper>

                <br />

                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => { history.push('/usuarios') }}
                >
                    <ArrowBack /> &nbsp; Voltar
                </Button>
            </main>
        </div>
    );
}
