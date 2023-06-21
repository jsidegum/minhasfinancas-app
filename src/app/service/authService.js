import ApiService from "../apiservice";
import LocalStorageService from "./localstorageService";
import jwt from "jsonwebtoken";

const USUARIO_LOGADO = '_usuario_logado'
const TOKEN = 'access_token'

class AuthService {

    static isUsuarioAutenticado() {
        const token = LocalStorageService.obterItem(TOKEN);
        const decodeToken = jwt.decode(token);

        if (decodeToken !== null) {
            const expiration = decodeToken.exp;
            const isTokenInvalido = Date.now() > (expiration * 1000);
            return !isTokenInvalido;
        }

    }

    static removerUsuarioAutenticado() {
        LocalStorageService.removerItem(USUARIO_LOGADO);
        LocalStorageService.removerItem(TOKEN);
    }

    static logar(usuario, token) {
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
        LocalStorageService.adicionarItem(TOKEN, token);
        ApiService.registarToken(token);
    }

    static obterUsuarioAutenticado() {
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }

    static refreshSession() {
        const token = LocalStorageService.obterItem(TOKEN);
        const usuario = AuthService.obterUsuarioAutenticado();
        AuthService.logar(usuario, token);
        return usuario;
    }

}

export default AuthService;