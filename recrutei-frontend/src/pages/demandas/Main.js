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
import Visibility from '@material-ui/icons/Visibility';
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

export default function Demandas({ history }) {
    const classes = useStyles();

    const [demandas, setDemandas] = useState([]);
    const [openedSnackbar, setOpenedSnackbar] = React.useState(false);

    const openSnackbar = () => {
        setOpenedSnackbar(true);
    };

    const closeSnackbar = () => {
        setOpenedSnackbar(false);
    };

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function getDemandas() {
            const response = await api.get('/demanda', {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            setDemandas(response.data);
        };

        if (!token) {
            return history.push('/login');
        }

        getDemandas();
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

                <Typography paragraph> Demandas </Typography>

                {['A', 'R'].indexOf(usuario.perfil_id.regra) < 0 ? null : (<Link to="/demandas/novo" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                    ><Add /> &nbsp;Novo</Button>
                </Link>)}

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell width="25%">Resumo</TableCell>
                                <TableCell width="25%">Relator</TableCell>
                                <TableCell width="25%">Desenvolvedor</TableCell>
                                <TableCell width="15%">Status</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {demandas.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">{row.resumo}</TableCell>
                                    <TableCell component="th" scope="row">{row.relator_id.nome}</TableCell>
                                    <TableCell component="th" scope="row">{row.desenvolvedor_id ? row.desenvolvedor_id.nome : ''}</TableCell>
                                    <TableCell component="th" scope="row">{row.status}</TableCell>
                                    <TableCell align="center">
                                        <Link to={"/demandas/editar/" + row._id} style={{ textDecoration: 'none' }}>
                                            <Button><Visibility /></Button>
                                        </Link>
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
