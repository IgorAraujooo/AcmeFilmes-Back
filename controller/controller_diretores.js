// Import do arquivo DAO para manipular dados dos atores
const diretoresDAO = require('../model/DAO/diretores')

//Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

//Função para inserir um novo atore
const setInserirNovoDiretor = async (dadosDiretor, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novoAtorJSON = {}

            if (dadosDiretor.nome == '' || dadosDiretor.nome == undefined || dadosDiretor.nome == null || dadosDiretor.nome.length > 100 ||
            dadosDiretor.nome_artistico == '' || dadosDiretor.nome_artistico == undefined || dadosDiretor.nome_artistico.length > 100 || dadosDiretor.biografia == '' ||
            dadosDiretor.biografia == undefined || dadosDiretor.biografia == null || dadosDiretor.data_nascimento == '' ||
                dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento == null || dadosDiretor.data_nascimento.length != 10 ||
                dadosDiretor.foto == '' || dadosDiretor.foto == undefined || dadosDiretor.foto == null || dadosDiretor.foto.length > 150 ||
                dadosDiretor.id_sexo == undefined || isNaN(dadosDiretor.id_sexo) || dadosDiretor.id_sexo == null 

            ) {
                return message.ERROR_REQUIRED_FIELDS//400

            } else {

                //Validação para verificar se a data de relancameno tem um conteúdo válido
                if (dadosDiretor.data_falecimento != '' &&
                    dadosDiretor.data_falecimento != null &&
                    dadosDiretor.data_falecimento != undefined

                ) {
                    //Verifica a qtde de caracter
                    if (dadosDiretor.data_falecimento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS//400
                    } else {
                        statusValidated = true //validação para liberar a inserção dos dados no DAO
                    }

                } else {
                    statusValidated = true  //validação para liberar a inserção dos dados no DAO
                }

                //se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {

                    //encaminha os dados para o DAO inserir
                    let novoDiretor = await diretoresDAO.insertAtor(dadosAtor)

                    if (novoAtor) {
                        
                        let id = await atoresDAO.selectId()

                        //Cria o JSON de retorno com informações de requisição e os dados novos
                        novoAtorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        novoAtorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoAtorJSON.message = message.SUCCESS_CREATED_ITEM.message
                        novoAtorJSON.id = parseInt(id)
                        novoAtorJSON.ator = dadosAtor

                        return novoAtorJSON //201

                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        console.log("Erro na controller:", error); // Adiciona log para verificar erros na controller
        return message.ERROR_INTERNAL_SERVER //500 erro na camada da controller
    }

}

const setAtualizarAtor = async (dadosAtor, contentType, id) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let updateAtorJSON = {}

            if (dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 100 ||
                dadosAtor.nome_artistico == '' || dadosAtor.nome_artistico == undefined || dadosAtor.nome_artistico.length > 100 || dadosAtor.biografia == '' ||
                dadosAtor.biografia == undefined || dadosAtor.biografia == null || dadosAtor.data_nascimento == '' ||
                dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento == null || dadosAtor.data_nascimento.length != 10 ||
                dadosAtor.foto == '' || dadosAtor.foto == undefined || dadosAtor.foto == null || dadosAtor.foto.length > 150 ||
                dadosAtor.id_sexo == undefined || isNaN(dadosAtor.id_sexo) || dadosAtor.id_sexo == null 

            ) {
                return message.ERROR_REQUIRED_FIELDS//400

            } else {

                //Validação para verificar se a data de relancameno tem um conteúdo válido
                if (dadosAtor.data_falecimento != '' &&
                    dadosAtor.data_falecimento != null &&
                    dadosAtor.data_falecimento != undefined) {
                    //Verifica a qtde de caracter
                    if (dadosAtor.data_falecimento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS//400
                    } else {
                        statusValidated = true //validação para liberar a inserção dos dados no DAO
                    }

                } else {
                    statusValidated = true  //validação para liberar a inserção dos dados no DAO
                }

                //se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {

                    //encaminha os dados para o DAO inserir
                    let atorAtualizado = await atoresDAO.updateAtor(id, dadosAtor)

                    if (atorAtualizado) {
                        let updatedAtor = await atoresDAO.selectByIdAtor(id) // Recupera o atore atualizado do banco de dados
                        let updatedId = updatedAtor[0].id // Extrai o id do atore atualizado

                        // Constrói o JSON de resposta com o id atualizado
                        updateAtorJSON.status = message.SUCCESS_UPDATE_ITEM.status
                        updateAtorJSON.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        updateAtorJSON.message = message.SUCCESS_UPDATE_ITEM.message
                        updateAtorJSON.id = updatedId // Usa o id atualizado aqui
                        updateAtorJSON.ator = dadosAtor

                        return updateAtorJSON // Retorna a resposta JSON atualizada
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB // 500
                    }
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 erro na camada da controller
    }

}

const setExcluirAtor = async (id) => {

    try {

        let idAtor = id

        let validaAtor = await selectByIdAtor(idAtor)

        let dadosAtor = await atoresDAO.deleteAtor(idAtor)

        if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {

            return message.ERROR_INVALID_ID //400

        } else if(validaAtor.status == false){
            return message.ERROR_NOT_FOUND

        } else {
            
            if(dadosAtor)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DB

        }


    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}

const getBuscarAtor = async (id) => {

    let idAtor = id

    let atorJSON = {}

    //Validação para verificar o ID do atore antes de encaminhar para o DAO
    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do atore para o DAO para o retorno do Banco de Dados
        let dadosAtor = await atoresDAO.selectByIdAtor(idAtor)

        //Validação para verificar se o DAO retornou dados
        if (dadosAtor) {

            if (dadosAtor.length > 0) {
                //Cria o JSON de retorno de dados
                atorJSON.ator = dadosAtor
                atorJSON.status_code = 200

                return atorJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}


//Função para retornar todos os atores do database
const getListarAtores = async () => {

    //Cria o objeto JSON
    let atoresJSON = {}

    //Cria a função DAO para retornar os dados do BD
    let dadosAtores = await atoresDAO.selectAllAtores()

    //Validação para criar o JSON de dados
    if (dadosAtores) {
        if (dadosAtores.length > 0) {
            atoresJSON.atores = dadosAtores
            atoresJSON.quantidade = dadosAtores.length
            atoresJSON.status_code = 200

            return atoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

module.exports = {
    setInserirNovoAtor,
    setAtualizarAtor,
    setExcluirAtor,
    getBuscarAtor,
    getListarAtores,
}





