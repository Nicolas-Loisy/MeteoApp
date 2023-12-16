export default class Utilisateur {
  prenom: string | undefined;
  mail: string | undefined;

  constructor(userData: Object) {
    if ('prenom' in userData) {
      this.prenom = userData['prenom'] as string;
    }
    if ('mail' in userData) {
      this.mail = userData['mail'] as string;
    }
  }
}


// possede en attribut un builder builderLieuxFavori qui comporte une liste de lieuxfavoris