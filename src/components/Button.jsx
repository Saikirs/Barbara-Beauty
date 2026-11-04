import styles from '../styles/components/Button.module.css'

function Button({ variant = 'primary', size = 'md', className= '', children, ...props}) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export{Button}