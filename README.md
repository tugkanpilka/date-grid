# date-grid

[![npm version](https://img.shields.io/npm/v/date-grid.svg)](https://www.npmjs.com/package/date-grid)
[![npm downloads](https://img.shields.io/npm/dm/date-grid.svg)](https://www.npmjs.com/package/date-grid)
[![bundle size](https://img.shields.io/bundlephobia/minzip/date-grid)](https://bundlephobia.com/package/date-grid)
[![license](https://img.shields.io/npm/l/date-grid.svg)](./LICENSE)

A framework-agnostic date layout engine for building calendar-like interfaces.

`date-grid` turns a flat array of `Date`s into a structured, week-aligned grid. It does **not** render anything — you map the output to your own UI (React, Vue, Svelte, plain DOM, terminal, PDF, anywhere).

## Why

Most calendar libraries ship a renderer you have to fight. `date-grid` only does the layout math:

- Composable, pure-function pipeline — pick the stages you need.
- Zero UI assumptions — works in any framework, any runtime.
- Strongly typed with branded keys (`DayKey`, `WeekKey`, `MonthKey`).
- ISO weeks for numbering, configurable `firstDayOfWeek` for layout.
- Tiny: one runtime dependency (`date-fns`), shipped as ESM + CJS.

## Install

```bash
npm install date-grid
# or
yarn add date-grid
# or
pnpm add date-grid
```

## Quick start

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
  splitRows(
    fillAdjacentDays(groupByMonth(dates), { firstDayOfWeek: 1 }),
  ),
);

// sections[0].rows -> 6 rows of 7 items, ready to render
```

## Pipeline

```
buildRange  →  groupByMonth | groupByWeek  →  fillAdjacentDays  →  splitRows  →  addWeekNumbers
  Date[]              Section[]                   Section[]         Section[]      Section[]
```

Each stage is a pure function that returns a new array. Stages are composable and order-dependent.

| Stage | Purpose |
| --- | --- |
| `buildRange({ start, end })` | Generate an inclusive `Date[]` between two dates. |
| `groupByMonth(dates)` | Bucket dates into one `Section` per calendar month. |
| `groupByWeek(dates, opts?)` | Bucket dates into one `Section` per ISO week. |
| `fillAdjacentDays(sections, opts?)` | Pad each section's edges with previous/next month days (`inMonth: false`) so it starts and ends on a week boundary. |
| `splitRows(sections)` | Split `section.items` into 7-day `section.rows`. |
| `addWeekNumbers(sections)` | Inject a `Marker` at the start of each row carrying ISO week metadata. |

## Concepts

### `Item = Cell | Marker`

A section's `items` is a flat stream of two kinds of entries:

- **`Cell`** — a real day: `{ kind: 'day', date, dayKey, inMonth }`.
- **`Marker`** — metadata-only entry (e.g. a week-number badge): `{ kind: 'marker', id, meta? }`.

Decorators inject markers into the same stream rather than maintaining a parallel array. Markers always sort to the start of a row.

### Branded keys

`DayKey`, `WeekKey`, and `MonthKey` are nominal string types. Build them through the helpers — never hand-format strings, or TypeScript will reject them at the boundary:

```ts
import { toDayKey, toMonthKey, toWeekKey } from 'date-grid';

toMonthKey(new Date('2026-03-15')); // '2026-03' as MonthKey
toDayKey(new Date('2026-03-15'));   // '2026-03-15' as DayKey
toWeekKey(new Date('2026-03-15'));  // ISO week key as WeekKey
```

### ISO weeks vs `firstDayOfWeek`

Week semantics are split on purpose:

- `addWeekNumbers` and `groupByWeek` always use **ISO** weeks (`getISOWeek`, `getISOWeekYear`), regardless of locale.
- The `firstDayOfWeek` option (`0 | 1 | 6`) only affects **layout** — where `fillAdjacentDays` pads and how `splitRows` aligns 7-day rows.

ISO week numbers do not change when `firstDayOfWeek` changes.

### Custom stages

The `Decorator` type is the contract for new pipeline stages:

```ts
import type { Decorator } from 'date-grid';

const highlightToday: Decorator = (sections) =>
  sections.map((s) => ({
    ...s,
    items: s.items.map((item) =>
      item.kind === 'day' && isToday(item.date)
        ? { ...item, /* attach your own meta via a Marker if needed */ }
        : item,
    ),
  }));
```

Compose it like any other stage — `highlightToday(addWeekNumbers(...))`.

## API

Exported values:

- `buildRange`, `groupByMonth`, `groupByWeek`, `fillAdjacentDays`, `splitRows`, `addWeekNumbers`
- `toDayKey`, `toMonthKey`, `toWeekKey`

Exported types:

- `Range`, `Section`, `Row`, `Item`, `Cell`, `Marker`
- `DayKey`, `WeekKey`, `MonthKey`, `FirstDayOfWeek`
- `Decorator`, `FillAdjacentDaysOptions`, `GroupByWeekOptions`, `WeekNumberMeta`

## Development

```bash
yarn build   # tsc + vite lib build → dist/
yarn test    # vitest run
```

## License

MIT
