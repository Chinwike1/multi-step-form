import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMultiStepForm } from '@/hooks/use-stepped-form'
import { checkoutSteps } from '@/pages/home'

export default function ProgressIndicator() {
  const { currentStep, goToStep, currentStepIndex } = useMultiStepForm()

  return (
    <div className='flex items-center w-fulljustify-centerp-4 mb-10'>
      <div className='w-full space-y-8'>
        <div className='relative flex justify-between'>
          {/* Progress Line */}
          <div className='absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200'>
            <motion.div
              className='h-full bg-black'
              initial={{ width: '0%' }}
              animate={{
                width: `${(currentStepIndex / (checkoutSteps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>
          {/* Steps */}
          {checkoutSteps.map((step) => {
            const isCompleted = currentStepIndex > step.position - 1
            const isCurrent = currentStepIndex === step.position - 1

            return (
              <div key={step.position} className='relative z-10'>
                <motion.button
                  onClick={() => goToStep(step.position)}
                  className={`flex size-16 items-center justify-center rounded-full border-2 ${
                    isCompleted || isCurrent
                      ? 'border-primary bg-black text-white'
                      : 'border-gray-200 bg-white text-gray-400'
                  }`}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    transition: { type: 'spring', stiffness: 500, damping: 30 },
                  }}
                >
                  {isCompleted ? (
                    <Check className='h-6 w-6' />
                  ) : (
                    <step.icon className='h-6 w-6' />
                  )}
                </motion.button>
                <div
                  className={`absolute left-1/2 mt-2 -translate-x-1/2 text-sm font-medium ${
                    isCompleted || isCurrent ? 'text-primary' : 'text-gray-500'
                  }`}
                >
                  {step.position}
                </div>
              </div>
            )
          })}
        </div>

        {/* Screen reader progress */}
        <div className='sr-only' role='status' aria-live='polite'>
          {`Step ${currentStep.position} of ${checkoutSteps.length}: ${currentStep.title}`}
        </div>
      </div>
    </div>
  )
}
