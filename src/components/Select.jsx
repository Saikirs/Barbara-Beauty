import { forwardRef } from 'react'
import styles from '../styles/components/Select.module.css'

const Select = forwardRef(function Select(
  { label, id, error, className = '', children, ...props },
  ref,
) {
  return (
    <div className={styles.field}>
      {label ? (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}

      <select
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={`${styles.select} ${error ? styles.selectError : ''} ${className}`}
        {...props}
      >
        {children}
      </select>

      {error ? (
        <span role="alert" className={styles.errorText}>
          {error}
        </span>
      ) : null}
    </div>
  )
})

export { Select }