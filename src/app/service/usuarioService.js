import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorIdUsuario(id) {
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario) {
        return this.post('/', usuario);
    }

    validar(usuario) {
        const erros = [];

        if (!usuario.nome) {
            erros.push('Informe seu nome');
        }
        if (!usuario.email) {
            erros.push('Informe um email');
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um email válido');
        }
        if (!usuario.senha) {
            erros.push('Informe sua senha');
        }
        if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As senhas não conferem');
        }
        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;