import type { Item } from '../types';

export function moveMarkersToRowStart(items: Item[]): Item[] {
  const markers = items.filter((item) => item.kind === 'marker');
  const content = items.filter((item) => item.kind !== 'marker');

  return [...markers, ...content];
}
