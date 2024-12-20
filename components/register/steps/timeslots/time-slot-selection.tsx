'use client'

import { Button } from '@/components/ui/button'
import { AVAILABLE_TIME_SLOTS } from '@/lib/time-slots'
import { FormData } from '../../register-form'
import { DaySchedule } from './day-schedule'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'

interface TimeSlotSelectionProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
  isSubmitting: boolean
}

interface Slot {
  time: string
  available: boolean
}

interface TimeSlotGroup {
  date: string
  slots: Slot[]
}

export function TimeSlotSelection({
  formData,
  updateFormData,
  onNext,
  onPrev,
  isSubmitting,
}: TimeSlotSelectionProps) {
  const handleTimeSlotSelect = (date: string, time: string) => {
    updateFormData({ selectedTimeSlot: { date, time } })
  }
  const [timeSlots, setTimeSlots] = useState<TimeSlotGroup[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchTimeSlots() {
      try {
        const response = await fetch('/api/timeslot')
        const data: TimeSlotGroup[] = await response.json()
        setTimeSlots(data)
      } catch (error) {
        console.error('Error fetching time slots:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTimeSlots()
  }, [])
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Choose Your Appointment Time
        </h2>
        <p className="text-muted-foreground">
          Select a convenient time slot for your consultation
        </p>
      </div>

      <div className="space-y-6">
        {loading && (
          <div className=" bg-white p-5">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
        {timeSlots.map((daySchedule) => (
          <DaySchedule
            key={daySchedule.date}
            schedule={daySchedule}
            selectedSlot={formData.selectedTimeSlot}
            onSelectTimeSlot={handleTimeSlotSelect}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="w-full"
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="w-full"
          disabled={!(formData.selectedTimeSlot?.date && formData.selectedTimeSlot?.time) || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
        </Button>
      </div>
    </div>
  )
}
