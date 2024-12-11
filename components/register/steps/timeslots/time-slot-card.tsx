"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface TimeSlotCardProps {
  time: string;
  isSelected: boolean;
  available?: boolean;
  onClick: () => void;
}

export function TimeSlotCard({
  time,
  isSelected,
  available = true,
  onClick,
}: TimeSlotCardProps) {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className={cn(
        "w-full flex items-center gap-2 transition-all",
        !available && "opacity-50 cursor-not-allowed",
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
      disabled={!available}
    >
      <Clock className="h-4 w-4" />
      <span>{time}</span>
    </Button>
  );
}
