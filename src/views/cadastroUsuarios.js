import React from 'react';
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.serviceSalvar = new UsuarioService();
    }

    cadastrar = () => {

        const { nome, email, senha, senhaRepeticao } = this.state;

        const usuario = {
            nome,
            email,
            senha,
            senhaRepeticao
        }

        try {
            this.serviceSalvar.validar(usuario)
        } catch (erro) {
            const mensagens = erro.mensagens;
            alert(mensagens.join('\n'));
            return false;
        }

        this.serviceSalvar.salvar(usuario)
            .then(response => {
                alert('Usuário cadastrado com sucesso!')
                this.props.history.push('/login');
            }).catch(erro => {
                alert(erro.response.data)
            })

    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="bs-docs-section"></div>
                    <div>
                        <Card title='Cadastro de Usuário'>
                            <FormGroup label="Nome: *" htmlFor="exampleInputEmail1">
                                <input
                                    type="text"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    className="form-control"
                                    id="inputNome"
                                    placeholder="Digite o Nome"
                                />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                <input
                                    type="email"
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Digite o Email"
                                />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input
                                    type="password"
                                    value={this.state.senha}
                                    onChange={e => this.setState({ senha: e.target.value })}
                                    className="form-control"
                                    id="inputSenha"
                                    placeholder="Password"
                                />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input
                                    type="password"
                                    value={this.state.senhaRepeticao}
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                                    className="form-control"
                                    id="inputRespitaSenha"
                                    placeholder="Password"
                                />
                            </FormGroup>

                            <br />
                            <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>

                        </Card>

                        <div className="form-group">
                        </div>

                    </div>
                </div>
            </div>


        );
    }
}

export default withRouter(CadastroUsuario);

