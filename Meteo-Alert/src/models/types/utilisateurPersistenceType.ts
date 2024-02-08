type utilisateurPersistenceType = {
  email: string;
  lieuxFavoris: Record<string, {
    lat: number;
    lon: number;
    nom: string;
    pays: string;
    region: string;
  }>;
  prenom: string;
};

export default utilisateurPersistenceType;
