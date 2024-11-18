export enum EPiso {
  TERREO = 'Térreo',
  SUPERIOR = 'Superior',
}

export function getPiso(key: string): string | undefined {
  return EPiso[key as keyof typeof EPiso]
}
