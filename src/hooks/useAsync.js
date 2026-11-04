import { useCallback, useEffect, useState } from 'react'
 
function useAsync(funcaoAssincrona) {
  const [dado, setDado] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [tentativa, setTentativa] = useState(0)
 
  useEffect(() => {
    let cancelado = false
    setCarregando(true)
    setErro(null)
 
    funcaoAssincrona()
      .then((resultado) => !cancelado && setDado(resultado))
      .catch((e) => !cancelado && setErro(e))
      .finally(() => !cancelado && setCarregando(false))

    return () => {
      cancelado = true
    }

}, [funcaoAssincrona, tentativa])
 
  const recarregar = useCallback(() => setTentativa((atual) => atual + 1), [])
 
  return { dado, carregando, erro, recarregar }
}
 
export { useAsync }
 
const FORMATADOR_DATA = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' })

 
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