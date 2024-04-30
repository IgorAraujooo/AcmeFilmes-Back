const { PrismaClient } = require('@prisma/client')
const { ERROR_INTERNAL_SERVER_DB } = require('../../modulo/config')

const prisma = new PrismaClient()

const insertClassificacao = async function(dadosCategoria) {
    try {
        let sql = `insert into tbl_classificacao (
                                                    nome, 
                                                    sigla, 
                                                    descricao, 
                                                    icone
        ) values(
                    '${dadosCategoria.nome}',
                    '${dadosCategoria.sigla}',
                    '${dadosCategoria.descricao}',
                    '${dadosCategoria.icone}'
        );`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_classificacao order by id desc limit 1'

        let resultGet = await prisma.$queryRawUnsafe(sqlGet)

        if (resultGet) {
            return resultGet
        } else {
            return false
        }
    } catch (error) {
        return ERROR_INTERNAL_SERVER_DB
    }
}

const updateClassificacao = async function(id, novosDados) {
    try {
        let sql = `update tbl_classificacao set`

        const keys = Object.keys(novosDados)

        keys.forEach((key, index) => {
            sql += `${key} = '${novosDados[key]}'`
            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += `where id = ${id}`

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

const deleteClassificacao = async function(id) {
    const id_classificacao = id

    try {
        let sql = `delete from tbl_classificacao where id = ${id_classificacao}`

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

const selectAllClassificacao = async function() {
    try {
        let sql = 'select * from tbl_classificacao'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectClassificacaoByID = async function(id) {
    try {
        let sql = `select * from tbl_classificacao where id=${id}`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}


module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selectClassificacaoByID,
    getId
}