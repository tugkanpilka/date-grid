import { getISOWeek, getISOWeekYear } from 'date-fns';

import type { WeekKey } from '../types';

export function toWeekKey(date: Date): WeekKey {
  const year = getISOWeekYear(date);
  const week = getISOWeek(date);
  return `${year}-W${String(week).padStart(2, '0')}` as WeekKey;
}
