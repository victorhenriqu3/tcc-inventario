import * as xlsx from 'xlsx';
import { keyModeltoTable } from '../services/keyLoans';
import { visitorModeltoTable } from '../services/visitors';

export async function generateXlsx(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  type: string,
) {

  const date = new Date()

  const translateData = type === 'Visitantes' ? data.map(visitorModeltoTable) : data.map(keyModeltoTable)


  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(translateData);
  xlsx.utils.book_append_sheet(wb, ws, type);
  xlsx.writeFile(wb, `${type}-${new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)}.xlsx`);


}