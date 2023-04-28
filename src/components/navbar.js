import React, { Component } from "react";
import NavbarItem from "./navbarItem";
import { AuthConsumer } from "../main/provedorAutenticacao";


class Navbar extends Component {

    render() {
        return (
            <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <div className="container">
                    <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >

                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav">
                            <NavbarItem render={this.props.isUsuarioAutenticado} label="Home" href="#/home" />
                            <NavbarItem render={this.props.isUsuarioAutenticado} label="Usuários" href="#/cadastro-usuarios" />
                            <NavbarItem render={this.props.isUsuarioAutenticado} label="Lançamentos" href="#/lancamentos" />
                            <NavbarItem render={this.props.isUsuarioAutenticado} onClick={this.props.deslogar} label="Sair" href="#/login" />
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
)