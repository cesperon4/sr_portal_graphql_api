export function requireAuth(context: any): boolean {
  if (!context.user) {
    return false;
  }
  return true;
}

export function requireArguments<T>(args: T): boolean {
  for (const entry in args) {
    if (!args[entry]) return false;
  }
  return true;
}
