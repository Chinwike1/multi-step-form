import { FormStep } from '@/types'
import Step1 from '@/pages/checkout/step1'
import Step2 from '@/pages/checkout/step2'
import Step3 from '@/pages/checkout/step3'
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from '@/validators/checkout-flow.validator'
import { Star } from 'lucide-react'

export const checkoutSteps: FormStep[] = [
  {
    title: 'Step 1: Personal Information',
    component: <Step1 />,
    icon: Star,
    position: 1,
    validationSchema: step1Schema,
    fields: ['email', 'firstName', 'lastName'],
  },
  {
    title: 'Step 2: Address Details',
    component: <Step2 />,
    icon: Star,
    position: 2,
    validationSchema: step2Schema,
    fields: ['country', 'city', 'shippingAddress', 'postalCode'],
  },
  {
    title: 'Step 3: Bank Name',
    component: <Step3 />,
    icon: Star,
    position: 3,
    validationSchema: step3Schema,
    fields: ['cardNumber', 'cardholderName', 'cvv'],
  },
]
