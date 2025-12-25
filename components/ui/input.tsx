import React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className = '', error, id, ...rest }, ref) => {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        id={inputId}
        ref={ref}
        className="block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
