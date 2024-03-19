
/**********************************************************************************************************************************
* Objetivo: Arquivo para realizar as requisições                                                                                  *
* Data: 30/01/24                                                                                                                  *
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
 * 
 *      Após a instalação do prisma, devemos rodar o comando abaixo para incializar o prisma
 *      npx prisma init
 **************************************************************************************************/
//app importa funcoes


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



app.post('/v2/acmefilmes/filme', cors(), bodyParserJson, async function (request, response, next ){


    let contentType = request.headers['content-type'];
    

   
    let dadosBody = request.body;

    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);


    response.status(resultDadosNovoFilme.status_code);
    response.json(resultDadosNovoFilme);

} )

app.delete('/v2/acmefilmes/filme', cors(), bodyParserJson, async function (request, response, next){

})

app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})
