import { z } from 'zod'
import { createContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormStep, MultiStepFormContextProps, SavedFormState } from '@/types'
import PrevButton from '@/components/stepped-form/prev-button'
import { FormProvider, useForm } from 'react-hook-form'
import {
  CombinedCheckoutSchema,
  CombinedCheckoutType,
} from '@/validators/checkout-flow.validator'
import ProgressIndicator from './progress-indicator'
import { useLocalStorage } from '@mantine/hooks'
import { useToast } from '@/hooks/use-toast'

// eslint-disable-next-line react-refresh/only-export-components
export const MultiStepFormContext =
  createContext<MultiStepFormContextProps | null>(null)

const MultiStepForm = ({
  steps,
  localStorageKey = 'multi-step-form',
}: {
  steps: FormStep[]
  localStorageKey: string
}) => {
  const methods = useForm<z.infer<typeof CombinedCheckoutSchema>>({
    resolver: zodResolver(CombinedCheckoutSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      shippingAddress: '',
      cardholderName: '',
      cardNumber: '',
      cvv: '',
    },
  })

  const { toast } = useToast()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const currentStep = steps[currentStepIndex]

  const [savedFormState, setSavedFormState] =
    useLocalStorage<SavedFormState | null>({
      key: localStorageKey,
      defaultValue: null,
    })

  // Restore form state from LS
  useEffect(() => {
    if (savedFormState) {
      setCurrentStepIndex(savedFormState.currentStepIndex)
      methods.reset(savedFormState.formValues)
    }
  }, [methods, savedFormState])

  const saveFormState = (stepIndex: number) => {
    const formValues = methods.getValues()
    setSavedFormState({
      currentStepIndex: stepIndex ?? currentStepIndex,
      formValues,
    })
  }

  const clearFormState = () => {
    setSavedFormState(null)
    setCurrentStepIndex(0)
    methods.reset()
    window.localStorage.removeItem(localStorageKey)
  }

  const nextStep = async () => {
    const isValid = await methods.trigger(currentStep.fields)

    if (!isValid) {
      return
    }

    // grab values in current step and transform values to object
    const currentStepValues = methods.getValues(currentStep.fields)
    const formValues = Object.fromEntries(
      currentStep.fields.map((field, index) => [
        field,
        currentStepValues[index] || '',
      ])
    )

    // validate form values against schema and set errors
    if (currentStep.validationSchema) {
      const validationResult =
        currentStep.validationSchema.safeParse(formValues)

      if (!validationResult.success) {
        validationResult.error.errors.forEach((err) => {
          methods.setError(err.path.join('.') as keyof CombinedCheckoutType, {
            type: 'manual',
            message: err.message,
          })
        })
        return
      }
    }

    if (currentStepIndex < steps.length - 1) {
      saveFormState(currentStepIndex + 1)
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const previousStep = () => {
    if (currentStepIndex > 0) {
      saveFormState(currentStepIndex - 1)
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const goToStep = (position: number) => {
    if (position >= 0 && position - 1 < steps.length) {
      saveFormState(position - 1)
      setCurrentStepIndex(position - 1)
    }
  }

  async function submitSteppedForm(
    data: z.infer<typeof CombinedCheckoutSchema>
  ) {
    try {
      // Perform your form submission logic here
      console.log('data', data)
      toast({
        title: 'Form Submitted Successfully!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      clearFormState()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const value: MultiStepFormContextProps = {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goToStep,
    nextStep,
    previousStep,
    steps,
  }

  return (
    <MultiStepFormContext.Provider value={value}>
      <FormProvider {...methods}>
        <div className='w-[550px] mx-auto'>
          <ProgressIndicator />
          <form onSubmit={methods.handleSubmit(submitSteppedForm)}>
            <h1 className='py-5 text-3xl font-bold'>{currentStep.title}</h1>
            {currentStep.component}
            <PrevButton />
          </form>
        </div>
      </FormProvider>
    </MultiStepFormContext.Provider>
  )
}

export default MultiStepForm
