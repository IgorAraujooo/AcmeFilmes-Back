const classificacaoDAO = require('../model/DAO/classificacao.js')
const ERROR_Messages = require('../modulo/config.js')


const setNovaClassificacao = async function(novosDados, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {
            let setNovaClassificacaoJson = {}
            let statusValidate = false

            if (novosDados.nome == '' || novosDados.nome == undefined || novosDados.nome == null || novosDados.nome.length > 45 ||
                novosDados.sigla == '' || novosDados.sigla == undefined || novosDados.sigla == null || novosDados.sigla.length > 5 ||
                novosDados.descricao == '' || novosDados.descricao == undefined || novosDados.descricao == null || novosDados.length > 100
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
                if (novosDados.icone != '' && novosDados.icone != null && novosDados.icone != undefined) {
                    statusValidate = true
                }
            }
            if (statusValidate) {
                let setNovaClassificacao = await classificacaoDAO.insertClassificacao(novosDados)

                if (setNovaClassificacao) {
                    let id_classificacao = await classificacaoDAO.getId()

                    setNovaClassificacaoJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    setNovaClassificacaoJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    setNovaClassificacaoJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    setNovaClassificacaoJson.idNovaClassificacao = id_classificacao
                    setNovaClassificacaoJson.classificacao = novosDados

                    return setNovaClassificacaoJson
                } else {
                    ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarClassificacao = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        } else {
            const classificacaoAtualizada = await classificacaoDAO.updateClassificacao(id, novosDados)

            if (classificacaoAtualizada) {
                let setNovaClassificacaoJson = {
                    status: ERROR_Messages.SUCCESS_UPDATED_ITEM.status,
                    status_code: ERROR_Messages.SUCCESS_UPDATED_ITEM.status_code,
                    message: ERROR_Messages.SUCCESS_UPDATED_ITEM.message,
                    id_classificacao: id,
                    classificação: novosDados
                }
                return setNovaClassificacaoJson
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }

}

const setExcluirClassificacao = async function(id) {
    try {
        if (id == "" || id == undefined || isNaN(id)) {
            const classificacaoExcluida = classificacaoDAO.deleteClassificacao(id)

            if (classificacaoExcluida) {
                return ERROR_Messages.SUCCESS_DELETED_ITEM
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_ID
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getListarClassificacao = async function() {
    try {

        let classificacaoJson = {}

        let dadosClassificacao = await classificacaoDAO.selectAllClassificacao()

        if (dadosClassificacao) {

            if (dadosClassificacao.length > 0) {
                classificacaoJson.Classificacao = dadosClassificacao
                classificacaoJson.quantidade = dadosClassificacao.length
                classificacaoJson.status_code = 200

                return classificacaoJson

            } else {
                return ERROR_Messages.ERROR_NOTFOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getBuscarClassificacao = async function(id) {
    try {
        let classificacaoJson = {}

        if (id == '' || id == undefined || isNaN(id)) {
            return ERROR_Messages.ERROR_INVALID_ID
        } else {
            let dados = await classificacaoDAO.selectClassificacaoByID(id)

            if (dados) {
                if (dados.length > 0) {
                    classificacaoJson.classificacao = dados
                    classificacaoJson.status_code = 200

                    return classificacaoJson
                } else {
                    return ERROR_Messages.ERROR_NOTFOUND
                }
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getBuscarClassificacao,
    getListarClassificacao
}