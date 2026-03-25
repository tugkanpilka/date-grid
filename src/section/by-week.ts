import { getISOWeekYear } from 'date-fns';

import { toDayKey } from '../keys/day';
import { toWeekKey } from '../keys/week';
import type { Cell, GroupByWeekOptions, Section } from '../types';

function toCell(date: Date): Cell {
  return {
    kind: 'day',
    date,
    dayKey: toDayKey(date),
    inMonth: true,
  };
}

export function groupByWeek(
  dates: Date[],
  _options: GroupByWeekOptions = {},
): Section[] {
  const sectionsByWeek = new Map<string, Section>();

  for (const date of dates) {
    const weekKey = toWeekKey(date);
    const existing = sectionsByWeek.get(weekKey);

    if (existing) {
      existing.items.push(toCell(date));
      continue;
    }

    sectionsByWeek.set(weekKey, {
      id: `week-${weekKey}`,
      kind: 'week',
      year: getISOWeekYear(date),
      weekKey,
      items: [toCell(date)],
      rows: [],
    });
  }

  return Array.from(sectionsByWeek.values());
}
