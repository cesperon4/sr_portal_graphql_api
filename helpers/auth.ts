export function requireAuth(context: any) {
  console.log("context from auth", context);
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}
