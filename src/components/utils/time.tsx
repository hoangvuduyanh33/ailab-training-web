export function timestampToDate(timestamp: number) {
  const d = new Date(timestamp);
  const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
  return date;
}
