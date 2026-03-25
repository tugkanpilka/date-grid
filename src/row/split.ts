import type { Cell, Section } from '../types';

export function splitRows(sections: Section[]): Section[] {
  return sections.map((section) => {
    const dayItems = section.items.filter(
      (item): item is Cell => item.kind === 'day',
    );
    const rows = [];

    for (let index = 0; index < dayItems.length; index += 7) {
      rows.push({
        key: `${section.id}-row-${index / 7}`,
        items: dayItems.slice(index, index + 7),
      });
    }

    return {
      ...section,
      rows,
    };
  });
}
