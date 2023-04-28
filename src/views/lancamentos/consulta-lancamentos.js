import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localstorageService';
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import ModalDialogConfirm from '../../components/modalDialog';
import SelectMenu from '../../components/selectMenu';
import LancamentoTable from './lancamentoTable';


class ConsultaLancamentos extends Component {

    // http://localhost:8080/api/lancamentos?usuario=9&descricao=pagamen&mes=1&ano=2023
    state = {
        descricao: '',
        mes: '',
        ano: '',
        tipo: '',
        lancamentos: [],
        lancamentoDeletar: {},
        askConfirm: false,
        alertSuccess: false,
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-lancamento')
    }
    buscar = () => {

        if (this.state.ano) {
            const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

            const lancamentoFiltro = {
                usuario: usuarioLogado.id,
                descricao: this.state.descricao,
                mes: this.state.mes,
                ano: this.state.ano,
                tipo: this.state.tipo,
            }

            this.service.buscar(lancamentoFiltro)
                .then(response => {
                    const lista = response.data;
                    if (lista.length < 1) {
                        alert("Nenhum lancamento encontrado com esse filtro");
                    }
                    this.setState({ lancamentos: lista })
                }).catch(error => {
                    alert(error.lista)
                })
        } else {
            alert('Campo Ano é obrigatório')
        }

    }

    abrirConfirmacao = (lanc) => {
        this.setState({ askConfirm: true, lancamentoDeletar: lanc })
    }

    deletar = () => {

        this.service.deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                lancamentos.splice(lancamentos.indexOf(this.state.lancamentoDeletar), 1);
                this.setState({ lancamentos: lancamentos });
                alert('Lancamento deletado com sucesso!')
            }).catch(error => {
                alert(error.response.data)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamento/${id}`);
    }

    cancelarDelecao = () => {
        this.setState({ askConfirm: false, lancamentoDeletar: {} })
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);

                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({ lancamento: lancamento });
                }
                alert('Status alterado com sucesso!')
            }).catch(error => {
                alert(error.response.data)
            })
    }

    render() {

        const meses = this.service.obterListaMeses();

        const tipo = this.service.obterListaTipo();

        return (
            <>
                <Card title="Busca Lançamento">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="bs-component">

                                <FormGroup label="Ano: *" htmlFor="inputAno">
                                    <input
                                        type="text"
                                        value={this.state.ano}
                                        onChange={e => this.setState({ ano: e.target.value })}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Digite o Ano"
                                    />
                                </FormGroup>

                                <FormGroup label="Descrição:" htmlFor="inputDescricao">
                                    <input
                                        type="text"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Digite a Descrição"
                                    />
                                </FormGroup>

                                <FormGroup label="Mês:" htmlFor="inputMes">
                                    <SelectMenu
                                        id="inputMes"
                                        lista={meses}
                                        value={this.state.mes}
                                        onChange={e => this.setState({ mes: e.target.value })}
                                    />
                                </FormGroup>

                                <FormGroup label="Tipo de Lançamento:" htmlFor="inputTipo">
                                    <SelectMenu
                                        id="inputTipo"
                                        lista={tipo}
                                        value={this.state.tipo}
                                        onChange={e => this.setState({ tipo: e.target.value })}
                                    />
                                </FormGroup>
                                <button onClick={this.buscar} type="button" className="btn btn-success" >Buscar</button>
                                <button onClick={this.prepareCadastrar} type="button" className="btn btn-danger">Cadastrar</button>

                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="col-lg-12">

                            <div className="page-header">
                                <h1 id="tables"></h1>
                            </div>

                            <div className="bs-component">
                                <LancamentoTable
                                    lancamento={this.state.lancamentos}
                                    handleDeletar={this.abrirConfirmacao}
                                    handleEditar={this.editar}
                                    handleAlterarStatus={this.alterarStatus}
                                />
                            </div>
                        </div>
                    </div>

                    {/* MODAL */}
                    <div>
                        <ModalDialogConfirm
                            show={this.state.askConfirm}
                            title="Confirmar"
                            description="Você tem certeza que deseja deletar este lancamento?"
                            handleConfirmarAcao={this.deletar}
                            handleCancelarAcao={this.cancelarDelecao}
                        />
                    </div>

                </Card>
            </>
        )

    }
}

export default withRouter(ConsultaLancamentos);