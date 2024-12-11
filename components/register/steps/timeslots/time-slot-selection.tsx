"use client";

import { Button } from "@/components/ui/button";
import { AVAILABLE_TIME_SLOTS } from "@/lib/time-slots";
import { FormData } from "../../register-form";
import { DaySchedule } from "./day-schedule";

interface TimeSlotSelectionProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export function TimeSlotSelection({
  formData,
  updateFormData,
  onNext,
  onPrev,
  isSubmitting,
}: TimeSlotSelectionProps) {
  const handleTimeSlotSelect = (date: string, time: string) => {
    updateFormData({ selectedTimeSlot: { date, time } });
  };

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
        {AVAILABLE_TIME_SLOTS.map((daySchedule) => (
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
          disabled={!formData.selectedTimeSlot || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Complete Registration"}
        </Button>
      </div>
    </div>
  );
}