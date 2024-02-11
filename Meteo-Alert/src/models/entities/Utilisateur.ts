import ReglageApp from '../ReglageApp';
import ErreurUtilisateur from '../enum/erreurs/ErreurUtilisateur';
import reglageAppData from '../types/pertistence/reglageAppData';
import utilisateurType from '../types/utilisateurType';
import Lieu from '../valueObject/Lieu';

class Utilisateur {
  public readonly uid: string;

  private prenom: string;
  private mail: string;
  private lieuxFavoris: Readonly<Lieu>[];
  private reglageApp: ReglageApp;

  constructor(GUID: string, dataUtilisateur: utilisateurType, reglageAppData: reglageAppData, lieuxFavoris?: Readonly<Lieu>[]) {
    this.lieuxFavoris = lieuxFavoris ?? [];
    this.reglageApp = ReglageApp.getInstance(reglageAppData);

    this.uid = GUID;

    this.mail = dataUtilisateur.email;
    this.prenom = dataUtilisateur.prenom;
  }

  public getLieuxFavoris(): ReadonlyArray<Readonly<Lieu>> {
    return this.lieuxFavoris.slice();
  }

  public getPrenom(): Readonly<string> {
    return this.prenom;
  }

  public getMail(): Readonly<string> {
    return this.mail;
  }

  public getReglageApp(): Readonly<ReglageApp> {
    return this.reglageApp
  }

  public ajouterLieuFavori(lieu: Readonly<Lieu>): void {
    const isLieuExistant = this.lieuxFavoris.some(lieuFav => lieu.key === lieuFav.key);
    
    if (isLieuExistant) throw ErreurUtilisateur.ERREUR_LIEU_FAVORI_EXISTANT;

    this.lieuxFavoris = [...this.lieuxFavoris, lieu];
  }

  public supprimerLieuFavori(lieu: Readonly<Lieu>): void {
    const isLieuExistant = this.lieuxFavoris.some((lieuFav: Readonly<Lieu>) => lieuFav.key === lieu.key);

    if (!isLieuExistant) throw ErreurUtilisateur.ERREUR_LIEU_FAVORI_MANQUANT;

    this.lieuxFavoris = [...this.lieuxFavoris.filter((lieuFav) => lieuFav.key !== lieu.key)];
  }
}

export default Utilisateur;