import { Outlet } from "react-router-dom";

import { Sidebar } from './SideBar';
import styles from '../styles/components/AuthenticatedLayout.module.css'

function AuthenticatedLayout() {
    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <main id='conteudo-principal' className={styles.content}>
                <Outlet />
            </main>
        </div>
    )
}

export {AuthenticatedLayout}