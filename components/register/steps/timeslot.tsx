'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  EducationLevel,
  FormData,
  Gender,
  PreferredMajor,
  Schools,
} from '../register-form'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { toast } from "sonner";

const personalInfoSchema = z.object({
  timeslot: z.string()
})

type TimeSlotProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onPrev: () => void;
};


export function TimeSlot({
  formData,
  updateFormData,
  onPrev
}: TimeSlotProps) {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      timeslot: formData.timeslot
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      updateFormData(values);
      toast.success("Registration successful!");
      // Here you would typically redirect to the login page or dashboard
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
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
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
      </div>
      </form>
    </Form>
  )
}
