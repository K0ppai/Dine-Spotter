const partySize = [
  ...Array.from(Array(10), (_, i) => ({
    value: i + 1,
    label: `${i + 1} ${i + 1 > 1 ? 'people' : 'person'}`,
  })),
];

export { partySize };
