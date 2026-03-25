import { getISOWeek, getISOWeekYear } from 'date-fns';

import { toWeekKey } from '../keys/week';
import { moveMarkersToRowStart } from '../row/move-markers';
import type { Marker, Section, WeekNumberMeta } from '../types';

function buildMarker(date: Date): Marker<WeekNumberMeta> {
  return {
    kind: 'marker',
    id: `week-${toWeekKey(date)}`,
    meta: {
      weekNumber: getISOWeek(date),
      weekKey: toWeekKey(date),
      year: getISOWeekYear(date),
    },
  };
}

export function addWeekNumbers(sections: Section[]): Section[] {
  return sections.map((section) => ({
    ...section,
    rows: section.rows.map((row) => {
      const firstDay = row.items.find((item) => item.kind === 'day');

      if (!firstDay) return row;

      return {
        ...row,
        items: moveMarkersToRowStart([
          buildMarker(firstDay.date),
          ...row.items,
        ]),
      };
    }),
  }));
}
