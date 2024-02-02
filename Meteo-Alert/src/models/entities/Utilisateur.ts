import LieuxFavorisBuilder from '../builder/LieuxFavorisBuilder';
import utilisateurType from '../types/utilisateurType';
import Lieu from '../valueObject/Lieu';

class Utilisateur {
  public readonly uid: string;

  private prenom: string;
  private mail: string;
  private lieuxFavoris: Readonly<Lieu>[];

  constructor(dataUtilisateur: utilisateurType) {
    this.prenom = dataUtilisateur.prenom;
    this.mail = dataUtilisateur.mail;
    this.uid = dataUtilisateur.uid;

    this.lieuxFavoris = [];
    this.initializeLieuxFavoris();
  }

  private async initializeLieuxFavoris(): Promise<void> {
    const lieuxFavorisPersistence = await LieuxFavorisBuilder.getLieuxFavoris(this.uid);
    this.lieuxFavoris.push(...lieuxFavorisPersistence);
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

  public async ajouterLieuFavori(lieu: Readonly<Lieu>): Promise<void> {
    const isLieuExistant = this.lieuxFavoris.some(lieuFav => lieu.key === lieuFav.key);
    
    if (!isLieuExistant){
      await LieuxFavorisBuilder.ajouterLieuFavori(lieu, this.uid);
      this.lieuxFavoris = [...this.lieuxFavoris, lieu];
    }
  }

  public async supprimerLieuFavori(lieu: Readonly<Lieu>): Promise<void> {
    const isLieuExistant = this.lieuxFavoris.some((lieuFav: Readonly<Lieu>) => lieuFav.key === lieu.key);

    if (isLieuExistant) {
      await LieuxFavorisBuilder.supprimerLieuFavori(lieu, this.uid);
      this.lieuxFavoris = [...this.lieuxFavoris.filter((lieuFav) => lieuFav.key !== lieu.key)];
    }
  }
}

export default Utilisateur;

// voir comment sauvegarder les reglagesApp fav dans firebase 