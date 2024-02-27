/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas configurações globais de mensagens, valores e conteudos para o projeto
 * Data: 20/02/2024
 * Autor: Igor Araujo
 * Versão: 1.0
 *********************************************************************************************************************/

/******************************* MENSAGENS DE ERRO****************************************/
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é valido!!!!'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem dados obrigatórios que não foram preenchidos corretamente'}
const ERROR_NOT_FOUND = {status: false, status_code: 404 ,message: 'Nenhum item encontrado na requisição'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500 ,message: 'Ocorreram erros internos no servidor de banco de dados, por favor contate o administrador do sistema'}

/******************************* MENSAGENS DE SUCESSO****************************************/
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso no Banco de Dados!!!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM
}
