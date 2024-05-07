const classificacaoDAO = require('../model/DAO/classificacao.js')
const message = require('../modulo/config.js')


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

const setAtualizarClassificacao = async function(id, contentType, dadosClassificacao){
    try{
        let idClassificacao = id;
        // console.log(idClassificacao)

        if(idClassificacao == '' || idClassificacao == undefined || isNaN (idClassificacao)){
            return message.ERROR_INVALID_ID;

           
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateClassificacaoJson = {};
            
            // console.log(dadosClassificacao)

            if(dadosClassificacao.nome == '' || dadosClassificacao.nome == undefined || dadosClassificacao.nome == null || dadosClassificacao.nome > 200 ||
            dadosClassificacao.descricao == ''  ||   dadosClassificacao.descricao == undefined  || dadosClassificacao.descricao == null   || dadosClassificacao.descricao > 255 ||
            dadosClassificacao.sigla == '' ||  dadosClassificacao.sigla == undefined || dadosClassificacao.sigla == null  || dadosClassificacao.sigla > 65000 ||
            dadosClassificacao.icone == '' || dadosClassificacao.icone == undefined || dadosClassificacao.icone == null || dadosClassificacao.icone > 500
    ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let classificacaoById = await classificacaoDAO.selectClassificacaoByID(id)

            if(classificacaoById.length > 0){
                if (validateStatus){
                    let uptadeClassificacao = await classificacaoDAO.updateClassificacao(id,dadosClassificacao);
    
                    if(uptadeClassificacao){
                      
                        updateClassificacaoJson.classificacao = dadosClassificacao
                        updateClassificacaoJson.status = message.SUCCESS_UPDATED_ITEM.status
                        updateClassificacaoJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateClassificacaoJson.message = message.SUCCESS_UPDATED_ITEM.message
    
                        return updateClassificacaoJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
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