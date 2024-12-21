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
  

} from '../register-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  gender: z.string(),
  age: z.string(),
  IELTS: z.string(),
  // schoolName: z.string(),
  educationLevel: z.string(),
  preferredMajor: z.string(),
  schoolName:z.string(),
  phoneNumber: z.string(), // Added phone number validation
  email: z.string().email(),
})

type PersonalInfoProps = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function PersonalInfo({
  formData,
  updateFormData,
  onNext,
}: PersonalInfoProps) {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: formData.fullName,
      gender: formData.gender,
      age: formData.age,
      // schoolName: formData.schoolName,
      educationLevel: formData.educationLevel,
      preferredMajor: formData.preferredMajor,
      schoolName: formData.schoolName,
      IELTS: formData.IELTS,
      phoneNumber: formData.phoneNumber, // Initialize phone number field
      email: formData.email,
    },
  })

  const onSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    updateFormData(values)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex gap-2">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem style={{ flex: 1 }}>
                <FormLabel className="text-white">Age</FormLabel>
                <FormControl>
                  <Input placeholder="Age" {...field} type='number'/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem style={{ flex: 1 }}>
                <FormLabel className="text-white">Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(Gender).map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex gap-2">
          <FormField
            control={form.control}
            name="IELTS"
            render={({ field }) => (
              <FormItem style={{ flex: 1 }}>
                <FormLabel className="text-white">IELTS</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ielts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber" // Added phone number field
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="educationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Current Education Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(EducationLevel).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Your School Name</FormLabel>
              <FormControl>
                  <Input 
                    type="text" 
                    onChange={field.onChange} 
                    value={field.value || ''}
                    placeholder="Enter School Name" 
                  />
             </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
         
        <FormField
            control={form.control}
            name="preferredMajor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Preferred Major</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
              placeholder="Enter your preferred major" 
      />
        
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
  
  
/>
   <FormField
     control= {form.control}
     name="schoolName"
     render={({ field }) => (
      <FormItem>
        <FormLabel className="text-white">Current school&apos;s name</FormLabel>
        <FormControl>
          <Input
          {...field}
          placeholder="Enter your current school's name" 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
     )}
   />    




        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
