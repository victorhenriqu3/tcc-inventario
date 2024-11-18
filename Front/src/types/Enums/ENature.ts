export enum ENaturezaVisita {
  Evento = 'Evento',
  VisitaPessoal = 'Visita Pessoal',
  VisitaTecnica = 'Visita Técnica',
  VisitaInstitucional = 'Visita Institucional',
  AtendimentoPublico = 'Atendimento ao Público',
}

export function getNaturesFromEnum(): { label: string; value: string }[] {
  return Object.values(ENaturezaVisita).map((value) => ({
    label: value,
    value: value,
  }));
}

export function getNature(key: string): string | undefined {
  return ENaturezaVisita[key as keyof typeof ENaturezaVisita];
}
