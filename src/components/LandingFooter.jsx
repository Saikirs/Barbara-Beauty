import { Link } from "react-router-dom";
import styles from '../styles/components/LadingFooter.module.css'
function LandingFooter(){
    return(
        <footer className={styles.footer}>
            <span className={styles.marca}>Todo-List</span>
            <nav className={styles.nav}>
                <Link to="/" className={styles.link}>Inicio</Link>
                <Link to="/about" className={styles.link}>Sobre</Link>
                <Link to="/cadastro" className={styles.link}>Cadastro</Link>
                <Link to="/login" className={styles.link}>Login</Link>
            </nav>
            <p className={styles.copyright}>
                Desenvolvido por Gustavo H Giandozo Batista - Projeto de estudo SENAC-TEC
            </p>
        </footer>
    )
} export {LandingFooter}