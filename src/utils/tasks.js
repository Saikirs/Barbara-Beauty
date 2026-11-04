const FORMATADOR_DATA = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short'})
function formatarPrazo(prazo) {
    return FORMATADOR_DATA.format(new Date(`${prazo}T00:00:00`))
}
function estaAtrasada(task) {
    if (task.status === 'concluida' || !task.prazo) return false
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return new Date(`${task.prazo}T00:00:00`) < hoje
}

export { formatarPrazo, estaAtrasada }