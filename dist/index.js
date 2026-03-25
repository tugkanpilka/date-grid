import { getISOWeekYear as y, getISOWeek as p, format as w, subDays as b, addDays as M, startOfDay as m, differenceInCalendarDays as $, getYear as x, getMonth as A } from "date-fns";
function u(t) {
  const o = y(t), n = p(t);
  return `${o}-W${String(n).padStart(2, "0")}`;
}
function I(t) {
  const o = t.filter((e) => e.kind === "marker"), n = t.filter((e) => e.kind !== "marker");
  return [...o, ...n];
}
function S(t) {
  return {
    kind: "marker",
    id: `week-${u(t)}`,
    meta: {
      weekNumber: p(t),
      weekKey: u(t),
      year: y(t)
    }
  };
}
function O(t) {
  return t.map((o) => ({
    ...o,
    rows: o.rows.map((n) => {
      const e = n.items.find((r) => r.kind === "day");
      return e ? {
        ...n,
        items: I([
          S(e.date),
          ...n.items
        ])
      } : n;
    })
  }));
}
function f(t) {
  return w(t, "yyyy-MM-dd");
}
function k(t, o) {
  return (t.getDay() - o + 7) % 7;
}
function l(t) {
  return {
    kind: "day",
    date: t,
    dayKey: f(t),
    inMonth: !1
  };
}
function R(t, o = {}) {
  const { firstDayOfWeek: n = 1 } = o;
  return t.map((e) => {
    if (e.items.length === 0) return e;
    const r = e.items.filter(
      (s) => s.kind === "day"
    );
    if (r.length === 0) return e;
    const i = r[0].date, d = r[r.length - 1].date, c = k(i, n), D = 6 - k(d, n), K = Array.from(
      { length: c },
      (s, a) => l(b(i, c - a))
    ), W = Array.from(
      { length: D },
      (s, a) => l(M(d, a + 1))
    );
    return {
      ...e,
      items: [...K, ...r, ...W]
    };
  });
}
function B(t) {
  return w(t, "yyyy-MM");
}
function _(t) {
  const o = m(t.start), n = m(t.end), e = $(n, o);
  if (e < 0)
    throw new Error("buildRange requires start to be on or before end");
  return Array.from(
    { length: e + 1 },
    (r, i) => M(o, i)
  );
}
function v(t) {
  return t.map((o) => {
    const n = o.items.filter(
      (r) => r.kind === "day"
    ), e = [];
    for (let r = 0; r < n.length; r += 7)
      e.push({
        key: `${o.id}-row-${r / 7}`,
        items: n.slice(r, r + 7)
      });
    return {
      ...o,
      rows: e
    };
  });
}
function g(t) {
  return {
    kind: "day",
    date: t,
    dayKey: f(t),
    inMonth: !0
  };
}
function j(t) {
  const o = /* @__PURE__ */ new Map();
  for (const n of t) {
    const e = B(n), r = o.get(e);
    if (r) {
      r.items.push(g(n));
      continue;
    }
    o.set(e, {
      id: `month-${e}`,
      kind: "month",
      year: x(n),
      month: A(n) + 1,
      monthKey: e,
      items: [g(n)],
      rows: []
    });
  }
  return Array.from(o.values());
}
function h(t) {
  return {
    kind: "day",
    date: t,
    dayKey: f(t),
    inMonth: !0
  };
}
function N(t, o = {}) {
  const n = /* @__PURE__ */ new Map();
  for (const e of t) {
    const r = u(e), i = n.get(r);
    if (i) {
      i.items.push(h(e));
      continue;
    }
    n.set(r, {
      id: `week-${r}`,
      kind: "week",
      year: y(e),
      weekKey: r,
      items: [h(e)],
      rows: []
    });
  }
  return Array.from(n.values());
}
export {
  O as addWeekNumbers,
  _ as buildRange,
  R as fillAdjacentDays,
  j as groupByMonth,
  N as groupByWeek,
  v as splitRows,
  f as toDayKey,
  B as toMonthKey,
  u as toWeekKey
};
//# sourceMappingURL=index.js.map
