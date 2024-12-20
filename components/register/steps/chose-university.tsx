import React, { useState } from 'react'
import { FormData } from '../register-form'
import { Button } from '@/components/ui/button'
import { universities } from '@/data/universities'

type UniChoicesProps = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function ChoseUniversity({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: UniChoicesProps) {
  const [selected, setSelected] = useState<string | null>(
    formData.schoolName || null
  )

  const handleOptionSelect = (schoolName: string) => {
    setSelected(schoolName)
    updateFormData({ schoolName })
  }

  const handleNext = () => {
    if (selected) {
      onNext()
    }
  }
  return (
    <div className=" flex gap-2 flex-col">
      <div className="flex flex-wrap gap-2">
        {universities.map((x) => (
          <Button  className={`  ${selected == x? 'bg-[#bd9400]': 'bg-transparent'} border-2`} onClick={() => handleOptionSelect(x)}>
            {x}
          </Button>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          variant={'outline'}
          type="button"
          onClick={onPrev}
          className="w-full"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="w-full"
          disabled={!selected}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
