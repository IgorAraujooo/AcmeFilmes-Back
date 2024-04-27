const generosDAO = require('../model/DAO/genero.js')
const ERROR_Messages = require('../modulo/config.js')

const setNovoGenero = async function(novosDados, content) {

    try {

        if (String(content).toLowerCase() == 'application/json') {

            let setNovoGeneroJson = {}

            if (novosDados.nome == '' || novosDados.nome == undefined || novosDados.nome == null || novosDados.nome.length > 45) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {

                let novoGenero = await generosDAO.insertGenero(novosDados)

                if (novoGenero) {
                    let idGenero = await generosDAO.getId()

                    setNovoGeneroJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    setNovoGeneroJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    setNovoGeneroJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    setNovoGeneroJson.id = idGenero
                    setNovoGeneroJson.genero = novosDados

                    return setNovoGeneroJson
                } else {
                    return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarGenero = async function(id, novosDados, content) {
    try {
        console.log("oi")
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        } else {
            console.log(novosDados)
            if (novosDados.nome == '' || novosDados.nome == undefined || novosDados.nome == null || novosDados.nome.length > 45) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
                const generoAtualizado = await generosDAO.updateGenero(id, novosDados)

                if (generoAtualizado) {
                    let setNovoGeneroJson = {
                        status: ERROR_Messages.SUCCESS_UPDATED_ITEM,
                        novosDados: novosDados,
                        id: id
                    }
                    return setNovoGeneroJson
                } else {
                    return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM
    }
}

const setExcluirGenero = async function(id) {
    try {
        if (!isNaN(id) || id != '' || id != undefined) {
            const generoExcluido = generosDAO.deleteGenero(id)

            if (generoExcluido) {
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

const getListarGenero = async function() {
    try {

        let generosJson = {}

        let novosDados = await generosDAO.selectAllGenero()

        if (novosDados) {

            if (novosDados.length > 0) {
                generosJson.genero = novosDados
                generosJson.quantidade = novosDados.length
                generosJson.status_code = 200

                return generosJson

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

const getBuscarGenero = async function(id) {
    try {
        let generoJson = {}

        if (!isNaN(id) || id != '' || id != undefined) {
            let dadosGenero = await generosDAO.selectGeneroByID(id)

            if (dadosGenero) {
                if (dadosGenero.length > 0) {
                    generoJson.genero = dadosGenero
                    generoJson.status_code = 200

                    return generoJson
                } else {
                    return ERROR_Messages.ERROR_NOTFOUND
                }
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


module.exports = {
    setNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getBuscarGenero,
    getListarGenero
}