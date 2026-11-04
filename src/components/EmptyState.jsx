import { Button } from './Button'
import styles from '../styles/components/EmptyState.module.css'

function EmptyState({ icon, title, description, actionLabel, onAction, titleAs = 'h2'}) {
    const Icon = icon
    const Titulo = titleAs
    return (
        <div className={styles.wrapper}> 
            <span className={styles.iconWrapper} aria-hidden='true'>
                <Icon size={28} />
            </span>
            <Titulo className={styles.title}>{title}</Titulo>
            {description ? <p className={styles.description}>{description}</p> : null}
            {actionLabel && onAction ? (
                <Button type='button' variant='secondary' size='sm' onClick={onAction} className={styles.action}>
                    {actionLabel}
                </Button>
            ) : null}
        </div>
    )
}

export { EmptyState }