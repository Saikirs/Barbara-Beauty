import {Link, useLocation} from 'react-router-dom'
import styles from '../styles/components/Header.module.css'
function Header(){
    const {pathname} = useLocation()
    return(
        <header className={styles.header}>
            <Link to="/" className={styles.marca}>Todo List</Link>
            <nav className={styles.nav} aria-label='Navegação principal'>
                <Link to="/" className={styles.link}>Inicio</Link>
                <Link to="/about" className={styles.link}>Sobre</Link>
                {pathname !== '/login' ? (
                    <Link to="Login" className={styles.entrar}>Login</Link>
                ):null}
            </nav>
        </header>
    )
}export {Header}