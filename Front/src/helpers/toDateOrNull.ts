const formatter = new Intl.DateTimeFormat('pt-BR', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function toDateOrNull(value?: string | null): string | null {
  if (!value) return null;

  const newValue = new Date(value);
  return formatter.format(newValue);
}
