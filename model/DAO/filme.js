/**********************************************************************************************************************************
* Objetivo: Criar a intereação com o banco de dados MYSQL para fazer o CRUD de filmes                                             *
* Data: 30/01/24                                                                                                                  *
* Autor: Igor Araujo                                                                                                              *
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instanciando o objeto prisa com as características do prisma client
const prisma = new PrismaClient()

// Inserir um novo filme
const insertFilme = async function(){

}

// Atualizar um Filme existente filtrando pelo ID
const updateFilme = async function(id){

}

// Excluir um Filme existente filtrando pelo ID
const deleteFilme = async function(id){

}

// Listar todos os filmes existentes 
const selectAllFilmes = async function(){
    
    // Script SQL para listar todos os registros
    let sql = 'select * from tbl_filme'
 
    // Executa o scriptSQL no BD e recebe o retorno dos daods na variável rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    // Tratamento de erro para retornar os dados ou retornar false
    if (rsFilmes.length > 0)
        return rsFilmes
    else 
        return false

}

// Buscar o filme existente filtrando pelo ID
const selectByIdFilme = async function(id){
        try {
            // Realiza a busca do Filme pelo ID
            let sql = `select * from tbl_filme where id = ${id}`;
    
            // Executa no Banco de Dados o script SQL
            let rsFilme = await prisma.$queryRawUnsafe(sql);
    
            return rsFilme;
        } catch (error) {
       
        }
    };
    


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}