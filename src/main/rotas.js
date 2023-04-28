import React, { Component } from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Home from '../views/home';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuarios';
import CadastroLancamento from '../views/lancamentos/cadastro-lancamento';
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import { AuthConsumer } from './provedorAutenticacao';

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

class Rotas extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                    <RotaAutenticada isUsuarioAutenticado={this.props.isUsuarioAutenticado} path="/home" component={Home} />
                    <RotaAutenticada isUsuarioAutenticado={this.props.isUsuarioAutenticado} path="/lancamentos" component={ConsultaLancamentos} />
                    <RotaAutenticada isUsuarioAutenticado={this.props.isUsuarioAutenticado} path="/cadastro-lancamento/:id?" component={CadastroLancamento} />
                </Switch>
            </HashRouter >
        )
    }
}



export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
);