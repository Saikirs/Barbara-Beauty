import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'
import styles from '../styles/components/LoginForm.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '../context/AuthContext'
const esquema = z.object({
    email: z.string().min(1, 'Informe seu e-mail.').email('E-mail inválido.'),
    senha: z.string().min(1, 'Informe sua senha.'),
})
function LoginForm(){
    const {login} = useAuth()
    const navigate = useNavigate()
    const [erroCredenciais, setErroCredenciais] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(esquema )})

    async function aoSubmeter(dados){
        setErroCredenciais(null)
        const usuario = await login(dados.email, dados.senha)

        if (!usuario) {
            setErroCredenciais('E-mail ou senha incorretos.')
            return
        }

        navigate('/dashboard')
    }
    return(
        <Card className={styles.card}>
            <h1 className={styles.title}>Entrar</h1>
            <form
              onSubmit={handleSubmit(aoSubmeter)}
              className={styles.form}
              noValidate
            >
                <Input
                    label='E-mail'
                    id='email'
                    type='email'
                    placeholder='voce@exemplo.com'
                    {...register('email')}
                />
                <Input 
                    label='Senha'
                    id='senha'
                    type='password'
                    placeholder='*******'
                    {...register('senha')}
                />
                {erroCredenciais && (
                    <p role='alert' className={styles.errorGeneral}>
                        {erroCredenciais}
                    </p>
                )}
                <Button type='submit' variant='primary'>
                    Entrar
                </Button>
            </form>
            <p className={styles.footer}>
                Não tem conta? <Link to='/cadastro'>Cadastre-se</Link>
            </p>
            <p className={styles.footer}>
                <Link to='/recuperar-senha'>Esqueci minha senha</Link>    
            </p>
        </Card>
    )

}export {LoginForm}