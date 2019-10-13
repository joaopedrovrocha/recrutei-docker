import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Add from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { Link } from 'react-router-dom';

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
    button: {
        margin: theme.spacing(1),
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
}));

export default function Perfis({ history }) {
    const classes = useStyles();

    const [perfis, setPerfis] = useState([]);
    const [openedSnackbar, setOpenedSnackbar] = React.useState(false);

    const tiposRegra = {'A': 'Administrador', 'R': 'Relator', 'D': 'Desenvolvedor'};

    const handleRemove = async idPerfil => {
        try {
            const token = localStorage.getItem('token');

            const response = await api.delete(`/perfil/${idPerfil}`, {
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
            alert('Erro ao remover o registro.');
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
                            Perfil removido com sucesso!
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

                <Typography paragraph> Perfis </Typography>

                <Link to="/perfis/novo" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                    ><Add /> &nbsp;Novo</Button>
                </Link>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell width="50%">Nome</TableCell>
                                <TableCell width="30%">Regra</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {perfis.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">{row.nome}</TableCell>
                                    <TableCell>{tiposRegra[row.regra]}</TableCell>
                                    <TableCell align="center">
                                        <Link to={"/perfis/editar/" + row._id} style={{ textDecoration: 'none' }}>
                                            <Button><Edit /></Button>
                                        </Link>

                                        <Button
                                            onClick={() => handleRemove(row._id)}
                                            style={{ color: 'red' }}
                                        ><DeleteOutline /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </main>
        </div>
    );
}
