export function toKebabCase(camelCase: string): string {
  return camelCase.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
