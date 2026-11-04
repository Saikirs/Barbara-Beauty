const PREFIXO = 'todolist:mock:'
function chaveDe(colecao) {
    return `${PREFIXO}${colecao}`
}
function readCollection(colecao, fixture) {
    const chave = chaveDe(colecao)
    const bruto = localStorage.getItem(chave)
    if (bruto === null) {
        const semeada = [...fixture]
        localStorage.setItem(chave, JSON.stringify(semeada))
        return semeada
    }

    return JSON.parse(bruto)
}
function writeCollection(colecao, dados) {
    localStorage.setItem(chaveDe(colecao), JSON.stringify(dados))
}
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
function generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
export { readCollection, writeCollection, delay, generateId}