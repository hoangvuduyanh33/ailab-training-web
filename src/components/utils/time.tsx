export function timestampToDate(timestamp: number) {
  const d = new Date(timestamp * 1000);
  const date =
    String(d.getHours()).padStart(2, "0") +
    ":" +
    String(d.getMinutes()).padStart(2, "0") +
    ", " +
    d.toDateString();
  return date;
}

export const orderByCreatedAt = (a: any, b: any) => {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  return (a.createdAt == b.createdAt) ? 0 : -1;
}


export const orderByCreatedAtAsc = (a: any, b: any) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  return (a.createdAt == b.createdAt) ? 0 : 1;
} 