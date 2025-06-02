/*********************************************************DOCUMENTAÇÃO*****************************************************************
 * Objetivo: Model responsável pelo CRUD de dados no Banco de Dados
 * Data: 27/05/2025
 * Autor(a): Pâmela Xisto
 * Versão: 1.0
 *************************************************************************************************************************************/

// Import da biblioteca da manipulação SQL
const { PrismaClient, Prisma } = require('@prisma/client')

// Cria um objeto do prisma client para ser utilizado
const prisma = new PrismaClient()


// Função para retornar todos os personagens do BD
const selectAllPersonagem = async function(){
    // Script SQL para listar todos os personagens
    let sql = 'select * from tbl_personagem order by id desc'
    
    // Executa o script SQL no BD e aguarda o retorno
    let rsPersonagens = await prisma.$queryRawUnsafe(sql)

    if(rsPersonagens.length > 0)
        return rsPersonagens
    else
        return false
}

// Função para retornar pelos dados (nome, apelido ou espécie)
const selectByData = async function(nome, apelido, especie){
    let sql = `select * from tbl_personagem where nome like '%${nome}%'
                                            OR apelido like '%${apelido}%'
                                            OR especie like '%${especie}%'`;

    let rsPersonagens = await prisma.$queryRawUnsafe(sql)

    if(rsPersonagens.length > 0)
        return rsPersonagens
    else
        return false
}

// Função para buscar um livro pelo ID
const selectByIdPersonagem = async function(id){
    // Script SQL para listar todos os personagens
    let sql = 'select * from tbl_personagem where id='+id
    
    // Executa o script SQL no BD e aguarda o retorno
    let rsPersonagens = await prisma.$queryRawUnsafe(sql)

    if(rsPersonagens.length > 0)
        return rsPersonagens
    else
        return false
}

// Função para inserir um novo livro no BD
const insertPersonagem = async function(personagem){
    let sql = `insert into tbl_personagem ( nome, 
                                            apelido, 
                                            biografia, 
                                            local_nascimento, 
                                            vestimenta, 
                                            foto_perfil, 
                                            especie, 
                                            nome_criador) values(
                                            '${personagem.nome}',
                                            '${personagem.apelido}',
                                            '${personagem.biografia}',
                                            '${personagem.local_nascimento}',
                                            '${personagem.vestimenta}',
                                            '${personagem.foto_perfil}',
                                            '${personagem.especie}',
                                            '${personagem.nome_criador}'
                                            )`
    let resultPersonagem = await prisma.$executeRawUnsafe(sql)

    if(resultPersonagem)
        return true
    else
        return false
}

// Função para excluir um personagem pelo ID
const deletePersonagem = async function (id) {
    let sql = 'delete from tbl_personagem where id='+id

    let resultPersonagem = await prisma.$executeRawUnsafe(sql)
    
    if(resultPersonagem)
        return true
    else    
        return false
}

// Função para atualizar um livro no BD
const updatePersonagem = async function(personagem){
    let sql = `update tbl_personagem set            nome                = '${personagem.nome}',
                                                    apelido             = '${personagem.apelido}',
                                                    biografia           = '${personagem.biografia}',
                                                    local_nascimento    = '${personagem.local_nascimento}',
                                                    vestimenta          = '${personagem.vestimenta}',
                                                    foto_perfil         = '${personagem.foto_perfil}',
                                                    especie             = '${personagem.especie}',
                                                    nome_criador        = '${personagem.nome_criador}'

                                                    where id = ${personagem.id}`

    let resultPersonagem = await prisma.$executeRawUnsafe(sql)

    if(resultPersonagem)
        return true
    else
        return false
}


module.exports = {
    selectAllPersonagem,
    selectByData,
    selectByIdPersonagem,
    insertPersonagem,
    deletePersonagem,
    updatePersonagem
}