"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DaySchedule as DayScheduleType, TimeSlot } from "@/lib/time-slots";
import { TimeSlotCard } from "./time-slot-card";

interface DayScheduleProps {
  schedule: DayScheduleType;
  selectedSlot?: { date: string; time: string };
  onSelectTimeSlot: (date: string, time: string) => void;
}

export function DaySchedule({
  schedule,
  selectedSlot,
  onSelectTimeSlot,
}: DayScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{schedule.date}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {schedule.slots.map((slot: TimeSlot) => (
            <TimeSlotCard
              key={`${schedule.date}-${slot.time}`}
              time={slot.time}
              available={slot.available}
              isSelected={
                selectedSlot?.date === schedule.date &&
                selectedSlot?.time === slot.time
              }
              onClick={() => onSelectTimeSlot(schedule.date, slot.time)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}