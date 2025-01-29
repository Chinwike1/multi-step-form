import { FormProvider, useForm } from 'react-hook-form'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      {/* more providers here */}
      {children}
    </FormProvider>
  )
}
