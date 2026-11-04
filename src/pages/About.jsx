import {BarChart3, CheckSquare, Component, Icon, Lock, Route, Zap} from "lucide-react"
import { Card } from '../components/Card'
import styles from '../styles/pages/About.module.css'
import { LandingFooter } from "../components/LandingFooter"

const CONCEPTS = [
    {
        icon: Component,
        title: 'Componentização',
        description: 'Design system próprio - Button, Input, Card, Modal e outros, reutilizados em todo o app.',
    },
    {
        icon: Zap, 
        title: 'Hooks',
        description: 'useState, useEffect e hooks customizados (useTasks, useAuth, useAsync).',
    },
    {
        icon: Route, 
        title: 'Roteamento',
        description: 'React Router - rotas protegidas pra quem precisa estar logado.',
    },
    {
        icon: Lock, 
        title: 'Autenticação',
        description: 'Sessão via Context API - hoje mockada, pronta pra virar uma API de verdade.',
    },
    {
        icon: CheckSquare, 
        title: 'Tarefas',
        description: 'Prioridade, prazo, busca e filtros - organizar o que importa, não só listar.',
    },
    {
        icon: BarChart3,
        title: 'Analytics',
        description: 'Taxa de conclusão e evolução ao longo do tempo, num painel de produtividade simples.',
    },
]
function About() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Sobre esta aplição</h1>
                <p className={styles.subtitle}>Conheça mais sobre o projeto</p>
            </div>

            <Card className={styles.card}>
                <p className={styles.description}>
                    Esta é uma aplicação de lista de tarefas (Todo List) desenvolvida com React e Vite - cadastro e login, tarefas com prioridade e prazo, um painel de resumo e um analytics de proatividade. Foi criada com o objetivo de praticar conceitos fundamentais do React:
                </p>

                <div className={styles.grade}>
                    {CONCEPTS.map(({ icon, title, description}) => {
                        const Icon = icon
                        return (
                            <div key={title} className={styles.item}>
                                <span className={styles.iconWrapper} aria-hidden='true'>
                                    <Icon size={20} />
                                </span>
                                <h3 className={styles.itemTitle}>{title}</h3>
                                <p className={styles.itemDescription}>{description}</p>
                            </div> 
                        )
                    })}
                </div>

                <div className={styles.credits}>
                    <p className={styles.creditsLine}>
                        Desenvolvido por <strong className={styles.creditsName}>Gustavo H Giandozo Batista</strong>
                    </p>
                    <p className={styles.creditsLine}>Como parte de um projeto de estudo em React</p>
                </div>
            </Card>
        </div>
    )
}export {About}