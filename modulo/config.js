/*********************************************************DOCUMENTAÇÃO*****************************************************************
 * Objetivo: Arquivo de configuração de mensagens de erros ou acertos
 * Data: 27/05/2025
 * Autor(a): Pâmela Xisto
 * Versão: 1.0
 *************************************************************************************************************************************/


const ERROR_NOT_FOUND           = {status: false, status_code: 404, message: 'Nenhum item encontrado!!!'}
const ERROR_REQUIRED_FIELDS     = {status: false, status_code: 400, message: 'Não foi possível processar a requisição, pois os dados encaminhados não são válidos ou não foram encaminhados!!!'}
const ERROR_INTERNAL_SERVER     = {status: false, status_code: 500, message: 'Não foi possível processar a requisição, pois houveram erros internos no servidor!!!'}
const ERROR_CONTENT_TYPE        = {status: false, status_code: 415, message: 'Não foi possível processar a requisição, pois o tipo de dados do body deve ser apenas JSON!!!'}


const SUCESS_CREATED_ITEM       = {status: true, status_code: 201, message: 'Item criado com sucesso!!!'}
const SUCESS_UPDATED_ITEM       = {status: true, status_code: 200, message: 'Item atualizado com sucesso!!!'}
const SUCESS_DELETE_ITEM        = {status: true, status_code: 200, message: 'Item excluído com sucesso!!!'}


module.exports = {
    ERROR_NOT_FOUND,
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER,
    ERROR_CONTENT_TYPE,
    SUCESS_CREATED_ITEM,
    SUCESS_DELETE_ITEM,
    SUCESS_UPDATED_ITEM
}