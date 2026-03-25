import { getMonth, getYear } from 'date-fns';

import { toDayKey } from '../keys/day';
import { toMonthKey } from '../keys/month';
import type { Cell, Section } from '../types';

function toCell(date: Date): Cell {
  return {
    kind: 'day',
    date,
    dayKey: toDayKey(date),
    inMonth: true,
  };
}

export function groupByMonth(dates: Date[]): Section[] {
  const sectionsByMonth = new Map<string, Section>();

  for (const date of dates) {
    const monthKey = toMonthKey(date);
    const existing = sectionsByMonth.get(monthKey);

    if (existing) {
      existing.items.push(toCell(date));
      continue;
    }

    sectionsByMonth.set(monthKey, {
      id: `month-${monthKey}`,
      kind: 'month',
      year: getYear(date),
      month: getMonth(date) + 1,
      monthKey,
      items: [toCell(date)],
      rows: [],
    });
  }

  return Array.from(sectionsByMonth.values());
}
