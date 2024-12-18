"use client";

import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, GraduationCapIcon } from "lucide-react";
import { useState } from "react";
import { FormData } from "../register-form";
import { AppointmentOptionCard } from "./appointment-option-card";

type AppointmentChoicesProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
};

const appointmentOptions = [
  {
    id: "book_appointment",
    icon: CalendarDaysIcon,
    title: "Make Appointment with UK",
    description: "Schedule a consultation with our UK representatives to discuss your options.",
  },
  {
    id: "school",
    icon: GraduationCapIcon,
    title: "Learn More!",
    description: "Learn about our educational programs and academic opportunities.",
  },
] as const;

export function ChooseAppointment({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: AppointmentChoicesProps) {
  const [selected, setSelected] = useState<string | null>(
    formData.appointmentPreference || null
  );

  const handleOptionSelect = (optionId: string) => {
    setSelected(optionId);
    updateFormData({ appointmentPreference: optionId as FormData["appointmentPreference"] });
  };

  const handleNext = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Choose Your Path</h2>
        <p className="text-white">
          Select how you would like to proceed with your journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {appointmentOptions.map((option) => (
          <AppointmentOptionCard
            key={option.id}
            icon={option.icon}
            title={option.title}
            description={option.description}
            selected={selected === option.id}
            onClick={() => handleOptionSelect(option.id)}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
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
          Submit
        </Button>
      </div>
    </div>
  );
}