import { format } from 'date-fns';

import type { DayKey } from '../types';

export function toDayKey(date: Date): DayKey {
  return format(date, 'yyyy-MM-dd') as DayKey;
}
