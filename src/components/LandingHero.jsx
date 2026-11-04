import { Link } from "react-router-dom";
import styles from '../styles/components/LandingHero.module.css';
import ButtonStyles from '../styles/components/Button.module.css';
function LandingHero() {
    return (
        <section className={styles.hero}>
            <span className={styles.badge}>Grátis, Sem pagar nada</span>
            <h1 className={styles.title}>Organize suas tarefas e visualize sua produtividade</h1>
            <p className={styles.subtitle}>Crie, priorize e acompanhe suas tarefas num só lugar -
                e enxergue, com dados de verdade, como sua rotina evolui.
            </p>
            <div className={styles.CTA}>
                <Link to="/login" className={`
                ${ButtonStyles.button} 
                ${ButtonStyles.primary}
                ${ButtonStyles.lg}`}>Comece agora</Link>
                <a href="#funcionalidades" 
                className={`
                ${ButtonStyles.button} 
                ${ButtonStyles.secondary}
                ${ButtonStyles.lg}`}>
                    Veja como Funciona
                </a>
            </div>
        </section>
    )
} export { LandingHero }