import { describe, expect, it } from 'vitest';

import {
  addWeekNumbers,
  buildRange,
  fillAdjacentDays,
  groupByMonth,
  splitRows,
  toMonthKey,
  toWeekKey,
} from './index';

describe('date-grid', () => {
  it('builds an inclusive date range', () => {
    const dates = buildRange({
      start: new Date('2026-03-29T00:00:00.000Z'),
      end: new Date('2026-03-31T00:00:00.000Z'),
    });

    expect(dates).toHaveLength(3);
    expect(toMonthKey(dates[0])).toBe('2026-03');
    expect(toMonthKey(dates[2])).toBe('2026-03');
  });

  it('groups a month, fills adjacent days, splits rows and decorates weeks', () => {
    const dates = buildRange({
      start: new Date('2026-03-01T00:00:00.000Z'),
      end: new Date('2026-03-31T00:00:00.000Z'),
    });

    const sections = addWeekNumbers(
      splitRows(fillAdjacentDays(groupByMonth(dates), { firstDayOfWeek: 1 })),
    );

    expect(sections).toHaveLength(1);
    expect(sections[0].monthKey).toBe('2026-03');
    expect(sections[0].rows).toHaveLength(6);
    expect(sections[0].rows[0].items[0]).toMatchObject({
      kind: 'marker',
      meta: {
        weekKey: toWeekKey(new Date('2026-02-23T00:00:00.000Z')),
      },
    });
  });

  it('fills previous and next month days around the section edges', () => {
    const dates = buildRange({
      start: new Date('2026-04-01T00:00:00.000Z'),
      end: new Date('2026-04-30T00:00:00.000Z'),
    });

    const [section] = fillAdjacentDays(groupByMonth(dates), {
      firstDayOfWeek: 1,
    });

    expect(section.items[0]).toMatchObject({
      kind: 'day',
      inMonth: false,
      dayKey: '2026-03-30',
    });
    expect(section.items[section.items.length - 1]).toMatchObject({
      kind: 'day',
      inMonth: false,
      dayKey: '2026-05-03',
    });
  });
});
