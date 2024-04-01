export const exclude = (
  user: Record<string, any>,
  keys: string[]
): Record<string, any> => {
  const result: Record<string, any> = {}
  for (const key in user) {
    if (!keys.includes(key)) {
      result[key] = user[key]
    }
  }
  return result
}
