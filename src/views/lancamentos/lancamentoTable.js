import React, { Component } from "react";

class LancamentoTable extends Component {


    render() {

        const rows = this.props.lancamento.map(lanc => {
            return (
                <tr key={lanc.id}>
                    <td>{lanc.descricao}</td>
                    <td>{lanc.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>{lanc.tipo}</td>
                    <td>{lanc.ano}</td>
                    <td>{lanc.mes}</td>
                    <td>{lanc.status}</td>
                    <td>
                        <button type="button" className="btn btn-success" onClick={e => this.props.handleAlterarStatus(lanc, "EFETIVADO")} disabled={lanc.status !== "PENDENTE"}>Efetivar</button>
                        <button type="button" className="btn btn-warning" onClick={e => this.props.handleAlterarStatus(lanc, "CANCELADO")} disabled={lanc.status !== "PENDENTE"}>Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={e => this.props.handleEditar(lanc.id)} >Editar</button>
                        <button type="button" className="btn btn-danger" onClick={e => this.props.handleDeletar(lanc)}>Deletar</button>
                        {/* <button type="button" className="btn btn-primary" onClick={e => this.props.handleAlterarStatus(lanc, "PENDENTE")}>Pendente</button> */}
                    </td>
                </tr>
            )
        })

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Descrição</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Ano</th>
                        <th scope="col">Mês</th>
                        <th scope="col">Situação</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

}

export default LancamentoTable