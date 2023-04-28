import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos')
    }

    obterListaMeses() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }
        ]
    }

    obterListaTipo() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Receita', value: 'RECEITA' },
            { label: 'Despesa', value: 'DESPESA' }
        ]
    }

    obterPorId(id) {
        return this.get(`/${id}`)
    }

    alterarStatus(id, status) {
        return this.put(`/${id}/atualiza-status`, { status })
    }

    validar(lancamento) {
        const erros = [];

        if (!lancamento.descricao) {
            erros.push('Informe a descrição.');
        }
        if (!lancamento.ano) {
            erros.push('Informe o ano.');
        }
        if (!lancamento.mes) {
            erros.push('Informe o mês.');
        }
        if (!lancamento.valor) {
            erros.push('Informe o valor.');
        }
        if (!lancamento.tipo) {
            erros.push('Informe o tipo.');
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }


    buscar(lancamentoFiltro) {
        //http://localhost:8080/api/lancamentos?usuario=9&descricao=pagamen&mes=1&ano=2023

        let params = `?usuario=${lancamentoFiltro.usuario}`;

        if (lancamentoFiltro.descricao) {
            params += `&descricao=${lancamentoFiltro.descricao}`;
        }

        if (lancamentoFiltro.ano) {
            params += `&ano=${lancamentoFiltro.ano}`;
        }

        if (lancamentoFiltro.mes) {
            params += `&mes=${lancamentoFiltro.mes}`;
        }
        if (lancamentoFiltro.tipo) {
            params += `&tipo=${lancamentoFiltro.tipo}`;
        }

        return this.get(params);

    }

    deletar(id) {
        ///api/lancamentos/1
        return this.delete(`/${id}`);
    }

    salvar(lancamento) {
        return this.post('/', lancamento);
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }


}

export default LancamentoService;