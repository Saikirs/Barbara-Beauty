import { Card } from "./Card";
import {Check} from 'lucide-react'
import styles from'../styles/components/LandingBenefits.module.css'
const BENEFICIOS = [
    'nunca mais esqueça um prazo importante',
    'foque primeiro no que tem prioridade alta',
    'veja sua produtividade evoluir com dados reais',
    'simples desde o primeiro uso, fácil e intuitivo'
]
function LandingBenefits(){
    return (
        <section className={styles.section}>
            <Card className={styles.card}>
                <h2 className={styles.title}>Por que usar o todo-list?</h2>
                <ul className={styles.list}>
                    {BENEFICIOS.map((beneficios) =>(
                        <li key={beneficios} className={styles.item}>
                            <span className={styles.check} aria-hidden="true">
                                <Check size={14} strokeWidth={3}/>
                            </span>
                            {beneficios}
                        </li>
                    ))}
                </ul>
            </Card>
        </section>
    )}export {LandingBenefits}