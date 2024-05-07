const generosDAO = require('../model/DAO/genero.js')
const message = require('../modulo/config.js')

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

const setAtualizarGenero = async function(id, contentType, dadosGenero){
    try{
        let idGenero = id;
        // console.log(dadosGenero)

        if(idGenero == '' || idGenero == undefined || isNaN (idGenero)){
            return message.ERROR_INVALID_ID;

           
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateGeneroJson = {};
            
            if(dadosGenero.nome == ''    || dadosGenero.nome == undefined       ||  dadosGenero.nome == null               || dadosGenero.nome.length > 45
    ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let generoById = await generosDAO.selectGeneroByID(id)

            if(generoById.length > 0){
                if (validateStatus){
                    // console.log("aaaaaaaaaaaa")
                    let updateGenero = await generosDAO.updateGenero(id,dadosGenero);
    
                    if(updateGenero){
                      
                        updateGeneroJson.genero = dadosGenero
                        updateGeneroJson.status = message.SUCCESS_UPDATED_ITEM.status
                        updateGeneroJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateGeneroJson.message = message.SUCCESS_UPDATED_ITEM.message
    
                        return updateGeneroJson;
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