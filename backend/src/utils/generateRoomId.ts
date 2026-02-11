export function generateId(): string {
  const letters = Math.random().toString(36).substring(2, 5);
  const numbers = Math.floor(100 + Math.random() * 900);
  return `${letters}-${numbers}`;
}
