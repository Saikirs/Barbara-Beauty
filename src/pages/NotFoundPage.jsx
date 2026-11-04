import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import buttonStyles from '../styles/components/Button.module.css'
import styles from '../styles/pages/NotFoundPage.module.css'
function NotFoundPage() {
    return(
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <span className={styles.code}>404</span>
                <h1 className={styles.title}>Página não encontrada</h1>
                <p className={styles.description}>A página que você procura não existe ou foi movida.</p>
                <Link to='/' className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.md}`}>
                    Voltar para o início
                </Link>
            </Card>
        </div>
    )
}
export {NotFoundPage}