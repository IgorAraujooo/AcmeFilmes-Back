//Import da bibiblioteca do prisma client 
const { PrismaClient } = require('@prisma/client')

//Instanciando a classe PrismaClient
const prisma = new PrismaClient()

//Função para inserir um filme no Banco de Dados
const insertAtor = async (dadosAtor) => {
    try {

        let sql

        //Validação para verificar se a data de falecimento é vazia
        if (dadosAtor.data_falecimento == null ||
            dadosAtor.data_falecimento == undefined ||
            dadosAtor.data_falecimento == ''
        ) {
            sql = `insert into tbl_ator (
                                         nome, 
                                         nome_artistico, 
                                         biografia, 
                                         data_nascimento, 
                                         foto, 
                                         id_sexo
                                        ) values (
                                                  '${dadosAtor.nome}', 
                                                  '${dadosAtor.nome_artistico}', 
                                                  '${dadosAtor.biografia}',
                                                  '${dadosAtor.data_nascimento}', 
                                                  '${dadosAtor.foto}', 
                                                  '${dadosAtor.id_sexo}'
                                                )`
        } else {
            sql = `insert into tbl_ator (
                                         nome, 
                                         nome_artistico, 
                                         biografia, 
                                         data_nascimento, 
                                         data_falecimento, 
                                         foto, 
                                         id_sexo
                                        ) values (
                                                  '${dadosAtor.nome}', 
                                                  '${dadosAtor.nome_artistico}',
                                                  '${dadosAtor.biografia}',
                                                  '${dadosAtor.data_nascimento}', 
                                                  '${dadosAtor.data_falecimento}', 
                                                  '${dadosAtor.foto}', 
                                                  '${dadosAtor.id_sexo}'
                                                )`
        }

        // Executando o script SQL para inserir o ator
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const updateAtor = async (idAtor, dadosAtor) => {
    let sql
    try {
        // Validação para verificar se a data de relançamento é vazia, pois devemos ajustar o script SQL para o BD
        if (dadosAtor.data_falecimento == null ||
            dadosAtor.data_falecimento == undefined ||
            dadosAtor.data_falecimento == '') {
            sql = `update tbl_ator set 
                                                nome = '${dadosAtor.nome}',
                                                nome_artistico =  '${dadosAtor.nome_artistico}',
                                                biografia = '${dadosAtor.biografia}',
                                                data_nascimento = '${dadosAtor.data_nascimento}',
                                                foto = '${dadosAtor.foto}',
                                                id_sexo = '${dadosAtor.id_sexo}'
                                                where id = ${idAtor}`
        } else {
            sql = `update tbl_ator set
                                                   nome = '${dadosAtor.nome}',
                                                   nome_artistico =  '${dadosAtor.nome_artistico}',
                                                   biografia = '${dadosAtor.biografia}',
                                                   data_nascimento = '${dadosAtor.data_nascimento}',
                                                   data_falecimento = '${dadosAtor.data_falecimento}',
                                                   foto = '${dadosAtor.foto}',
                                                   id_sexo = '${dadosAtor.id_sexo}'
                    where id = ${idAtor}`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        // Verifica se a atualização foi bem-sucedida
        if (result) {
            // Verifica se a nova nacionalidade foi fornecida nos dados do ator
            if (dadosAtor.id_nacionalidade !== undefined) {
                // Verifica se a nacionalidade atual é diferente da nova nacionalidade fornecida
                const nacionalidadeAtualQuery = `SELECT id_nacionalidade FROM tbl_nacionalidade_ator WHERE id_ator = ${idAtor}`
                const nacionalidadeAtualResult = await prisma.$executeRawUnsafe(nacionalidadeAtualQuery)
                const nacionalidadeAtual = nacionalidadeAtualResult[0]?.id_nacionalidade

                if (nacionalidadeAtual !== dadosAtor.id_nacionalidade) {
                    // Atualiza a nacionalidade do ator na tabela intermediária
                    const updateNacionalidadeQuery = `UPDATE tbl_nacionalidade_ator 
                                                      SET id_nacionalidade = ${dadosAtor.id_nacionalidade} 
                                                      WHERE id_ator = ${idAtor}`
                    await prisma.$executeRawUnsafe(updateNacionalidadeQuery)
                }
            }
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteAtor = async (id) => {
    const idFilme = id
    
    try {
         let sql = `delete from tbl_ator where id = ${idFilme}`
    
         let result = await prisma.$executeRawUnsafe(sql)
    
         if (result) {
             return true
        } else {
            return false
         }
    } catch (error) {
        return false
    }
}

const selectByIdAtor = async (id) => {
    try {
        // Realiza a busca do ator pelo ID
        let sql = `select * from tbl_atores where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsAtores = await prisma.$queryRawUnsafe(sql);

            return rsAtores;
    
        } catch (error) {
            return false;
            
        }
}

const selectAllAtores = async () => {
    // Script sql para listar todos os registros
    let sql = 'select * from tbl_atores order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsAtores
    let rsAtores = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsAtores.length > 0)
     return rsAtores;
     else
        return false

}

const selectId = async () => {
    try {
        let sql = 'select CAST(id as DECIMAL)as id from tbl_ator order by id desc limit 1'

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        if (rsAtores) {
            return rsAtores[0].id // Corrigindo para retornar o ID corretamente
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAtor,
    updateAtor,
    deleteAtor,
    selectId,
    selectByIdAtor,
    selectAllAtores
}

