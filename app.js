/*********************************************************DOCUMENTAÇÃO*****************************************************************
 * Objetivo: API para realizar o CRUD de dados de desenhos
 * Data: 27/05/2025
 * Autor(a): Pâmela Xisto
 * Versão: 1.0
 *************************************************************************************************************************************/
// Model, Controller, App

// Import das bibliotecas para criação da API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Padroniza o tipo de dados do body para JSON no POSTMAN
const bodyParserJSON = bodyParser.json()

// Import das Controllers
const controllerPersonagem = require('./controller/personagem/controllerPersonagem.js')

// Criando o objeto app a ser utilizado na API
const app = express()

// request   - Chegada de dados na API
// response  - Saída de dados da API
app.use((request, response, next)=>{
    // Cabeçalho da requisição
    response.header('Access-Control-Allow-Origin', '*')
    // Configurações dos métodos de acesso da API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})


// Endpoints:

// GET: Retorna todos os personagens
app.get('/v1/disney/personagem', cors(), async function(request, response){

    // Chama a função para retornar todos os livros
    let dadosPersonagem = await controllerPersonagem.listarPersonagens()

        response.status(dadosPersonagem.status_code)
        response.json(dadosPersonagem)
})

// GET: Retorna personagens filtrando por dados (nome, apelido ou especie)
app.get('/v1/disney/personagem/filtro', cors(), async function(request, response){
    let nome = request.query.nome;
    let apelido = request.query.apelido;
    let especie = request.query.especie;

    let dadosPersonagem = await controllerPersonagem.dadosPersonagem(nome, apelido, especie)

    response.status(dadosPersonagem.status_code)
    response.json(dadosPersonagem)
})

// GET: Retorna o personagem pelo ID
app.get('/v1/disney/personagem/:id', cors(), async function(request, response){
    // Recebe a variável via params
    let idPersonagem = request.params.id

    // Chama a função para buscar o livro pelo ID
    let dadosPersonagem = await controllerPersonagem.buscarPersonagem(idPersonagem)

    response.status(dadosPersonagem.status_code)
    response.json(dadosPersonagem)
})

// POST: Inserir um novo personagem
app.post('/v1/disney/personagem', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe os dados do body da requisição
    let dadosBody = request.body

    let result = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

// DELETE: Excluir um personagem pelo ID
app.delete('/v1/disney/personagem/:id', cors(), async function(request, response){
    let idPersonagem = request.params.id

    let result = await controllerPersonagem.excluirPersonagem(idPersonagem)
    
    response.status(result.status_code)
    response.json(result)
})

// PUT: Atualizar personagem
app.put('/v1/disney/personagem/:id', cors(), bodyParserJSON, async function(request, response){
    
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe o ID do livro
    let idPersonagem    = request.params.id
    // Recebe os dados do body
    let dadosBody       = request.body

    let result = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)

    response.status(result.status_code)
    response.json(result)
})


app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições ...')
})