export function requireAuth(context: any) {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}
