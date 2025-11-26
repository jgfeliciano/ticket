export function formatarDateToISO(dateString: string): string {
  if (!dateString) return '';

  const partes = dateString.split('-');
  const ano = +partes[0];
  const mes = +partes[1] - 1;
  const dia = +partes[2];

  const data = new Date(ano, mes, dia);
  return data.toISOString().split('T')[0];
}
