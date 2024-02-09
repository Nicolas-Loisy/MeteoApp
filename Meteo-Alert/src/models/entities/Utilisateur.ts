import utilisateurType from '../types/utilisateurType';
import Lieu from '../valueObject/Lieu';

class Utilisateur {
  public readonly uid: string;

  private prenom: string;
  private mail: string;
  private lieuxFavoris: Readonly<Lieu>[];

  constructor(GUID: string, dataUtilisateur: utilisateurType, lieuxFavoris: Readonly<Lieu>[] = []) {
    this.uid = GUID;
    this.mail = dataUtilisateur.email;

    this.prenom = dataUtilisateur.prenom;
    this.lieuxFavoris = lieuxFavoris;
  }

  public getLieuxFavoris(): ReadonlyArray<Readonly<Lieu>> {
    return this.lieuxFavoris;
  }

  public getPrenom() {
    return this.prenom;
  }

  public getMail() {
    return this.mail;
  }

  public ajouterLieuFavori(lieu: Readonly<Lieu>): void {
    const isLieuExistant = this.lieuxFavoris.some(lieuFav => lieu.key === lieuFav.key);
    
    if (isLieuExistant) throw new Error("[ERREUR] Lieu déjà en favori");

    this.lieuxFavoris = [...this.lieuxFavoris, lieu];
  }

  public supprimerLieuFavori(lieu: Readonly<Lieu>): void {
    const isLieuExistant = this.lieuxFavoris.some((lieuFav: Readonly<Lieu>) => lieuFav.key === lieu.key);

    if (!isLieuExistant) throw new Error("[ERREUR] Lieu non trouvé dans les favoris");

    this.lieuxFavoris = [...this.lieuxFavoris.filter((lieuFav) => lieuFav.key !== lieu.key)];
  }
}

export default Utilisateur;

// voir comment sauvegarder les reglagesApp fav dans firebase 