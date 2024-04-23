const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const insertFilme = async function(dadosFilme) {
    
    try {

     let sql;
        if( dadosFilme.data_relancamento == null || 
            dadosFilme.data_relancamento == '' ||
             dadosFilme.data_relancamento == undefined){
             // Script SQL para inserir no banco de dados
            sql = `insert into tbl_filme (
                nome,
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario
            ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.data_lancamento}',
                 null,
                '${dadosFilme.duracao}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
                '${dadosFilme.valor_u}'
            )`;

        }else{
             // Script SQL para inserir no banco de dados
            sql = `insert into tbl_filme (
            nome,
            sinopse,
            data_lancamento,
            data_relancamento,
            duracao,
            foto_capa,
            valor_unitario
        ) values (
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.data_lancamento}',
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.duracao}',
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
        )`;
        }
       
        // Executa o script SQL no banco de dados | Devemos usar execute e não query!
        // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Validação para verificar se o insert funcionou no banco de dados
        if(result )
            return true;
        else
            return false;

    } catch (error) {
        return false;
        
    }
}





const updateFilme = async function(id,dadosFilme){
    try{

        let sql;

        if (dadosFilme.data_relancamento != '' && 
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined
        ){

            sql = `UPDATE tbl_filme SET nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                duracao = '${dadosFilme.duracao}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = '${dadosFilme.data_relancamento}',
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario  = '${dadosFilme.valor_unitario}' 
                where tbl_filme.id = ${id}; `
        } else {
             sql = `UPDATE tbl_filme SET  nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                duracao = '${dadosFilme.duracao}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = null,
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario  = '${dadosFilme.valor_unitario}' 
                 where tbl_filme.id = ${id}; `
        }

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true
        else
            return false;

    } catch (error) {

        return false

    }
}


const deleteFilme = async function (id){
    try {
        let sql = `DELETE FROM tbl_filme WHERE tbl_filme.id = ${id}`;

        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme

    } catch (error) {
        return false
    }
}

const selectIdFilme = async function (){
 
    
    try {

        let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_filme limit 1`
    
        let filmeId = await prisma.$queryRawUnsafe(sql)
         return filmeId
        } catch (error) {
            return false
            
        }   
    }
    

const selectAllFilmes = async function(){

    try {

        let sql = 'select * from tbl_filme';
        //Executa o script SQL no BD e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);
    
    return rsFilmes;
    } catch (error) {
        return false;
    }
 
}
  

const selectByNome = async function (nome){
 
    try {

    let sql = `select * from tbl_filme where nome LIKE "%${nome}%"`
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

        return rsFilmes;
    } catch (error) {
        return false
    }
    
}


const selectByIdFilme = async function (id){

    try {
        
    //script sql para filtrar pelo id
    let sql = `select * from tbl_filme where id = ${id}`;
    //executa o sql no banco de dados
    let rsFilme = await prisma.$queryRawUnsafe(sql);

    return rsFilme;

    } catch (error) {
        return false
    }
}    


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome,
    selectIdFilme
}