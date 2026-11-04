import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAtualizarTask } from '../hooks/useAtualizarTask'
import { useCriarTask } from '../hooks/useCriarTask'
import { Button } from './Button'
import { Input } from './Input'
import { Select } from './Select'
import styles from '../styles/components/TaskForm.module.css'

const esquema = z.object({
    titulo: z.string().min(1, 'Informe o título da tarefa.'),
    prioridade: z.enum(['baixa', 'media', 'alta', 'urgente']),
    prazo: z.string().optional(),
})

function TaskForm({ tarefaEmEdicao, aoSalvar, aoCancelar }) {
    const [erroGeral, setErroGeral] = useState(null)
    const editando = !!tarefaEmEdicao
    const idBase = useId()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(esquema),
        defaultValues: {
            titulo: tarefaEmEdicao?.titulo ?? '',
            prioridade: tarefaEmEdicao?.prioridade ?? 'media',
            prazo: tarefaEmEdicao?.prazo ?? '',
        },
    })

    const { criar } = useCriarTask()
    const { atualizar } = useAtualizarTask()

    async function aoSubmeter(dados) {
        setErroGeral(null)
        const payload = { ...dados, prazo: dados.prazo || null }

        try {
            if (editando) {
                await atualizar(tarefaEmEdicao.id, payload)
            } else {
                await criar(payload)
                reset()
            }

            aoSalvar()
        } catch (erro) {
            setErroGeral(erro.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(aoSubmeter)} className={styles.form} noValidate>
            <Input
                label="Título"
                id={`${idBase}-titulo`}
                placeholder="O que você precisa fazer?"
                error={errors.titulo?.message}
                {...register('titulo')}
            />

            <div className={styles.line}>
                <Select label="Prioridade" id={`${idBase}-prioridade`} {...register('prioridade')}>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                </Select>

                <Input
                    label="Prazo (opcional)"
                    id={`${idBase}-prazo`}
                    type="date"
                    {...register('prazo')}
                />
            </div>

            {erroGeral ? (
                <p role="alert" className={styles.erroGeneral}>
                    {erroGeral}
                </p>
            ) : null}

            <div className={styles.actions}>
                {aoCancelar ? (
                    <Button type="button" variant="ghost" onClick={aoCancelar}>
                        Cancelar
                    </Button>
                ) : null}

                <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvando...' : editando ? 'Salvar alterações' : 'Adicionar tarefa'}
                </Button>
            </div>
        </form>
    )
}

export { TaskForm }