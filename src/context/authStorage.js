const CHAVE_SESSAO = 'todolist:sessao'

function lerUsuarioIdPersistido() {
    return localStorage.getItem(CHAVE_SESSAO)
}

function persistirUsuarioId(usuarioId) {
    if (usuarioId) {
        localStorage.setItem(CHAVE_SESSAO, usuarioId)
    } else {
        localStorage.removeItem(CHAVE_SESSAO)
    }
}

export { lerUsuarioIdPersistido, persistirUsuarioId }