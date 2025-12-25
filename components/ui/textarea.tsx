import React from 'react'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, className = '', error, id, rows = 4, ...rest }, ref) => {
  const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        className="block w-full resize-vertical rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
