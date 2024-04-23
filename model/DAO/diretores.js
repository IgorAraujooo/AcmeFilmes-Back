//Import da bibiblioteca do prisma client 
const { PrismaClient } = require('@prisma/client')

//Instanciando a classe PrismaClient
const prisma = new PrismaClient()

//Função para inserir um filme no Banco de Dados
const insertDiretor = async (dadosDiretor) => {
    try {

        let sql

        //Validação para verificar se a data de falecimento é vazia
        if (dadosDiretor.data_falecimento == null ||
            dadosDiretor.data_falecimento == undefined ||
            dadosDiretor.data_falecimento == ''
        ) {
            sql = `insert into tbl_diretor (
                                         nome, 
                                         nome_artistico, 
                                         biografia, 
                                         data_nascimento, 
                                         foto, 
                                         id_sexo
                                        ) values (
                                                  '${dadosDiretor.nome}', 
                                                  '${dadosDiretor.nome_artistico}', 
                                                  '${dadosDiretor.biografia}',
                                                  '${dadosDiretor.data_nascimento}', 
                                                  '${dadosDiretor.foto}', 
                                                  '${dadosDiretor.id_sexo}'
                                                )`
        } else {
            sql = `insert into tbl_diretor (
                                         nome, 
                                         nome_artistico, 
                                         biografia, 
                                         data_nascimento, 
                                         data_falecimento, 
                                         foto, 
                                         id_sexo
                                        ) values (
                                                  '${dadosDiretor.nome}', 
                                                  '${dadosDiretor.nome_artistico}',
                                                  '${dadosDiretor.biografia}',
                                                  '${dadosDiretor.data_nascimento}', 
                                                  '${dadosDiretor.data_falecimento}', 
                                                  '${dadosDiretor.foto}', 
                                                  '${dadosDiretor.id_sexo}'
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

const updateDiretor = async (idDiretor, dadosDiretor) => {
    let sql
    try {
        // Validação para verificar se a data de relançamento é vazia, pois devemos ajustar o script SQL para o BD
        if (dadosDiretor.data_falecimento == null ||
            dadosDiretor.data_falecimento == undefined ||
            dadosDiretor.data_falecimento == '') {
            sql = `update tbl_diretor set 
                                                nome = '${dadosDiretor.nome}',
                                                nome_artistico =  '${dadosDiretor.nome_artistico}',
                                                biografia = '${dadosDiretor.biografia}',
                                                data_nascimento = '${dadosDiretor.data_nascimento}',
                                                foto = '${dadosDiretor.foto}',
                                                id_sexo = '${dadosDiretor.id_sexo}'
                                                where id = ${idDiretor}`
        } else {
            sql = `update tbl_diretor set
                                                   nome = '${dadosDiretor.nome}',
                                                   nome_artistico =  '${dadosDiretor.nome_artistico}',
                                                   biografia = '${dadosDiretor.biografia}',
                                                   data_nascimento = '${dadosDiretor.data_nascimento}',
                                                   data_falecimento = '${dadosDiretor.data_falecimento}',
                                                   foto = '${dadosDiretor.foto}',
                                                   id_sexo = '${dadosDiretor.id_sexo}'
                    where id = ${idDiretor}`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        // Verifica se a atualização foi bem-sucedida
        if (result) {
            // Verifica se a nova nacionalidade foi fornecida nos dados do diretor
            if (dadosDiretor.id_nacionalidade !== undefined) {
                // Verifica se a nacionalidade atual é diferente da nova nacionalidade fornecida
                const nacionalidadeAtualQuery = `SELECT id_nacionalidade FROM tbl_nacionalidade_diretor WHERE id_diretor = ${idDiretor}`
                const nacionalidadeAtualResult = await prisma.$executeRawUnsafe(nacionalidadeAtualQuery)
                const nacionalidadeAtual = nacionalidadeAtualResult[0]?.id_nacionalidade

                if (nacionalidadeAtual !== dadosDiretor.id_nacionalidade) {
                    // Atualiza a nacionalidade do diretor na tabela intermediária
                    const updateNacionalidadeQuery = `UPDATE tbl_nacionalidade_diretor
                                                      SET id_nacionalidade = ${dadosDiretor.id_nacionalidade} 
                                                      WHERE id_diretor = ${idDiretor}`
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

const deleteDiretor = async (id) => {
    const idFilme = id
    
    try {
         let sql = `delete from tbl_diretor where id = ${idFilme}`
    
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

const selectByIdDiretor = async (id) => {
    try {
        // Realiza a busca do ator pelo ID
        let sql = `select * from tbl_diretor where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsDiretores = await prisma.$queryRawUnsafe(sql);

            return rsDiretores;
    
        } catch (error) {
            return false;
            
        }
}

const selectAllDiretores = async () => {
    // Script sql para listar todos os registros
    let sql = 'select * from tbl_diretor order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsAtores
    let rsDiretores = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsDiretores.length > 0)
     return rsDiretores;
     else
        return false

}

const selectId = async () => {
    try {
        let sql = 'select CAST(id as DECIMAL)as id from tbl_diretor order by id desc limit 1'

        let rsDiretores = await prisma.$queryRawUnsafe(sql)

        if (rsDiretores) {
            return rsDiretores[0].id // Corrigindo para retornar o ID corretamente
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectId,
    selectByIdDiretor,
    selectAllDiretores
}

