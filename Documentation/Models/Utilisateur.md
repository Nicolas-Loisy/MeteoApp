# Documentation sur la Classe Utilisateur

La classe `Utilisateur` représente un utilisateur de l'application, encapsulant ses informations personnelles telles que son identifiant unique, son prénom, son adresse e-mail, ses lieux favoris et ses réglages d'application.

## 1. Attributs

La classe `Utilisateur` comprend les attributs suivants :

- `uid`: Identifiant unique de l'utilisateur.
- `prenom`: Prénom de l'utilisateur.
- `mail`: Adresse e-mail de l'utilisateur.
- `lieuxFavoris`: Liste des lieux favoris de l'utilisateur, représentée par un tableau de `Lieu`.
- `reglageApp`: Réglages de l'application associés à l'utilisateur, représentés par l'objet `ReglageApp`.

## 2. Constructeur

Le constructeur de la classe `Utilisateur` prend les paramètres suivants :
- `GUID`: Identifiant unique de l'utilisateur.
- `dataUtilisateur`: Objet de type `utilisateurInfosType` contenant les informations personnelles de l'utilisateur (prénom, adresse e-mail).
- `reglageApp`: Objet de type `ReglageApp` représentant les réglages de l'application associés à l'utilisateur.
- `lieuxFavoris` (optionnel): Liste des lieux favoris de l'utilisateur.

## 3. Méthodes

La classe `Utilisateur` comprend les méthodes suivantes :

- `getLieuxFavoris()`: Renvoie une copie de la liste des lieux favoris de l'utilisateur.
- `getPrenom()`: Renvoie le prénom de l'utilisateur.
- `getMail()`: Renvoie l'adresse e-mail de l'utilisateur.
- `getReglageApp()`: Renvoie les réglages de l'application associés à l'utilisateur.
- `ajouterLieuFavori(lieu: Readonly<Lieu>)`: Ajoute un lieu favori à la liste des lieux favoris de l'utilisateur. Lance une erreur si le lieu est déjà présent dans la liste.
- `supprimerLieuFavori(lieu: Readonly<Lieu>)`: Supprime un lieu favori de la liste des lieux favoris de l'utilisateur. Lance une erreur si le lieu n'est pas présent dans la liste.
