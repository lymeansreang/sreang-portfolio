import React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', variant = 'primary', size = 'md', disabled, ...rest }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants: Record<string, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300 disabled:opacity-50',
      ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-300 disabled:opacity-50',
    }

    const sizes: Record<string, string> = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    const cls = [base, variants[variant] ?? variants.primary, sizes[size] ?? sizes.md, className]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={cls} disabled={disabled} {...rest}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
