import NextButton from '@/components/stepped-form/next-button'
import ErrorMessage from '@/components/ui/error-mesage'
import { Input } from '@/components/ui/input'
import { useMultiStepForm } from '@/hooks/use-stepped-form'
import { CombinedCheckoutSchema } from '@/validators/checkout-flow.validator'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

const Step1 = () => {
  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<z.infer<typeof CombinedCheckoutSchema>>()

  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
    const { email } = getValues()

    if (email === 'test@test.com') {
      setError('email', {
        type: 'manual',
        message:
          'Email already exists in the database. Please use a different email.',
      })
      return
    }

    nextStep()
  }

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <Input {...register('email')} placeholder='Email' />
        <ErrorMessage message={errors.email?.message} />
      </div>
      <div>
        <Input {...register('firstName')} placeholder='First Name' />
        <ErrorMessage message={errors.firstName?.message} />
      </div>
      <div>
        <Input {...register('lastName')} placeholder='Last Name' />
        <ErrorMessage message={errors.lastName?.message} />
      </div>
      <NextButton onClick={handleStepSubmit} />
    </div>
  )
}

export default Step1
