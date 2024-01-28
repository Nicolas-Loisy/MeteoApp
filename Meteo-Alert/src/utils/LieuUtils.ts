export function creerKey(nom: string, region: string, pays: string): string {
  const key = `${nom}-${region}-${pays}`
  .replace(/\s+/g, '')
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

  return key;
}