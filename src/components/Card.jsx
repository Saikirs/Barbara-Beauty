import styles from '../styles/components/Card.module.css'
function Card({children,onClick, className='',...props}){
    return(
        <div className={`${styles.card} ${className}`}
        onClick={onClick} {...props}
        >
            {children}
        </div>
    )
} export{Card}