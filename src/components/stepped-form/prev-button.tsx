import { useMultiStepForm } from '@/hooks/use-stepped-form'
import { Button } from '../ui/button'

const PrevButton = () => {
  const { isFirstStep, previousStep } = useMultiStepForm()

  return (
    <Button
      variant='outline'
      type='button'
      className='mt-5'
      onClick={previousStep}
      disabled={isFirstStep}
    >
      Previous
    </Button>
  )
}

export default PrevButton
