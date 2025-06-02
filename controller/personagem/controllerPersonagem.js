/*********************************************************DOCUMENTAÇÃO*****************************************************************
 * Objetivo: Controller responsável pelo CRUD de dados
 * Data: 27/05/2025
 * Autor(a): Pâmela Xisto
 * Versão: 1.0
 *************************************************************************************************************************************/

// Import do arquivo DAO referente ao CRUD de personagem
const personagemDAO = require('../../model/DAO/personagem.js')

// Import da mensagem de erro/sucesso
const MESSAGE = require('../../modulo/config.js')


// G: Retorna todos os personagens cadastrados
const listarPersonagens = async function (){

    let personagemJSON = {}
    // Chamar a função do DAO para retornar os livros 
    let resultPersonagem = await personagemDAO.selectAllPersonagem()

    if(resultPersonagem){

        //Cria um objeto JSON com características de retorno
        personagemJSON.status = true
        personagemJSON.status_code = 200
        personagemJSON.books = resultPersonagem

        return personagemJSON
    }
    else
        return MESSAGE.ERROR_NOT_FOUND //400
}

// G: Retorna o personagem pelos dados (nome, apelido ou espécie)
const dadosPersonagem = async function (nome, apelido, especie){

    // Validação dos dados
    if ((   nome        == '' || nome       == null    || nome      == undefined) &&
        (   apelido     == '' || apelido    == null    || apelido   == undefined) &&
        (   especie     == '' || especie    == null    || especie   == undefined)){

        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    
    } else {
        let personagemJSON = {}

        let dadosPersonagem = await personagemDAO.selectByData(nome, apelido, especie)
        
        if(dadosPersonagem){
            personagemJSON.status = true
            personagemJSON.status_code = 200
            personagemJSON.books = dadosPersonagem

            return personagemJSON
        }
        else
            return MESSAGE.ERROR_NOT_FOUND //404 
    }
}

// G: Retorna o personagem filtrando pelo ID
const buscarPersonagem = async function (id){

    // Validação para o ID
    if (id == '' || id == null || id == undefined || isNaN(id)){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    } else {

    let personagemJSON = {}

    // Chamar a função do DAO para retornar os livros 
    let resultPersonagem = await personagemDAO.selectByIdPersonagem(id)

    if(resultPersonagem){

        //Cria um objeto JSON com características de retorno
        personagemJSON.status = true
        personagemJSON.status_code = 200
        personagemJSON.books = resultPersonagem

        return personagemJSON
    }
    else
        return MESSAGE.ERROR_NOT_FOUND //404
    }
}

// PO: Função para inserir um novo personagem
const inserirPersonagem = async function(personagem, contentType){

    if (String(contentType).toLowerCase() == 'application/json'){


        // Validação dos dados
        if( personagem.nome                 == '' || personagem.nome                == null || personagem.nome                  == undefined || String(personagem.nome).length > 150 ||
            personagem.apelido              == '' || personagem.apelido             == null || personagem.apelido               == undefined || String(personagem.apelido).length > 150 ||
            personagem.biografia            == '' || personagem.biografia           == null || personagem.biografia             == undefined ||
            personagem.local_nascimento     == '' || personagem.local_nascimento    == null || personagem.local_nascimento      == undefined || String(personagem.local_nascimento).length > 100 ||
            personagem.vestimenta           == '' || personagem.vestimenta          == null || personagem.vestimenta            == undefined ||
            personagem.foto_perfil          == '' || personagem.foto_perfil         == null || personagem.foto_perfil           == undefined || String(personagem.foto_perfil).length > 250 ||
            personagem.especie              == '' || personagem.especie             == null || personagem.especie               == undefined ||
            personagem.nome_criador         == '' || personagem.nome_criador        == null || personagem.nome_criador          == undefined || String(personagem.nome_criador).length > 150
        ){

            return MESSAGE.ERROR_REQUIRED_FIELDS //400

        } else {
            let resultPersonagem = await personagemDAO.insertPersonagem(personagem)

            if(resultPersonagem)
                return MESSAGE.SUCESS_CREATED_ITEM //201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER //500
        }
    } else {
        return MESSAGE.ERROR_CONTENT_TYPE //415
    }
}

// D: Função para excluir
const excluirPersonagem = async function (id){
    // Validação para o ID
    if(id == '' || id == null || id == undefined || isNaN(id)){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    } else {
        // Validação para verificar se o ID existe
        let dadosPersonagem = await personagemDAO.selectByIdPersonagem(id)

        if(dadosPersonagem){
        
            // Função para excluir o personagem do BD existente pelo ID
            let resultPersonagem = await personagemDAO.deletePersonagem(id)

            if(resultPersonagem)
                return MESSAGE.SUCESS_DELETE_ITEM //200
            else
                return MESSAGE.ERROR_INTERNAL_SERVER //500

        // Se não existe caí aqui
        } else {
            return MESSAGE.ERROR_NOT_FOUND //404
        }
    }
}

// PU: Função para atualizar um personagem no BD
const atualizarPersonagem = async function(personagem, id, contentType){

    if (String(contentType).toLowerCase() == 'application/json'){


        // Validação dos dados
        if( id                              == '' ||                             id == null || id                               == undefined || isNaN(id)                                           ||
            personagem.nome                 == '' || personagem.nome                == null || personagem.nome                  == undefined || String(personagem.nome).length > 150                ||
            personagem.apelido              == '' || personagem.apelido             == null || personagem.apelido               == undefined || String(personagem.apelido).length > 150             ||
            personagem.biografia            == '' || personagem.biografia           == null || personagem.biografia             == undefined ||
            personagem.local_nascimento     == '' || personagem.local_nascimento    == null || personagem.local_nascimento      == undefined || String(personagem.local_nascimento).length > 100    ||
            personagem.vestimenta           == '' || personagem.vestimenta          == null || personagem.vestimenta            == undefined ||
            personagem.foto_perfil          == '' || personagem.foto_perfil         == null || personagem.foto_perfil           == undefined || String(personagem.foto_perfil).length > 250         ||
            personagem.especie              == '' || personagem.especie             == null || personagem.especie               == undefined ||
            personagem.nome_criador         == '' || personagem.nome_criador        == null || personagem.nome_criador          == undefined || String(personagem.nome_criador).length > 150
        ){

            return MESSAGE.ERROR_REQUIRED_FIELDS //400

        } else {

            // Função para verificar se o ID existe no BD
            let dadosPersonagem = await personagemDAO.selectByIdPersonagem(id)

            if(dadosPersonagem){

                // Adiciona o id do personagem no JSON de dados
                personagem.id = id

                // Chama a função para atualizar um livro
                let resultPersonagem = await personagemDAO.updatePersonagem(personagem)

                if(resultPersonagem)
                    return MESSAGE.SUCESS_UPDATED_ITEM //200
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER //500
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }
    } else {
        return MESSAGE.ERROR_CONTENT_TYPE //415
    }
}



module.exports = {
    listarPersonagens,
    dadosPersonagem,
    buscarPersonagem,
    inserirPersonagem,
    excluirPersonagem,
    atualizarPersonagem
}