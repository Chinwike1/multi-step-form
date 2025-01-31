import { ZodType } from 'zod'
import { CombinedCheckoutType } from './validators/checkout-flow.validator'
import { LucideIcon } from 'lucide-react'

type FieldKeys = keyof CombinedCheckoutType

export interface MultiStepFormContextProps {
  currentStep: FormStep
  currentStepIndex: number
  isFirstStep: boolean
  isLastStep: boolean
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
  steps: FormStep[]
}

export type FormStep = {
  title: string
  component: React.ReactElement
  icon: LucideIcon
  position: number
  validationSchema: ZodType<unknown>
  fields: FieldKeys[]
}
export type SavedFormState = {
  currentStepIndex: number
  formValues: Record<string, unknown>
}
