interface ErrorMessageProps {
  message?: string // The error message (optional)
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className='h-5 text-sm mt-1 text-rose-400'>{message ? message : null}</p>
  )
}

export default ErrorMessage
