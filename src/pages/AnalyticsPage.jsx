import { Flame, Percent } from 'lucide-react'
import { Card } from '../components/Card'
import { PageStateBoundary } from '../components/PageStateBoundary'
import { PriorityBadge } from '../components/PriorityBadge'
import { StatCard } from '../components/StatCard'
import { useTasks } from '../hooks/useTasks'
import styles from '../styles/pages/AnalyticsPage.module.css'

const DIAS_JANELA = 7
const FORMATADOR_DIA_SEMANA = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
const ORDEM_PRIORIDADE = ['urgente', 'alta', 'media', 'baixa']

function chaveDiaLocal(data) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`
}

function ultimosDias(n) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  return Array.from({ length: n }, (_, i) => {
    const dia = new Date(hoje)
    dia.setDate(dia.getDate() - (n - 1 - i))
    return dia
  })
}

function concluidasPorDia(tasks, dias) {
  const contagem = new Map(dias.map((dia) => [chaveDiaLocal(dia), 0]))
  tasks.forEach((task) => {
    if (!task.concluidoEm) return
    const chave = chaveDiaLocal(new Date(task.concluidoEm))
    if (contagem.has(chave)) {
      contagem.set(chave, contagem.get(chave) + 1)
    }
  })
  return dias.map((dia) => ({
    chave: chaveDiaLocal(dia),
    label: FORMATADOR_DIA_SEMANA.format(dia),
    quantidade: contagem.get(chaveDiaLocal(dia)),
  }))
}

function pendentesPorPrioridade(tasks) {
  const pendentes = tasks.filter((task) => task.status === 'pendente')
  return ORDEM_PRIORIDADE.map((prioridade) => ({
    prioridade,
    quantidade: pendentes.filter((task) => task.prioridade === prioridade).length,
  }))
}

function AnalyticsPage() {
  const { dado: tasks, carregando, erro, recarregar } = useTasks()
  const todas = tasks ?? []
  const total = todas.length
  const concluidas = todas.filter((task) => task.status === 'concluida').length
  const taxaConclusao = total > 0 ? Math.round((concluidas / total) * 100) : 0
  const dias = ultimosDias(DIAS_JANELA)
  const porDia = concluidasPorDia(todas, dias)
  const concluidasNaJanela = porDia.reduce((soma, dia) => soma + dia.quantidade, 0)
  const maiorPorDia = Math.max(1, ...porDia.map((dia) => dia.quantidade))
  const porPrioridade = pendentesPorPrioridade(todas)
  const maiorPorPrioridade = Math.max(1, ...porPrioridade.map((item) => item.quantidade))

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.subtitle}>Sua produtividade em números.</p>
      </div>

      <PageStateBoundary
        carregando={carregando}
        erro={erro}
        recarregar={recarregar}
        mensagemCarregando="Calculando suas estatísticas..."
      >
        <div className={styles.stats}>
          <StatCard icon={Percent} label="Taxa de conclusão" value={`${taxaConclusao}%`} tone="primary" />
          <StatCard icon={Flame} label="Concluídas em 7 dias" value={concluidasNaJanela} tone="success" />
        </div>

        <Card className={styles.card}>
          <h2 className={styles.cardTitle}>Concluídas por dia</h2>
          <div className={styles.grafic} role="img" aria-label="Gráfico de tarefas concluídas nos últimos 7 dias">
            {porDia.map((dia) => (
              <div key={dia.chave} className={styles.coluna}>
                <span className={styles.columnValue}>{dia.quantidade > 0 ? dia.quantidade : ''}</span>
                <div className={styles.bar} style={{ height: `${(dia.quantidade / maiorPorDia) * 100}%` }} />
                <span className={styles.columnLabel}>{dia.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.card}>
          <h2 className={styles.cardTitle}>Pendentes por prioridade</h2>
          <div className={styles.linesPriority}>
            {porPrioridade.map(({ prioridade, quantidade }) => (
              <div key={prioridade} className={styles.linePriority}>
                <PriorityBadge prioridade={prioridade} />
                <div className={styles.trail}>
                  <div
                    className={styles.trailBar}
                    style={{ width: `${(quantidade / maiorPorPrioridade) * 100}%` }}
                  />
                </div>
                <span className={styles.lineAmount}>{quantidade}</span>
              </div>
            ))}
          </div>
        </Card>
      </PageStateBoundary>
    </div>
  )
}

export { AnalyticsPage }