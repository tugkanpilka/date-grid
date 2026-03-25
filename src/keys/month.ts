import { format } from 'date-fns';

import type { MonthKey } from '../types';

export function toMonthKey(date: Date): MonthKey {
  return format(date, 'yyyy-MM') as MonthKey;
}
