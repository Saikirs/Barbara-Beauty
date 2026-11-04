import { Search } from 'lucide-react'
import { Input } from './Input'
import { Select } from './Select'
import styles from '../styles/components/TaskFilters.module.css'

function TaskFilters({ filtros, onChangeFiltros }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} size={16} aria-hidden="true" />
                <Input
                    placeholder="Pesquisar tarefas (mínimo 3 letras)..."
                    aria-label="Pesquisar tarefas"
                    value={filtros.busca}
                    onChange={(evento) => onChangeFiltros({ busca: evento.target.value })}
                    className={styles.search}
                />
            </div>

            <div className={styles.selects}>
                <Select
                    value={filtros.status}
                    onChange={(evento) => onChangeFiltros({ status: evento.target.value })}
                    aria-label="Filtrar por status"
                >
                    <option value="todas">Todos os status</option>
                    <option value="pendente">Pendentes</option>
                    <option value="concluida">Concluídas</option>
                </Select>

                <Select
                    value={filtros.prioridade}
                    onChange={(evento) => onChangeFiltros({ prioridade: evento.target.value })}
                    aria-label="Filtrar por prioridade"
                >
                    <option value="todas">Todas as prioridades</option>
                    <option value="urgente">Urgente</option>
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                </Select>

                <Select
                    value={filtros.ordenarPor}
                    onChange={(evento) => onChangeFiltros({ ordenarPor: evento.target.value })}
                    aria-label="Ordenar por"
                >
                    <option value="recente">Mais recentes</option>
                    <option value="prazo">Prazo mais próximo</option>
                    <option value="prioridade">Prioridade</option>
                </Select>
            </div>
        </div>
    )
}

export { TaskFilters }