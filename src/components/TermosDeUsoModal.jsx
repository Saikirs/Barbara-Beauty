import { Modal } from "./Modal";
import styles from '../styles/components/TermosDeUsoModal.module.css'
function TermosDeUsoModal({ open, onClose }) {
    return (
        <Modal open={open} onClose={onClose} title="Termos de Uso">
            <div className={styles.content}>
                <section>
                    <h4 className={styles.section}>1. O que é o ToDo List</h4>
                    <p>
                        O ToDo List é uma aplicação de organização de tarefas, criada como projeto de estudo do curso Desenvolvedor Full Stack (SENAC). Ao criar uma conta, você concorda com estes termos.
                    </p>
                </section>
                <section>
                    <h4 className={styles.section}>2. Dados que pedimos</h4>
                    <ul className={styles.list}>
                        <li>Dados de cadastro: nome, e-mail e senha.</li>
                        <li>Dados de uso: as tarefas que você criar (título, prioridade, prazo e status).</li>
                    </ul>
                </section>
                <section>
                    <h4 className={styles.section}>3. Pra que usamos</h4>
                    <p>Só pra você acessar sua própria conta e ver suas próprias tarefas - nada além disso.</p>
                </section>
                <section>
                    <h4 className={styles.section}>4. Onde tudo fica guardado</h4>
                    <p>
                        Este é um projeto didático - não existe servidor real por trás dele. Sua conta e suas tarefas ficam salvas só no armazenamento local do seu navegador, nunca são enviadas para lugar nenhum.
                    </p>
                </section>
                <section>
                    <h4 className={styles.section}>5. Apagar seus dados</h4>
                    <p>
                        Você pode excluir suas tarefas a qualquer momento pelo próprio app, ou apagar tudo de uma vez limpando os dados do site nas configurações do navegador.
                    </p>
                </section>
                <p className={styles.warn}>
                    Projeto didático (SENAC - Desenvolvedor Full Stack). Nenhum dado é enviado a servidores reais; tudo é simulado e armazenado só no seu navegador.
                </p>
            </div>
        </Modal>)} export {TermosDeUsoModal}