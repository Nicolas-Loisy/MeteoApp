# Contexte Utilisateur

Le contexte utilisateur gère les données liées à l'utilisateur de l'application, telles que l'inscription, la connexion, la gestion des lieux favoris, des réglages de l'application et des alertes.

## Fonctionnalités

- Inscription et connexion de l'utilisateur.
- Gestion des lieux favoris : ajout, suppression, configuration des alertes.
- Gestion des réglages de l'application : langue, système de mesure.
- Mise à jour automatique des données utilisateur.
- Enregistrement d'une tâche de fond pour l'envoi des notifications.

## Attributs Disponibles

- `utilisateur`: Informations sur l'utilisateur connecté.
- `lieuxFavoris`: Liste des lieux favoris de l'utilisateur.

## Méthodes

### Gestion du Compte

- `inscription(motDePasse: string, utilisateurData: utilisateurInfosType): Promise<void>`: Inscription d'un nouvel utilisateur avec son mot de passe et ses informations.
- `connexion(email: string, motDePasse: string): Promise<void>`: Connexion de l'utilisateur avec son adresse e-mail et son mot de passe.
- `deconnexion(): Promise<void>`: Déconnexion de l'utilisateur.
- `reinitialiserMotDePasse(email: string): Promise<void>`: Réinitialisation du mot de passe de l'utilisateur.
- `modifierMotDePasse(ancienMotDePasse: string, nouveauMotDePasse: string): Promise<void>`: Modification du mot de passe de l'utilisateur.

### Gestion des Lieux Favoris

- `ajouterLieuFavori(lieu: Readonly<Lieu>): Promise<void>`: Ajout d'un lieu favori pour l'utilisateur.
- `supprimerLieuFavori(lieu: Readonly<Lieu>): Promise<void>`: Suppression d'un lieu favori de la liste.
- `setSeuilPersonnalise(keyLieu: string, typeEvenement: EvenementEnum, critere: keyof meteoType, valeur: number): Promise<void>`: Configuration d'un seuil personnalisé pour un événement météorologique.
- `setActiverAlerte(keyLieu: string, typeEvenement: EvenementEnum, bool: boolean): Promise<void>`: Activation ou désactivation d'une alerte pour un événement météorologique.

### Gestion des Réglages

- `setLangue(langue: string): Promise<void>`: Modification de la langue de l'application.
- `setSystemeMesure(systemeMesure: SystemeMesureEnum): Promise<void>`: Modification du système de mesure utilisé dans l'application.

## Utilisation

Le contexte utilisateur est utilisé dans les composants React de l'application pour accéder aux informations et fonctionnalités liées à l'utilisateur. Il est encapsulé dans le composant `UtilisateurProvider`, qui doit être placé au-dessus de l'arborescence des composants où il est utilisé.

```javascript
<UtilisateurProvider>
  {/* Vos composants */}
</UtilisateurProvider>
```

Les composants peuvent ensuite utiliser le hook `useUtilisateur` pour accéder aux données et méthodes du contexte utilisateur.

```javascript
const { utilisateur, lieuxFavoris, ajouterLieuFavori } = useUtilisateur();
```
