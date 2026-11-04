import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from "./Input";
import { TermosDeUsoModal } from './TermosDeUsoModal'
import styles from '../styles/components/CadastroForm.module.css'
import { useAuth } from "../context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod'
const esquema = z
    .object ({
        nome: z.string().min(1, 'Informe seu nome.'),
        email: z.string().min(1, 'Informe seu e-mail.').email('E-mail inválido.'),
        senha: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
        confirmarSenha: z.string().min(1, 'Confirme sua senha.'),
        aceiteTermos: z
            .boolean()
            .refine((valor) => valor === true, { message: 'É preciso aceitar os termos de uso.'}),
    })
    .refine((dados) => dados.senha === dados.confirmarSenha, {
        message: 'As senhas não conferem.',
        path: ['confirmarSenha'],
    })
function CadastroForm(){
    const { cadastrar } = useAuth()
    const navigate = useNavigate()
    const [erroCadastro, setErroCadastro] = useState(null)
    const [termosAbertos, setTermosAbertos] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(esquema), defaultValues: {aceiteTermos: false}})

    async function aoSubmeter(dados) {
        setErroCadastro(null)
        try {
            await cadastrar({ nome: dados.nome, email: dados.email, senha: dados.senha })
            navigate('/dashboard')
        } catch (erro) {
            setErroCadastro(erro.message)
        }
    }
    return (
        <Card className={styles.card}>
            <h1 className={styles.title}>Criar conta</h1>

            <form
                onSubmit={handleSubmit(aoSubmeter)}
                className={styles.form}
                noValidate
            >
                <Input
                    label="Nome"
                    id="nome"
                    placeholder="Seu nome"
                    autoComplete="name"
                    {...register('nome')}
                />

                <Input
                    label="E-mail"
                    id="email"
                    type='email'
                    placeholder="voce@exemplo.com"
                    autoComplete="email"
                    {...register('email')}
                />

                <Input
                    label="Senha"
                    id="senha"
                    type='password'
                    placeholder="*******"
                    autoComplete="new-password"
                    {...register('senha')}
                />

                <Input
                    label="Confirmar senha"
                    id="confirmarSenha"
                    type="password"
                    placeholder="*******"
                    autoComplete="new-password"
                    {...register('confirmarSenha')}
                />

                <div className={styles.fieldTerms}>
                    <label className={styles.terms}>
                        <input
                          type='checkbox'
                          className={styles.checkbox}
                          {...register('aceiteTermos')}
                        />

                        <span>
                            Ao continuar, você aceita os {' '}

                            <button
                              type='button'
                              className={styles.linkTerms}
                              onClick={() => setTermosAbertos(true)}
                            >
                                termos de uso
                            </button>

                            {' '}do ToDo List.
                        </span>
                    </label>
                </div>

                {erroCadastro && (
                    <p role='alert' className={styles.errorGeneral}>
                        {erroCadastro}
                    </p>
                )}

                <Button type='submit' variant="primary">
                    Criar conta
                </Button>
            </form>

            <p className={styles.footer}>
                Já tem conta? <Link to='/login'>Entrar</Link>
            </p>

            <TermosDeUsoModal
                open={termosAbertos}
                onClose={() => setTermosAbertos(false)}
            />
        </Card>
    )
}

export { CadastroForm }