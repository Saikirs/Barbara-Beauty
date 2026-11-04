import {Card} from './Card';
import styles from '../styles/components/LandingFeatures.module.css'
const FUNCIONALIDADES = [
    {
    titulo: "Gerencie suas tarefas",
    descricao: "Crie, Edite, e Conclua suas Tarefas com poucos cliques"
    },
    {
    titulo: "Prioridade e prazo",
    descricao: "Organize suas tarefas por criterios e datas"
    },
    {
    titulo: "Busque por filtros",
    descricao: "Acompanhe de perto a evolução de suas tarefas"
    },
    {
    titulo: "Analytics de produtividade",
    descricao: "Acompanhe quantas tarefas vocês Conclui, sua taxa de Conclusão"
    }
]
function LandingFeatures() {
    return(
    <section id="funcionalidades" className={styles.LandingSection}>
        <h2 className={styles.title}>
            Tudo que você precisa para manter o seu ritmo organizado
        </h2>
        <div className={styles.LadingGrade}>
            {FUNCIONALIDADES.map(({titulo, descricao}) => {
                return(
                    <Card key={titulo} className={styles.item}>
                        <h2 className={styles.itemTitle}>{titulo}</h2>
                        <p className={styles.itemDescription}>{descricao}</p>
                    </Card>
                )
            })}
        </div>
    </section>
    )}export {LandingFeatures}
