const { PrismaClient } = require('@prisma/client')
const { ERROR_INTERNAL_SERVER_DB } = require('../../modulo/config')

const prisma = new PrismaClient()

const insertGenero = async function (dadosGenero) {

    try {

        let sql = `insert into tbl_genero (nome) values('${dadosGenero.nome}');`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const getId = async function () {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_genero order by id desc limit 1'

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

const updateGenero = async function (id, dadosGenero) {


    try {
        let sql = `update tbl_genero set nome = '${dadosGenero.nome}' where id = ${id}`
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if (resultStatus)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

const deleteGenero = async function (id) {
    const id_genero = id

    try {
        let sql = `delete from tbl_genero where id = ${id_genero}`

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

const selectAllGenero = async function () {
    try {
        let sql = 'select * from tbl_genero'

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

const selectGeneroByID = async function (id) {
    try {
        let sql = `select * from tbl_genero where id=${id}`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectGeneroByID,
    getId
}