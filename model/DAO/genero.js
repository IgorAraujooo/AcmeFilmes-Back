const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertAtor = async (dadosAtor, idNacionalidade) => {
    try {
        let sql

        if (dadosAtor.data_falecimento == null || dadosAtor.data_falecimento == undefined || dadosAtor.data_falecimento == '') {
            sql = `INSERT INTO tbl_ator (nome, nome_artistico, foto, data_nascimento, id_sexo) VALUES ('${dadosAtor.nome}', '${dadosAtor.nome_artistico}', '${dadosAtor.foto}', '${dadosAtor.data_nascimento}', '${dadosAtor.id_sexo}')`
        } else {
            sql = `INSERT INTO tbl_ator (nome, nome_artistico, foto, data_nascimento, data_falecimento, biografia, id_sexo) VALUES ('${dadosAtor.nome}', '${dadosAtor.nome_artistico}', '${dadosAtor.foto}', '${dadosAtor.data_nascimento}', '${dadosAtor.data_falecimento}', '${dadosAtor.biografia}', '${dadosAtor.id_sexo}')`
        }

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            if (idNacionalidade !== undefined) {
                const insertNacionalidadeQuery = `INSERT INTO tbl_nacionalidade_ator (id_ator, id_nacionalidade) VALUES (LAST_INSERT_ID(), ${idNacionalidade})`
                let nacionalidadeResult = await prisma.$executeRawUnsafe(insertNacionalidadeQuery)

                if (nacionalidadeResult) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (error) {
        console.error("Erro ao inserir ator:", error)
        return false
    }
}

const updateAtor = async (idAtor, dadosAtor) => {
    try {
        let sql

        if (dadosAtor.data_falecimento == null || dadosAtor.data_falecimento == undefined || dadosAtor.data_falecimento == '') {
            sql = `UPDATE tbl_ator SET nome = '${dadosAtor.nome}', nome_artistico = '${dadosAtor.nome_artistico}', biografia = '${dadosAtor.biografia}', data_nascimento = '${dadosAtor.data_nascimento}', foto = '${dadosAtor.foto}', id_sexo = '${dadosAtor.id_sexo}' WHERE id = ${idAtor}`
        } else {
            sql = `UPDATE tbl_ator SET nome = '${dadosAtor.nome}', nome_artistico = '${dadosAtor.nome_artistico}', biografia = '${dadosAtor.biografia}', data_nascimento = '${dadosAtor.data_nascimento}', data_falecimento = '${dadosAtor.data_falecimento}', foto = '${dadosAtor.foto}', id_sexo = '${dadosAtor.id_sexo}' WHERE id = ${idAtor}`
        }

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            if (dadosAtor.id_nacionalidade !== undefined) {
                const nacionalidadeAtualQuery = `SELECT id_nacionalidade FROM tbl_nacionalidade_ator WHERE id_ator = ${idAtor}`
                const nacionalidadeAtualResult = await prisma.$executeRawUnsafe(nacionalidadeAtualQuery)
                const nacionalidadeAtual = nacionalidadeAtualResult[0]?.id_nacionalidade

                if (nacionalidadeAtual !== dadosAtor.id_nacionalidade) {
                    const updateNacionalidadeQuery = `UPDATE tbl_nacionalidade_ator SET id_nacionalidade = ${dadosAtor.id_nacionalidade} WHERE id_ator = ${idAtor}`
                    await prisma.$executeRawUnsafe(updateNacionalidadeQuery)
                }
            }
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error("Erro ao atualizar ator:", error)
        return false
    }
}

const selectId = async () => {
    try {
        let sql = 'SELECT CAST(id AS DECIMAL) AS id FROM tbl_ator ORDER BY id DESC LIMIT 1'
        let rsAtores = await prisma.$queryRawUnsafe(sql)

        if (rsAtores) {
            return rsAtores[0].id
        } else {
            return false
        }
    } catch (error) {
        console.error("Erro ao selecionar ID do ator:", error)
        return false
    }
}

const deleteAtor = async (id) => {
    try {
        let sqlNacionalidade = `DELETE FROM tbl_nacionalidade_ator WHERE id_ator = ${id}`
        await prisma.$executeRawUnsafe(sqlNacionalidade)

        let sqlAtor = `DELETE FROM tbl_ator WHERE id = ${id}`
        await prisma.$executeRawUnsafe(sqlAtor)

        return true
    } catch (error) {
        console.error("Erro ao excluir ator:", error)
        return false
    }
}

const selectByIdAtor = async (id) => {
    try {
        let sql = `SELECT a.*, n.nome AS nome_nacionalidade, s.nome AS nome_sexo FROM tbl_ator a LEFT JOIN tbl_nacionalidade_ator na ON a.id = na.id_ator LEFT JOIN tbl_nacionalidade n ON na.id_nacionalidade = n.id LEFT JOIN tbl_sexo s ON a.id_sexo = s.id WHERE a.id = ${id}`
        let rsAtores = await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        console.error("Erro ao selecionar o ator pelo ID:", error)
        return false
    }
}

const selectAllAtores = async () => {
    try {
        let sql = `SELECT a.*, n.nome AS nome_nacionalidade, s.nome AS nome_sexo FROM tbl_ator a LEFT JOIN tbl_nacionalidade_ator na ON a.id = na.id_ator LEFT JOIN tbl_nacionalidade n ON na.id_nacionalidade = n.id LEFT JOIN tbl_sexo s ON a.id_sexo = s.id`
        let rsAtores = await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        console.error("Erro ao selecionar todos os atores:", error)
        return false
    }
}


module.exports = {
    insertAtor,
    selectId,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    selectByIdAtor
}
