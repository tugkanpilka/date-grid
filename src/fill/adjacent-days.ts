import { addDays, subDays } from 'date-fns';

import { toDayKey } from '../keys/day';
import { toWeekdayIndex } from '../rules/first-day-of-week';
import type { Cell, FillAdjacentDaysOptions, Section } from '../types';

function toAdjacentCell(date: Date): Cell {
  return {
    kind: 'day',
    date,
    dayKey: toDayKey(date),
    inMonth: false,
  };
}

export function fillAdjacentDays(
  sections: Section[],
  options: FillAdjacentDaysOptions = {},
): Section[] {
  const { firstDayOfWeek = 1 } = options;

  return sections.map((section) => {
    if (section.items.length === 0) return section;

    const dayItems = section.items.filter(
      (item): item is Cell => item.kind === 'day',
    );

    if (dayItems.length === 0) return section;

    const firstDate = dayItems[0].date;
    const lastDate = dayItems[dayItems.length - 1].date;
    const leading = toWeekdayIndex(firstDate, firstDayOfWeek);
    const trailing = 6 - toWeekdayIndex(lastDate, firstDayOfWeek);

    const prefix = Array.from({ length: leading }, (_, index) =>
      toAdjacentCell(subDays(firstDate, leading - index)),
    );
    const suffix = Array.from({ length: trailing }, (_, index) =>
      toAdjacentCell(addDays(lastDate, index + 1)),
    );

    return {
      ...section,
      items: [...prefix, ...dayItems, ...suffix],
    };
  });
}
