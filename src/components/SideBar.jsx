import { BarChart3, CheckSquare, Home, LogOut } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/components/Sidebar.module.css'
const ITENS = [
    { rota: '/dashboard', rotulo: 'Painel', icon: Home},
    { rota: '/tasks', rotulo: 'Tarefas', icon: CheckSquare},
    { rota: '/analytics', rotulo: 'Analytics', icon: BarChart3},
]
function Sidebar() {
    const { logout } = useAuth()
    function aoSair() {
        logout()
    }
    return (
        <nav className={styles.nav} aria-label='Navegação principal'>
            <Link to='/' className={styles.mark}>
                ToDo List
            </Link>
            <ul className={styles.list}>
                {ITENS.map(({ rota, rotulo, icon}) => {
                    const Icon = icon
                    return (
                        <li key={rota}>
                            <NavLink
                              to={rota}
                              end
                              className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
                            >
                                <Icon size={20} aria-hidden='true' />
                                <span className={styles.itemLabel}>{rotulo}</span>
                            </NavLink>
                        </li>
                    )
                })}
                <li>
                    <button type='button' onClick={aoSair} className={styles.item}>
                        <LogOut size={20} aria-hidden='true' />
                        <span className={styles.itemLabel}>Sair</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export { Sidebar }