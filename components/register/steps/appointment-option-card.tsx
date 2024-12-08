"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AppointmentOptionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function AppointmentOptionCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: AppointmentOptionCardProps) {
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all hover:shadow-lg",
        "p-6 flex flex-col items-center text-center space-y-4",
        selected && "border-primary ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "p-3 rounded-full",
        selected ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}