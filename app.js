/**********************************************************************************************************************************
* Objetivo: Arquivo para realizar as requisições                                                                                  *
* Data: 19/03/2024                                                                                                                *
* Autor: Igor Araujo                                                                                                              *
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/

/***************************************************************************************************
 *  Para realizar a conexão com o Banco de dados precisamos utilizar uma dependência
 *     - SEQUELIZE ORM
 *     - PRISMA ORM
 *     - FASTFY ORM
 *  
 * - Prisma
 *      npm install prisma --save
 *      npm install @prisma/client --save
 *      Após a instalação do prisma, devemos rodar o comando abaixo para incializar o prisma
 *      npx prisma init
 **************************************************************************************************/


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use((request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors())
    
    next();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Import dos arquivos da controller do projeto 
    const controllerFilmes = require ('./controller/controller_filme.js');
    const controllerAtores = require ('./controller/controller_atores.js')
    const controller_genero = require ('./controller/controller_genero.js')
    const controller_classificacao = require ('./controller/controller_classificacao.js')
    const controllerDiretores = require ('./controller/controller_diretores.js')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Criando um objeto para controlar a chegada dos dados da requisição em formato JSON 
const bodyParserJson = bodyParser.json();



//EndPoint : Versão 2.0 - retorna todos os filmes do Banco de Dados 
app.get('/v2/acmefilmes/filmes', cors(),async function (request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});

app.get('/v1/acmefilmes/filmeNome', cors(), async function(request,response,next){

    let nomeFilme = request.query.nome
    let filmeNome = await controllerFilmes.getBuscarFilmeNome(nomeFilme)

        response.json(filmeNome);
        response.status(filmeNome.status_code)
} )

// endPoint: retorna o filme filtrano pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idFilme = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})


// primeiro end point usando POST 
app.post('/v2/acmefilmes/filme', cors(), bodyParserJson, async function (request, response,next ){

// Api reebe o content-tye (API DEVE RECEBER SOMENTE application/json)
    let contentType = request.headers['content-type'];
    

    // recebe o que chegar no corpo da requisição e guardar nessa variável local
    let dadosBody = request.body;
    // encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);


    response.status(resultDadosNovoFilme.status_code);
    response.json(resultDadosNovoFilme);

} )

app.delete('/v1/acmefilmes/deleteFilme/:id', cors (), async function (request,response,next){

    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

app.put('/v1/acmefilmes/updateFilme/:id', cors(), bodyParserJson, async function(request,response,next){

    let idFilme = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body

    let resultUpdateFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType);

    response.status(resultUpdateFilme.status_code)
    response.json(resultUpdateFilme)

    
} )

// EndPoints Atores

app.post('/v2/acmefilmes/ator',  cors(), bodyParserJson, async (request, response, next) =>{

    let contentType = request.headers['content-type']

    //Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body

    //Encaminha os dados para cotroller inserir no BD
    let resultDados = await controllerAtores.setInserirNovoAtor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.get('/v2/acmefilmes/atores', cors(), async (request, response, next) => {

    //Chama a função para retornar os dados de FIlme
    let dadosAtores = await controllerAtores.getListarAtores()

    //Validação para retornar os dados ou o erro 404
    if (dadosAtores) {
        response.json(dadosAtores)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum resgistro encontrado' })
        response.status(404)
    }

})

app.get('/v2/acmefilmes/ator/:id', cors(), async (request, response, next) => {
  
    //Recebe o ID encaminhando a requisição
    let idAtor = request.params.id

    let dadosAtor = await controllerAtores.getBuscarAtor(idAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

app.delete('/v2/acmefilmes/ator/:id',  cors(), bodyParserJson, async (request, response, next) => {
   
    let idAtor = request.params.id
    let dadosAtor = await controllerAtores.setExcluirAtor(idAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

app.put ('/v2/acmefilmes/ator/:id',  cors(), bodyParserJson, async (request, response, next) => {

    let idAtor = request.params.id

    let contentType = request.headers['content-type']

    //Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body

    //Encaminha os dados para cotroller inserir no BD
    let resultDados = await controllerAtores.setAtualizarAtor(dadosBody, contentType, idAtor)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// EndPoints Generos

app.get('/v2/acmefilmes/generos', cors(), async(request, response, next) => {

    let dadosGeneros = await controller_genero.getListarGenero()

    if (dadosGeneros) {
        response.json(dadosGeneros)
        response.status(200)
    } else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.post('/v2/acmefilmes/inserirGenero', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controller_genero.setNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v2/acmefilmes/atualizarGenero/:id', cors(), bodyParserJSON, async(request, response, next) => {
    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controller_genero.setAtualizarGenero(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deletarGenero/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_genero.setExcluirGenero(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarGenero/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_genero.getBuscarGenero(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

// EndPoints Classificação

const controller_classificacao = require('./controller/controller_classificacao.js')

app.get('/v2/acmefilmes/classificacao', cors(), async(request, response, next) => {

    let dadosClassificacao = await controller_classificacao.getListarClassificacao()

    if (dadosClassificacao) {
        response.json(dadosClassificacao)
        response.status(200)
    } else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.post('/v2/acmefilmes/inserirClassificacao', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controller_classificacao.setNovaClassificacao(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v2/acmefilmes/atualizarGenero/:id', cors(), bodyParserJSON, async(request, response, next) => {
    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controller_classificacao.setAtualizarClassificacao(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/acmefilmes/deletarClassificacao/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_classificacao.setExcluirClassificacao(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/buscarClassificacao/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controller_classificacao.getBuscarClassificacao(id)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

// Endpoints Diretores

app.post('/v2/acmefilmes/diretor', cors(), bodyParserJson, async (request, response, next) => {
    let contentType = request.headers['content-type']

    // Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body

    // Encaminha os dados para controller inserir no BD
    let resultDados = await controllerDiretores.setInserirNovoDiretor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/diretores', cors(), async (request, response, next) => {
    // Chama a função para retornar os dados de Diretor
    let dadosDiretores = await controllerDiretores.getListarDiretores()

    // Validação para retornar os dados ou o erro 404
    if (dadosDiretores) {
        response.json(dadosDiretores)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum resgistro encontrado' })
        response.status(404)
    }
})

app.get('/v2/acmefilmes/diretor/:id', cors(), async (request, response, next) => {
    // Recebe o ID encaminhado na requisição
    let idDiretor = request.params.id

    let dadosDiretor = await controllerDiretores.getBuscarDiretor(idDiretor)

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

app.delete('/v2/acmefilmes/diretor/:id', cors(), bodyParserJson, async (request, response, next) => {
    let idDiretor = request.params.id
    let dadosDiretor = await controllerDiretores.setExcluirDiretor(idDiretor)

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

app.put('/v2/acmefilmes/diretor/:id', cors(), bodyParserJson, async (request, response, next) => {
    let idDiretor = request.params.id
    let contentType = request.headers['content-type']

    // Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body

    // Encaminha os dados para controller atualizar no BD
    let resultDados = await controllerDiretores.setAtualizarDiretor(dadosBody, contentType, idDiretor)

    response.status(resultDados.status_code)
    response.json(resultDados)
})


app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições')
})