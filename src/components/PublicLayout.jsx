import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import styles from '../styles/components/PublicLayout.module.css'
function PublicLayout() {
    return (
        <div className={styles.shell}>
            <a href="#conteudo-principal" className={styles.skipLink}>
                Pular para o conteúdo
            </a>
            <Header />
            <main id="conteudo-principal" className={styles.content}>
                <Outlet />
            </main>
        </div>
    )
} export { PublicLayout }