import type { FirstDayOfWeek } from '../types';

export function toWeekdayIndex(
  date: Date,
  firstDayOfWeek: FirstDayOfWeek,
): number {
  const day = date.getDay();
  return (day - firstDayOfWeek + 7) % 7;
}
