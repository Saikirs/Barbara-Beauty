import { useState } from "react";
import { taskService } from '../services/taskService'
function useAtualizarTask(aoConcluir) {
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState(null)
    async function atualizar(id, dadosParciais) {
        setEnviando(true)
        setErro(null)
        try {
            const atualizada = await taskService.atualizar(id, dadosParciais)
            aoConcluir?.(atualizada)
            return atualizada
        } catch (e) {
            setErro(e)
            throw e
        } finally {
            setEnviando(false)
        }
    }
    return { atualizar, enviando, erro }
}
export {useAtualizarTask}