// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();


const selectAllGeneros = async function(){

  try {

    let sql = `select * from tbl_genero`

    let rsGenero = await prisma.$queryRawUnsafe(sql)

    return rsGenero
  } catch (error) {
    return false 
  }

}

const selectGeneroById = async function(id){
        try {
            // Realiza a busca da classificacao pelo ID
            let sql = `select * from tbl_genero where id = ${id}`;
        
            // Executa no banco de dados o script sql
            let rsGenero = await prisma.$queryRawUnsafe(sql);
    
                return rsGenero;
        
            } catch (error) {
                return false;
                
            }
    }

const deleteGeneroById = async function(id){
        try {
            let sql = `delete from tbl_genero where id = ${id}`
    
            let rsGenero = await prisma.$queryRawUnsafe(sql);
            return rsGenero;
            
        } catch (error) {
            return false
            
        }
    }

module.exports = {
    selectAllGeneros,
    selectGeneroById,
    deleteGeneroById
}
