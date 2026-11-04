import { createContext, useContext, useEffect, useState } from "react";
import { usuarioService } from "../services/usuarioService";
import { lerUsuarioIdPersistido, persistirUsuarioId } from "./authStorage";
const AuthContext = createContext(null)
function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null)
    const [carregando, setCarregando] = useState(true)
    useEffect(() => {
        let cancelado = false
        async function hidratar() {
            const usuarioIdPersistido = lerUsuarioIdPersistido()
            if (!usuarioIdPersistido) {
                return
            }
            const encontrado = await usuarioService.buscarPorId(usuarioIdPersistido)
            if (cancelado) {
                return
            }
            if (encontrado) {
                setUsuario(encontrado)
            } else {
                persistirUsuarioId(null)
            }
        }
        hidratar().finally(() => !cancelado && setCarregando(false))
        return () => {
            cancelado = true
        }
    }, [])
    async function login(email, senha) {
        const encontrado = await usuarioService.verificarCredenciais(email, senha)
        if (!encontrado) {
            return null
        }
        setUsuario(encontrado)
        persistirUsuarioId(encontrado.id)
        return encontrado
    }
    function logout() {
        setUsuario(null)
        persistirUsuarioId(null)
    }
    async function cadastrar(dados) {
        const novoUsuario = await usuarioService.criar(dados)
        setUsuario(novoUsuario)
        persistirUsuarioId(novoUsuario.id)
        return novoUsuario
    }
    const valor = {
        usuario,
        autenticado: !!usuario,
        carregando,
        login,
        logout,
        cadastrar,
    }
    return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
function useAuth() {
    const contexto = useContext(AuthContext)
    if (!contexto) {
        throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
    }
    return contexto
}
export { AuthProvider, useAuth }