'use client'

import { useState } from 'react'
import { PersonalInfo } from './steps/personal-info'
import { ChooseAppointment } from './steps/chose-appointment'
import { CompletionMessage } from './steps/completion-message'
import { toast } from "sonner";
import { TimeSlot } from './steps/timeslot'
// import { AccountDetails } from "./steps/account-details";
// import { Preferences } from "./steps/preferences";
// import { Verification } from "./steps/verification";
// import { Progress } from "@/components/ui/progress";

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
  Doctorate = 'Doctorate',
  Diploma = 'Diploma',
  Certification = 'Certification',
  Other = 'Other',
}
export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
export enum Schools {
  UniversityOfLeeds = 'University of Leeds',
  RegentsUniversityLondon = "Regent's University London",
  INTOUniversityPartnerships = 'INTO University Partnerships',
  MPWCollege = 'MPW College',
  DLDCollegeLondon = 'DLD College London',
  UniversityOfChester = 'University of Chester',
  UniversityOfHertfordshire = 'University of Hertfordshire',
  UniversityOfGreenwich = 'University of Greenwich',
  UniversityOfNorthampton = 'University of Northampton',
  StudyGroupUK = 'Study Group UK',
  UniversityOfEssex = 'University of Essex',
  UniversityOfExeter = 'University of Exeter',
  KaplanInternationalPathwaysUK = 'Kaplan International Pathways UK',
  CATSGlobalSchools = 'CATS Global Schools',
  SheffieldHallamUniversity = 'Sheffield Hallam University',
  NottinghamTrentUniversity = 'Nottingham Trent University',
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
  timeslot: string | undefined
}

const STEPS = ['Personal Info', 'Account', 'Preferences', 'Verification']

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
    timeslot: undefined
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmission = async () => {
    setIsSubmitting(true);
    try {
      // API HERE
      if (formData.appointmentPreference === "school") {
        setCurrentStep(STEPS.length);
      }
      toast.success("Registration submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = async () => {
    if (formData.appointmentPreference === "school") {
      await handleSubmission();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  }
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

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
          <TimeSlot
            formData={formData}
            updateFormData={updateFormData}
            onPrev={prevStep}
          />
        );
      // case 2:
      //   return (
      //     <Preferences
      //       formData={formData}
      //       updateFormData={updateFormData}
      //       onNext={nextStep}
      //       onPrev={prevStep}
      //     />
      //   );
      // case 3:
      //   return (
      //     <Verification
      //       formData={formData}
      //       updateFormData={updateFormData}
      //       onPrev={prevStep}
      //     />
      //   );
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
