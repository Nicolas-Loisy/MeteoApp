import LieuxFavorisBuilder from './builder/LieuxFavorisBuilder';
import Lieu from './valueObject/Lieu';

class Utilisateur {
  prenom: string | undefined;
  mail: string | undefined;
  lieuxFavoris: LieuxFavorisBuilder;

  constructor(userData: Object) {
    if ('prenom' in userData) {
      this.prenom = userData['prenom'] as string;
    }
    if ('mail' in userData) {
      this.mail = userData['mail'] as string;
    }
    
    this.lieuxFavoris = new LieuxFavorisBuilder(
      ('lieuxFavoris' in userData ? userData['lieuxFavoris'] : []) as Lieu[]
    );

  }
}

export default Utilisateur;


// possede en attribut un builder builderLieuxFavori qui comporte une liste de lieuxfavoris
// voir comment sauvegarder les lieux fav dans firebase 
// voir comment sauvegarder les reglagesApp fav dans firebase 