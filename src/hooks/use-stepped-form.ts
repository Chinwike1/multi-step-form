import { MultiStepFormContext } from '@/components/stepped-form/stepped-form'
import { useContext } from 'react'

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext)
  if (!context) {
    throw new Error(
      'useMultiStepForm must be used within MultiStepForm.Provider'
    )
  }
  return context
}
