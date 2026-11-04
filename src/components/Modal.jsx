import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from '../styles/components/Modal.module.css'
function Modal ({ open, onClose, title, children }) {
    const titleId = useId()
    const dialogRef = useRef(null)
    const previouslyFocusedRef = useRef (null)
    useEffect(() => {
        if (!open) return
        previouslyFocusedRef.current = document.activeElement
        dialogRef.current?.focus()
        function aoTeclar(evento) {
            if (evento.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', aoTeclar)
        return () => {
            document.removeEventListener('keydown', aoTeclar)
            previouslyFocusedRef.current?.focus?.()
        }
    }, [open, onClose])
    if (!open) return null
    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div
              ref={dialogRef}
              role='dialog'
              aria-modal='true'
              aria-labelledby={titleId}
              tabIndex={-1}
              className={styles.dialog}
              onClick={(evento) => evento.stopPropagation()}
            >
                <div className={styles.header}>
                    <h2 id={titleId} className={styles.title}>
                        {title}
                    </h2>
                    <button type='button' onClick={onClose} aria-label='Fechar' className={styles.closeButton}>
                        <X size={16} aria-hidden='true' />
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body,
    )
}

export { Modal }