import { addDays, differenceInCalendarDays, startOfDay } from 'date-fns';

import type { Range } from '../types';

export function buildRange(range: Range): Date[] {
  const start = startOfDay(range.start);
  const end = startOfDay(range.end);
  const length = differenceInCalendarDays(end, start);

  if (length < 0) {
    throw new Error('buildRange requires start to be on or before end');
  }

  return Array.from({ length: length + 1 }, (_, index) =>
    addDays(start, index),
  );
}
