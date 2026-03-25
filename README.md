# date-grid

Framework-agnostic date layout engine for building calendar-like interfaces.

## Install

```bash
npm install date-grid
```

## Usage

```ts
import {
  addWeekNumbers,
  buildRange,
  fillAdjacentDays,
  groupByMonth,
  splitRows,
} from 'date-grid';

const dates = buildRange({
  start: new Date('2026-03-01T00:00:00.000Z'),
  end: new Date('2026-03-31T00:00:00.000Z'),
});

const sections = addWeekNumbers(
  splitRows(fillAdjacentDays(groupByMonth(dates))),
);
```
