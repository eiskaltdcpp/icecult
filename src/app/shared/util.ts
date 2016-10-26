/* tslint:disable:no-bitwise */

export function hashCode(source: string): number {
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    hash = source.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function int2RGB(source: number): string {
  let color = ((source >> 24) & 0xFF).toString(16) +
    ((source >> 16) & 0xFF).toString(16) +
    ((source >> 8) & 0xFF).toString(16) +
    (source & 0xFF).toString(16);
  while (color.length < 6) {
    color += '0';
  }
  return color.slice(0, 6);
}
