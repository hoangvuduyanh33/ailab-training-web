export function timestampToDate(timestamp: number) {
  const d = new Date(timestamp);
  const date =
    String(d.getHours()).padStart(2, "0") +
    ":" +
    String(d.getMinutes()).padStart(2, "0") +
    ", " +
    d.toDateString();
  return date;
}
