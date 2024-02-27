# Service de Compte Firebase

Le service de compte Firebase gère les opérations liées à l'authentification des utilisateurs via Firebase Authentication.

## Fonctionnalités

- Inscription d'un nouvel utilisateur avec une adresse e-mail et un mot de passe.
- Connexion d'un utilisateur existant avec une adresse e-mail et un mot de passe.
- Déconnexion d'un utilisateur authentifié.
- Réinitialisation du mot de passe pour un utilisateur.
- Modification du mot de passe pour un utilisateur.
- Suppression du compte d'un utilisateur.

## Méthodes

### Inscription

- `inscription(mail: string, password: string): Promise<string>`: Inscription d'un nouvel utilisateur avec une adresse e-mail et un mot de passe. Retourne l'identifiant unique de l'utilisateur créé.

### Connexion

- `connexion(mail: string, password: string): Promise<string>`: Connexion d'un utilisateur existant avec une adresse e-mail et un mot de passe. Retourne l'identifiant unique de l'utilisateur connecté.

### Récupération de la Connexion

- `fetchConnexion(): Promise<string | null>`: Récupère l'identifiant unique de l'utilisateur connecté actuellement, s'il existe.

### Déconnexion

- `deconnexion(): Promise<void>`: Déconnexion de l'utilisateur actuellement authentifié.

### Réinitialisation du Mot de Passe

- `reinitialiserMdp(email: string): Promise<void>`: Envoie un e-mail de réinitialisation du mot de passe à l'adresse e-mail spécifiée.

### Modification du Mot de Passe

- `modifierMdp(ancienMotDePasse: string, motDePasse: string): Promise<void>`: Modifie le mot de passe de l'utilisateur authentifié. Nécessite la vérification de l'ancien mot de passe.

### Suppression du Compte

- `supprimerCompte(motDePasse: string): Promise<void>`: Supprime le compte de l'utilisateur authentifié. Nécessite la vérification du mot de passe.

## Utilisation

Le service de compte Firebase est utilisé dans l'application pour gérer l'authentification des utilisateurs. Il fournit des méthodes pour créer de nouveaux comptes, se connecter, se déconnecter, réinitialiser et modifier les mots de passe, ainsi que pour supprimer les comptes d'utilisateurs existants.
