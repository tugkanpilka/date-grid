export type DayKey = string & { readonly __brand: 'DayKey' };
export type WeekKey = string & { readonly __brand: 'WeekKey' };
export type MonthKey = string & { readonly __brand: 'MonthKey' };

export type FirstDayOfWeek = 0 | 1 | 6;

export interface Range {
  start: Date;
  end: Date;
}

export interface Cell<TDate = Date> {
  kind: 'day';
  date: TDate;
  dayKey: DayKey;
  inMonth: boolean;
}

export interface Marker<TMeta = unknown> {
  kind: 'marker';
  id: string;
  meta?: TMeta;
}

export type Item<TDate = Date, TMeta = unknown> = Cell<TDate> | Marker<TMeta>;

export interface Row<TDate = Date, TMeta = unknown> {
  key: string;
  items: Item<TDate, TMeta>[];
}

export interface Section<TDate = Date, TMeta = unknown> {
  id: string;
  kind: 'month' | 'week';
  year: number;
  month?: number;
  monthKey?: MonthKey;
  weekKey?: WeekKey;
  items: Item<TDate, TMeta>[];
  rows: Row<TDate, TMeta>[];
}

export type Decorator<TDate = Date, TMeta = unknown> = (
  sections: Section<TDate, TMeta>[],
) => Section<TDate, TMeta>[];

export interface FillAdjacentDaysOptions {
  firstDayOfWeek?: FirstDayOfWeek;
}

export interface GroupByWeekOptions {
  firstDayOfWeek?: FirstDayOfWeek;
}

export interface WeekNumberMeta {
  weekNumber: number;
  weekKey: WeekKey;
  year: number;
}
