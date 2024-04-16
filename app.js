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
    const controllerGenero = require ('./controller/controller_genero.js')

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

app.get('/v2/acmefilmes/genero', cors(), bodyParserJson, async function (request, response, next){

    let dadosGenero = await controllerGenero.getListarFilmes()

    if(dadosFilme){
        response.json(dadosGenero)
        response.status(200)
    } else {
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404)
    }
})

app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições')
})