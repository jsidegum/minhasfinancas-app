import React, { Component } from "react"
import AuthService from "../app/service/authService";
import ApiService from "../app/apiservice";
import jwt from 'jsonwebtoken';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends Component {

    state = {
        usuarioAutenticado: null,
        isAutenticado: false,
    }

    iniciarSessao = (tokenDTO) => {

        const token = tokenDTO.token;
        const claims = jwt.decode(token);
        const usuario = {
            id: claims.userId,
            nome: claims.nome,
        }

        ApiService.registarToken(token);
        AuthService.logar(usuario);
        this.setState({ isAutenticado: true, usuarioAutenticado: usuario });
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState({ isAutenticado: false, usuarioAutenticado: null });
    }

    render() {

        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao,
        }

        return (
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao;