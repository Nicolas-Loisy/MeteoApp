export function creerKey(nom: string, region: string, pays: string): string {
  const key = `${nom.replace(/-/g, '')}-${region.replace(/-/g, '')}-${pays.replace(/-/g, '')}`
  .replace(/\s+/g, '')
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

  return key;
}