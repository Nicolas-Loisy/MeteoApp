# Service de Persistance Firebase

Le service de persistance Firebase est responsable de la gestion des opérations de lecture et d'écriture des données dans la base de données Firebase Realtime.

## Fonctionnalités

- Inscription d'un nouvel utilisateur avec ses données dans la base de données Firebase.
- Récupération des données d'un utilisateur à partir de son identifiant unique (GUID).
- Mise à jour des lieux favoris et des réglages de l'application d'un utilisateur dans la base de données Firebase.

## Méthodes

### `inscription(GUID: string, utilisateurData: utilisateurPersistence): Promise<void>`

Cette méthode permet d'inscrire un nouvel utilisateur avec ses données dans la base de données Firebase.

#### Paramètres

- `GUID`: L'identifiant unique de l'utilisateur.
- `utilisateurData`: Les données de l'utilisateur à enregistrer dans la base de données.

#### Fonctionnement

1. La méthode accède à l'instance de la base de données Firebase à l'aide de la configuration Firebase.
2. Elle crée une référence à l'emplacement de l'utilisateur dans la base de données.
3. Les données de l'utilisateur sont écrites à l'emplacement spécifié dans la base de données Firebase.

### `getUtilisateurData(GUID: string): Promise<utilisateurPersistence>`

Cette méthode permet de récupérer les données d'un utilisateur à partir de son identifiant unique (GUID) dans la base de données Firebase.

#### Paramètres

- `GUID`: L'identifiant unique de l'utilisateur dont les données doivent être récupérées.

#### Retour

La méthode retourne une promesse résolue avec les données de l'utilisateur récupérées.

#### Fonctionnement

1. La méthode accède à l'instance de la base de données Firebase à l'aide de la configuration Firebase.
2. Elle crée une référence à l'emplacement des données de l'utilisateur dans la base de données.
3. Elle récupère les données de l'utilisateur à l'emplacement spécifié dans la base de données Firebase.
4. Les données récupérées sont retournées sous forme de promesse résolue.

### Autres Méthodes

Les méthodes `updateLieuxFavoris` et `updateReglage` sont similaires à la méthode `inscription`, mais elles mettent à jour les lieux favoris et les réglages de l'application d'un utilisateur dans la base de données Firebase.
