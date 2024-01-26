import LieuxFavorisBuilder from '../builder/LieuxFavorisBuilder';
import utilisateurType from '../types/utilisateurType';
import Lieu from '../valueObject/Lieu';

class Utilisateur {
  public readonly uid: string;

  private prenom: string;
  private mail: string;
  private lieuxFavoris: Lieu[];

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

  public getLieuxFavoris(): ReadonlyArray<Lieu> {
    return this.lieuxFavoris;
  }

  public getPrenom() {
    return this.prenom;
  }

  public getMail() {
    return this.mail;
  }

  public ajouterLieuFavori(lieu: Lieu) {
    const isLieuExistant = this.lieuxFavoris.some(lieuFav => {
      return (
        lieuFav.nom === lieu.nom &&
        lieuFav.pays === lieu.pays &&
        lieuFav.region === lieu.region
      );
    });

    if (!isLieuExistant){
      this.lieuxFavoris.push(lieu);
    }

    LieuxFavorisBuilder.enregistrerLieuxFavoris(this.lieuxFavoris, this.uid);
  }
  
}

export default Utilisateur;


// possede en attribut un builder builderLieuxFavori qui comporte une liste de lieuxfavoris
// voir comment sauvegarder les lieux fav dans firebase 
// voir comment sauvegarder les reglagesApp fav dans firebase 