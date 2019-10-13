import React from 'react';
import ReactDOM from 'react-dom';

import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';

// Usuarios
import MainUsuarios from './pages/usuarios/Main';
import NovoUsuarios from './pages/usuarios/Novo';
import EditarUsuarios from './pages/usuarios/Editar';

// Perfis
import MainPerfis from './pages/perfis/Main';
import NovoPerfis from './pages/perfis/Novo';
import EditarPerfis from './pages/perfis/Editar';

// Demandas
import MainDemandas from './pages/demandas/Main';
import NovoDemandas from './pages/demandas/Novo';
import EditarDemandas from './pages/demandas/Editar';

import Page404 from './pages/Page404';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/logout" exact={true} component={Logout} />

            {/* Usuarios */}
            <Route path="/usuarios" exact={true} component={MainUsuarios} />
            <Route path="/usuarios/novo" exact={true} component={NovoUsuarios} />
            <Route path="/usuarios/editar/:idUsuario" exact={true} component={EditarUsuarios} />

            {/* Perfis */}
            <Route path="/perfis" exact={true} component={MainPerfis} />
            <Route path="/perfis/novo" exact={true} component={NovoPerfis} />
            <Route path="/perfis/editar/:idPerfil" exact={true} component={EditarPerfis} />

            {/* Demandas */}
            <Route path="/demandas" exact={true} component={MainDemandas} />
            <Route path="/demandas/novo" exact={true} component={NovoDemandas} />
            <Route path="/demandas/editar/:idDemanda" exact={true} component={EditarDemandas} />

            <Route path="*" component={Page404} />
        </Switch>
    </BrowserRouter>
, document.getElementById('root'));