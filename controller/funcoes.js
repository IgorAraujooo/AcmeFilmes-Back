var dados = require('../modulo/filmes')

const getListaDeFilmes = function(){

    var info = dados.filmes.filmes
    let filmesA = []
    let filmesJ = {}

    info.forEach((dados)=>{
        let dadosFinais = {
            nome: dados.nome
            
        }
        filmesA.push(dadosFinais)
    })

    filmesJ.dados = filmesA
    filmesJ.dados = info.length

    return filmesA
    

}
getListaDeFilmes()

module.exports = {
    getListaDeFilmes
}

