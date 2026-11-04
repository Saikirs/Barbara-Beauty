import { AlertTriangle, Calendar, CheckCircle2, ClipboardList, Clock, PartyPopper } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { PageStateBoundary } from '../components/PageStateBoundary'
import { PriorityBadge } from '../components/PriorityBadge'
import { StatCard } from '../components/StatCard'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../hooks/useTasks'
import { estaAtrasada, formatarPrazo } from '../utils/tasks'
import styles from '../styles/pages/DashboardPage.module.css'
const MAX_PROXIMAS = 5
function selecionarProximas(tasks) {
    return tasks
        .filter((task) => task.status === 'pendente')
        .sort((a, b) => {
            if (!a.prazo) return 1
            if (!b.prazo) return -1
            return new Date(a.prazo) - new Date(b.prazo)
        })
        .slice (0, MAX_PROXIMAS)
}
function DashboardPage() {
    const { usuario } = useAuth()
    const navigate = useNavigate()
    const { dado: tasks, carregando, erro, recarregar } = useTasks()
    const primeiroNome = usuario?.nome?.split(' ')[0] ?? ''
    const todas = tasks ?? []
    const concluidas = todas.filter((task) => task.status === 'concluida').length
    const pendentes = todas.length - concluidas
    const atrasadas = todas.filter(estaAtrasada).length
    const proximas = selecionarProximas(todas)
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Olá, {primeiroNome}!</h1>
                <p className={styles.subtitle}>Aqui está um resumo das suas tarefas.</p>
            </div>
            <PageStateBoundary
                carregando={carregando}
                erro={erro}
                recarregar={recarregar}
                mensagemCarregando='Carregando seu painel...'
            >
                <div className={styles.stats}>
                    <StatCard icon={ClipboardList} label="Total" value={todas.length} />
                    <StatCard icon={Clock} label='Pendentes' value={pendentes} tone='primary' />
                    <StatCard icon={CheckCircle2} label="Concluídas" value={concluidas} tone='success' />
                    <StatCard icon={AlertTriangle} label="Atrasadas" value={atrasadas} tone='danger' />
                </div>
                <Card className={styles.nextsCard}>
                    <div className={styles.nextsHeader}>
                        <h2 className={styles.nextsTitle}>Próximas tarefas</h2>
                        <Link to='/tasks' className={styles.viewAll}>
                            Ver todas
                        </Link>
                    </div>
                    {proximas.length > 0 ? (
                        <ul className={styles.nextsList}>
                            {proximas.map((task) => (
                                <li key={task.id} className={styles.nextItem}>
                                    <PriorityBadge prioridade={task.prioridade} />
                                    <span className={styles.nextTitle}>{task.titulo}</span>
                                    {task.prazo ? (
                                        <span
                                            className={`${styles.nextTerm} ${estaAtrasada(task) ? styles.nextTermLate : ''}`}
                                        >
                                            {estaAtrasada(task) ? (
                                                <AlertTriangle size={14} aria-hidden='true' />
                                            ) : (
                                                <Calendar size={14} aria-hidden='true' />
                                            )}
                                            {formatarPrazo(task.prazo)}
                                        </span>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    ) :todas.length === 0 ? (
                        <EmptyState
                          icon={ClipboardList}
                          title='Você ainda não tem tarefas'
                          description='Crie a primeira para começar a organizar seu dia.'
                          actionLabel='Criar tarefa'
                          onAction={() => navigate ('/tasks')}
                          titleAs='h3'
                        />
                    ) : (
                        <EmptyState
                            icon={PartyPopper}
                            title='Tudo em dia!'
                            description='Nenhuma tarefa pendente no momento.'
                            titleAs='h3'
                        />
                    )}
                </Card>
            </PageStateBoundary>
        </div>
    )
}

export { DashboardPage }