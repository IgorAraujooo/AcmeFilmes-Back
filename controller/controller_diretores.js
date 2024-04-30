// Import do arquivo DAO para manipular dados dos diretores
const diretoresDAO = require('../model/DAO/diretor')

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

// Função para inserir um novo diretor
const setInserirNovoDiretor = async (dadosDiretor, contentType) => {
    try {

        // console.log(contentType)

        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let novoDiretorJSON = {}

            if (dadosDiretor.nome == '' || dadosDiretor.nome == undefined || dadosDiretor.nome == null || dadosDiretor.nome.length > 100 ||
                dadosDiretor.nome_artistico == '' || dadosDiretor.nome_artistico == undefined || dadosDiretor.nome_artistico.length > 100 || dadosDiretor.biografia == '' ||
                dadosDiretor.biografia == undefined || dadosDiretor.biografia == null || dadosDiretor.data_nascimento == '' ||
                dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento == null || dadosDiretor.data_nascimento.length != 10 ||
                dadosDiretor.foto == '' || dadosDiretor.foto == undefined || dadosDiretor.foto == null || dadosDiretor.foto.length > 150 ||
                dadosDiretor.id_sexo == undefined || isNaN(dadosDiretor.id_sexo) || dadosDiretor.id_sexo == null) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                // Validação para verificar se a data de falecimento tem um conteúdo válido
                if (dadosDiretor.data_falecimento != '' &&
                    dadosDiretor.data_falecimento != null &&
                    dadosDiretor.data_falecimento != undefined) {
                    // Verifica a quantidade de caracteres
                    if (dadosDiretor.data_falecimento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS // 400
                    } else {
                        statusValidated = true // Validação para liberar a inserção dos dados no DAO
                    }
                } else {
                    statusValidated = true // Validação para liberar a inserção dos dados no DAO
                }

                // Se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {
                    // Encaminha os dados para o DAO inserir
                    let novoD = await diretoresDAO.insertDiretor(dadosDiretor)

                    if (novoD) {
                        let id = await diretoresDAO.selectId()

                        // Cria o JSON de retorno com informações de requisição e os dados novos
                        novoDiretorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        novoDiretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoDiretorJSON.message = message.SUCCESS_CREATED_ITEM.message
                        novoDiretorJSON.id = parseInt(id)
                        novoDiretorJSON.diretor = dadosDiretor

                        return novoDiretorJSON // 201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB // 500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.log("Erro na controller:", error); // Adiciona log para verificar erros na controller
        return message.ERROR_INTERNAL_SERVER // 500 erro na camada da controller
    }
}

// Função para atualizar um diretor
const setAtualizarDiretor = async (dadosDiretor, contentType, id) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let statusValidated = false
            let updateDiretorJSON = {}

            if (dadosDiretor.nome == '' || dadosDiretor.nome == undefined || dadosDiretor.nome == null || dadosDiretor.nome.length > 100 ||
                dadosDiretor.nome_artistico == '' || dadosDiretor.nome_artistico == undefined || dadosDiretor.nome_artistico.length > 100 || dadosDiretor.biografia == '' ||
                dadosDiretor.biografia == undefined || dadosDiretor.biografia == null || dadosDiretor.data_nascimento == '' ||
                dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento == null || dadosDiretor.data_nascimento.length != 10 ||
                dadosDiretor.foto == '' || dadosDiretor.foto == undefined || dadosDiretor.foto == null || dadosDiretor.foto.length > 150 ||
                dadosDiretor.id_sexo == undefined || isNaN(dadosDiretor.id_sexo) || dadosDiretor.id_sexo == null) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                // Validação para verificar se a data de falecimento tem um conteúdo válido
                if (dadosDiretor.data_falecimento != '' &&
                    dadosDiretor.data_falecimento != null &&
                    dadosDiretor.data_falecimento != undefined) {
                    // Verifica a quantidade de caracteres
                    if (dadosDiretor.data_falecimento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS // 400
                    } else {
                        statusValidated = true // Validação para liberar a atualização dos dados no DAO
                    }
                } else {
                    statusValidated = true // Validação para liberar a atualização dos dados no DAO
                }

                // Se a variável for verdadeira, podemos encaminhar os dados para o DAO
                if (statusValidated) {
                    // Encaminha os dados para o DAO atualizar
                    let diretorAtualizado = await diretoresDAO.updateDiretor(id, dadosDiretor)

                    if (diretorAtualizado) {
                        let updatedDiretor = await diretoresDAO.selectByIdDiretor(id) // Recupera o diretor atualizado do banco de dados
                        let updatedId = updatedDiretor[0].id // Extrai o id do diretor atualizado

                        // Constrói o JSON de resposta com o id atualizado
                        updateDiretorJSON.status = message.SUCCESS_UPDATE_ITEM.status
                        updateDiretorJSON.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        updateDiretorJSON.message = message.SUCCESS_UPDATE_ITEM.message
                        updateDiretorJSON.id = updatedId // Usa o id atualizado aqui
                        updateDiretorJSON.diretor = dadosDiretor

                        return updateDiretorJSON // Retorna a resposta JSON atualizada
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB // 500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500 erro na camada da controller
    }
}

// Função para excluir um diretor
const setExcluirDiretor = async (id) => {
    try {
        let idDiretor = id
        let validaDiretor = await diretoresDAO.selectByIdDiretor(idDiretor)
        let dadosDiretor = await diretoresDAO.deleteDiretor(idDiretor)

        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
            return message.ERROR_INVALID_ID // 400
        } else if (validaDiretor.status == false) {
            return message.ERROR_NOT_FOUND
        } else {
            if (dadosDiretor)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

// Função para buscar um diretor por ID
const getBuscarDiretor = async (id) => {
    let idDiretor = id
    let diretorJSON = {}

    // Validação para verificar o ID do diretor antes de encaminhar para o DAO
    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID
    } else {
        // Encaminha o ID do diretor para o DAO para o retorno do Banco de Dados
        let dadosDiretor = await diretoresDAO.selectByIdDiretor(idDiretor)

        // Validação para verificar se o DAO retornou dados
        if (dadosDiretor) {
            if (dadosDiretor.length > 0) {
                // Cria o JSON de retorno de dados
                diretorJSON.diretor = dadosDiretor
                diretorJSON.status_code = 200

                return diretorJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

// Função para retornar todos os diretores do banco de dados
const getListarDiretores = async () => {
    // Cria o objeto JSON
    let diretoresJSON = {}

    // Cria a função DAO para retornar os dados do BD
    let dadosDiretores = await diretoresDAO.selectAllDiretores()

    // Validação para criar o JSON de dados
    if (dadosDiretores) {
        if (dadosDiretores.length > 0) {
            diretoresJSON.diretores = dadosDiretores
            diretoresJSON.quantidade = dadosDiretores.length
            diretoresJSON.status_code = 200

            return diretoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

module.exports = {
    setInserirNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getBuscarDiretor,
    getListarDiretores,
}
