import { delay, generateId, readCollection, writeCollection } from './mockStorage'
const COLECAO = 'tasks'
const tasksFixture = [
    {
        id: 'task-1',
        usuarioId: 'usuario-1',
        titulo: 'Revisar proposta do cliente',
        status: 'pendente',
        prioridade: 'urgente',
        prazo: '2026-01-05',
        criadoEm: '2026-01-01T10:00:00.000Z',
        atualizadoEm: '2026-01-01T10:00:00.000Z',
        concluidoEm: null,
    },
    {
        id: 'task-2',
        usuarioId: 'usuario-1',
        titulo: 'Organizar planilha de gastos',
        status: 'pendente',
        prioridade: 'media',
        prazo: '2026-01-20',
        criadoEm: '2026-01-02T09:00:00.000Z',
        atualizadoEm: '2026-01-02T09:00:00.000Z',
        concluidoEm: null,
    },
]

function getAll() {
    return readCollection(COLECAO, tasksFixture)
}
async function listarPorUsuario(usuarioId) {
    await delay(300)
    return getAll().filter((task) => task.usuarioId === usuarioId)
}
async function criar(dados) {
    await delay(400)
    const agora = new Date().toISOString()
    const novaTask = {
        ...dados,
        id: generateId('taks'),
        status: 'pendente',
        criadoEm: agora,
        atualizadoEm: agora,
        concluidoEm: null,
    }
    writeCollection(COLECAO, [novaTask, ...getAll()])
    return novaTask
}
async function atualizar(id, dadosParciais) {
    await delay(300)
    const tasks = getAll()
    const index = tasks.findIndex((task) => task.id === id)
    if (index === -1) {
        throw new Error('Tarefa não encontrada.')
    }
    const atual = tasks[index]
    const vaiConcluir = dadosParciais.status === 'concluida' && atual.status !== 'concluida'
    const vaiReabrir = dadosParciais.status === 'pendente' && atual.status === 'concluida'
    const atualizada = {
        ...atual,
        ...dadosParciais,
        atualizadoEm: new Date().toISOString(),
        concluidoEm: vaiConcluir
            ? new Date().toISOString()
            : vaiReabrir
              ? null
              : atual.concluidoEm,  
    }
    const proximas = [...tasks]
    proximas[index] = atualizada
    writeCollection(COLECAO, proximas)
    return atualizada
}
async function remover(id) {
    await delay(300)
    const tasks = getAll()
    writeCollection(
        COLECAO,
        tasks.filter((task) => task.id !== id),
    )
}
const taskService = {
    listarPorUsuario,
    criar,
    atualizar,
    remover,
}
export { taskService }