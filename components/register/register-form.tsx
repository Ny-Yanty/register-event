'use client'

import { useState } from 'react'
import { PersonalInfo } from './steps/personal-info'
import { ChooseAppointment } from './steps/chose-appointment'
import { CompletionMessage } from './steps/completion-message'
import { toast } from 'sonner'
import { TimeSlotSelection } from './steps/timeslots/time-slot-selection'
import ChoseUniversity from './steps/chose-university'

export enum PreferredMajor {
  ComputerScience = 'Computer Science',
  BusinessAdministration = 'Business Administration',
  Engineering = 'Engineering',
  Medicine = 'Medicine',
  Law = 'Law',
  Psychology = 'Psychology',
  Education = 'Education',
  ArtsAndDesign = 'Arts and Design',
  Communications = 'Communications',
  Economics = 'Economics',
  Marketing = 'Marketing',
  Biology = 'Biology',
  Chemistry = 'Chemistry',
  Physics = 'Physics',
  Mathematics = 'Mathematics',
  Other = 'Other',
}

export enum EducationLevel {
  Primary = 'Primary',
  Secondary = 'Secondary',
  HighSchool = 'High School',
  AssociateDegree = 'Associate Degree',
  BachelorDegree = "Bachelor's Degree",
  MasterDegree = "Master's Degree",
}
export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export type FormData = {
  fullName: string
  gender: string | undefined
  age: string | undefined
  educationLevel: string | undefined
  schoolName: string | undefined
  preferredMajor: string | undefined
  IELTS: string | undefined
  email: string
  appointmentPreference: 'book_appointment' | 'school' | undefined
  selectedTimeSlot?: {
    date: string
    time: string
  }
}

const STEPS = [
  'Personal Info',
  'Choose Option',
  'Chose University',
  'Chose timeslot',
]

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    gender: undefined,
    age: undefined,
    educationLevel: undefined,
    preferredMajor: undefined,
    schoolName: undefined,
    IELTS: undefined,
    email: '',
    appointmentPreference: undefined,
    selectedTimeSlot: {
      date: '',
      time: '',
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmission = async () => {
    setIsSubmitting(true)
    try {
      // API HERE
      if (formData.appointmentPreference === 'school') {
        setCurrentStep(STEPS.length)
      }
      toast.success('Registration submitted successfully!')
    } catch (error) {
      toast.error('Failed to submit registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = async () => {
    if (formData.appointmentPreference === 'school') {
      await handleSubmission()
    } else if (currentStep === STEPS.length - 1) {
      await handleSubmission()
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }
  const renderStep = () => {
    if (currentStep === STEPS.length) {
      return <CompletionMessage />
    }
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        )
      case 1:
        return (
          <ChooseAppointment
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            isSubmitting={isSubmitting}
          />
        )
      case 2:
        return (
          <ChoseUniversity
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <TimeSlotSelection
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {/* <div className="space-y-4">
        <div className="flex justify-between mb-2">
          {STEPS.map((step, index) => (
            <span
              key={step}
              className={`text-sm ${
                index === currentStep
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div> */}
      {renderStep()}
    </div>
  )
}
