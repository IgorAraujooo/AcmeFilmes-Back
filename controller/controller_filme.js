/**********************************************************************************************************************************************
* Objetivo: Arquivo responsavel pela interação entre o APP e a model, que teremos todas as tratativas e regra de negocio para o CRUD de filmes*                                                 *                                                                     *
* Data: 30/01/24                                                                                                                              *
* Autor: Igor Araujo                                                                                                                          *
* Versão: 1.0                                                                                                                                 * 
***********************************************************************************************************************************************/

// Import do arquivo de configurações do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAP para manipular dados do BD
const filmesDAO = require('../model/DAO/filme.js')

// Função para inserir um novo Filme no Banco de Dados
const setInserirNovoFilme = async function(){

}

// Função para atualizar Filme existente 
const setAtualizarFilme = async function(){

}

// Função para excluir um filme existente
const setExcluirFilme = async function(id){

}

// Função para retornar todos os filmes do banco de dados
const getListarFilmes = async function(){

    // Cria uma variável do tipo JSON
    let filmesJSON = {}

    // Chama a função do DAO para buscar os dados no BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    // Verifica se existem dados retornados do DAO
    if (dadosFilmes) {
        // Montando o JSON para retornar para o APP
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200
        // Retorna o JSON montado
        return filmesJSON
    } else {
        // Return false quando não houverem dados
        return false
    }
}

// Funço para buscar filme pelo ID
const getBuscarFilme = async function(id){
    // Recebe o Id do filme
    let idFilme = id;
    // Variavel para criar o JSON de retorno do filme
    let filmeJSON = {}

    // Validação para ID vazio, indefinido ou não numérico
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {
        // Solicita para o DAO a busca do filme pelo ID
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        // Validalção para verificar se existem dados encontrados
        if(dadosFilme){ 
            if(dadosFilme.length > 0){
                filmeJSON.filme = dadosFilme;
                filmeJSON.status_code = 200;

                return filmeJSON //200
            } else{
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}

