import { Link } from "react-router-dom";
import styles from '../styles/components/LandingCTA.module.css'
import ButtonStyles from '../styles/components/Button.module.css'
function LandingCTA() {
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>pronto para organizar sua rotina?</h2>
            <Link to="/cadastro" className={`
            ${ButtonStyles.button}
            ${ButtonStyles.primary}
            ${ButtonStyles.lg}
            `}>Comece Agora!</Link>
        </section>
    )
} export { LandingCTA }
