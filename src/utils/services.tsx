export async function fetchRole(username: string) {
  if (username.startsWith("1") || username.startsWith("2")) {
    return "mentee"
  }
  if (username.startsWith("admin")) {
    return "admin";
  }
  return "mentor"
}