export const waiters = [
  { name: "Rahul", number: "919876543210", tables: [1, 2, 3, 4, 5] },
  { name: "Arun", number: "919812345678", tables: [6, 7, 8, 9, 10] }
];

export function getWaiterForTable(tableNumber) {
  const table = parseInt(tableNumber, 10);
  if (isNaN(table)) return null;
  return waiters.find(w => w.tables.includes(table)) || null;
}
