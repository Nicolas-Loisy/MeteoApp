interface iServicePersistence {
  updateLieuxFavoris(lieuxFavoris: string, uidUtilisateur: string): Promise<void>;
}