export type TimeSlot = {
  time: string;
  available: boolean;
};

export type DaySchedule = {
  date: string;
  slots: TimeSlot[];
};

export const AVAILABLE_TIME_SLOTS: DaySchedule[] = [
  {
    date: "14/02/2022",
    slots: [
      { time: "9:30 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "10:30 AM", available: true },
      { time: "11:00 AM", available: true },
      { time: "11:30 AM", available: true },
    ],
  },
  {
    date: "15/02/2025",
    slots: [
      { time: "9:30 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "10:30 AM", available: true },
      { time: "11:00 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "1:30 PM", available: true },
      { time: "2:00 PM", available: true },
      { time: "2:30 PM", available: true },
      { time: "3:00 PM", available: true },
      { time: "3:30 PM", available: true },
      { time: "4:00 PM", available: true },
      { time: "4:30 PM", available: true },
    ],
  },
];
