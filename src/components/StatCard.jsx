import { Card } from './Card'
import styles from '../styles/components/StatCard.module.css'

function StatCard({ icon, label, value, tone = 'neutral' }) {
    const Icon = icon
    return (
        <Card className={styles.card}>
            <span className={`${styles.iconWrapper} ${styles[tone]}`} aria-hidden='true'>
                <Icon size={22}/>
            </span>
            <span className={`${styles.value} ${styles[tone]}`}>{value}</span>
            <span className={styles.label}>{label}</span>
        </Card>
    )
}

export {StatCard}