import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { CombinedCheckoutSchema } from '@/validators/checkout-flow.validator'
import ErrorMessage from '@/components/ui/error-mesage'
import NextButton from '@/components/stepped-form/next-button'

const Step3 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<z.infer<typeof CombinedCheckoutSchema>>()

  const handleStepSubmit = async () => {
    return
  }

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <Input {...register('cardNumber')} placeholder='Card Number' />
        <ErrorMessage message={errors.cardNumber?.message} />
      </div>
      <div>
        <Input {...register('cardholderName')} placeholder='Card Holder Name' />
        <ErrorMessage message={errors.cardholderName?.message} />
      </div>
      <div>
        <Input {...register('cvv')} placeholder='CVV' />
        <ErrorMessage message={errors.cvv?.message} />
      </div>
      <NextButton type='submit' onClick={handleStepSubmit} />
    </div>
  )
}

export default Step3
