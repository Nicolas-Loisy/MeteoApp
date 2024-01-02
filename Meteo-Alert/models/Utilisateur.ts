import LieuxFavorisBuilder from './builder/LieuxFavorisBuilder';
import Lieu from './valueObject/Lieu';

class Utilisateur {
  prenom: string | undefined;
  mail: string | undefined;
  uid: string | undefined;
  lieuxFavoris!: LieuxFavorisBuilder;

  constructor(userData: Object) {
    if ('prenom' in userData) {
      this.prenom = userData['prenom'] as string;
    }
    if ('mail' in userData) {
      this.mail = userData['mail'] as string;
    }
    if ('uid' in userData) {
      this.uid = userData['uid'] as string;
    }
    
    this.initializeLieuxFavoris(userData);
  }

  private initializeLieuxFavoris(userData: Object): void {
    // Initialisation vide
    this.lieuxFavoris = new LieuxFavorisBuilder([] as Lieu[]);
    
    try {
      if ('lieuxFavoris' in userData && typeof userData['lieuxFavoris'] === 'string') {
        const lieuDataArray = JSON.parse(userData['lieuxFavoris']);
        const lieuxFavorisArray = this.convertLieuDataArrayToLieuxArray(lieuDataArray);

        if (Array.isArray(lieuxFavorisArray)) {
          this.lieuxFavoris = new LieuxFavorisBuilder(lieuxFavorisArray as Lieu[]);
        } else {
          console.error('userData[\'lieuxFavoris\'] n\'est pas un tableau JSON valide.');
        }
      } else {
        console.error('userData[\'lieuxFavoris\'] n\'est pas un tableau JSON valide.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse de userData[\'lieuxFavoris\'] :', error);
    }
  }

  private convertLieuDataArrayToLieuxArray(lieuDataArray: any[]): Lieu[] {
    return lieuDataArray.map((data: { nom: string; pays: string; region: string; longitude: { valeur: number; }; latitude: { valeur: number; }; }) => {
      return new Lieu({
        name: data.nom,
        country: data.pays,
        state: data.region,
        lon: data.longitude.valeur,
        lat: data.latitude.valeur,
      });
    });
  }
}

export default Utilisateur;


// possede en attribut un builder builderLieuxFavori qui comporte une liste de lieuxfavoris
// voir comment sauvegarder les lieux fav dans firebase 
// voir comment sauvegarder les reglagesApp fav dans firebase 