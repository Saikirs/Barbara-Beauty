import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { taskService } from '../services/taskService'
function useCriarTask(aoConcluir) {
    const { usuario } = useAuth()
    const [enviando, setEnviando] = useState(false)
    const [erro, setErro] = useState(null)

    async function criar(dados) {
        setEnviando(true)
        setErro(null)
        try {
            const nova = await taskService.criar({ ...dados, usuarioId: usuario.id })
            aoConcluir?.(nova)
            return nova
        }   catch (e) {
            setErro(e)
            throw e
        }   finally {
            setEnviando(false)
        }
    }

    return { criar, enviando, erro }
}
export { useCriarTask }