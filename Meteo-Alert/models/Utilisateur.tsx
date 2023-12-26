export default class Utilisateur {
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

    // if ('lieuxFavoris' in userData) {
    //   this.lieuxFavoris = new LieuxFavorisBuilder(userData['lieuxFavoris'] as Lieu[]);
    // } else {
      this.lieuxFavoris = new LieuxFavorisBuilder();
    // }

  }
}


// possede en attribut un builder builderLieuxFavori qui comporte une liste de lieuxfavoris
// voir comment sauvegarder les lieux fav dans firebase 
// voir comment sauvegarder les reglagesApp fav dans firebase 