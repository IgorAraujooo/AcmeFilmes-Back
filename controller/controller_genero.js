/**********************************************************************************************************************************************
* Objetivo: Arquivo responsavel pela interação entre o APP e a model, que teremos todas as tratativas e regra de negocio para o CRUD de filmes*                                                 *                                                                     *
* Data: 19/03/2024                                                                                                                            *
* Autor: Igor Araujo                                                                                                                          *
* Versão: 1.0                                                                                                                                 * 
***********************************************************************************************************************************************/

const message = require('../modulo/config.js');

const generoDAO = require('../model/DAO/genero.js')
const { application } = require('express')

const getListarGenero = async function () {

    let generoJson = {}

    let dadosGenero = await generoDAO.selectAllGeneros();

    if(dadosGenero) {
        if(dadosGenero.lenght > 0){
            generoJson.filmes = dadosFilmes;
            generoJson.quantidade = dadosFilmes.length;
            generoJson.status_code = 200;
            return generoJson;
        } else {
            return message.ERROR_NOT_FOUND
        } 
    } else {
        return message.ERROR_INTERNAL_SERVER_DB;
    }
}

module.exports = {
    getListarGenero
}
