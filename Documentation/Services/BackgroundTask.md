# Service de Tâches en Arrière-plan

Le service de tâches en arrière-plan est responsable de l'exécution de tâches périodiques en arrière-plan, telles que l'envoi de notifications météorologiques aux utilisateurs en fonction de leurs lieux favoris.

## Fonctionnalités

- Enregistrement d'une tâche périodique en arrière-plan.
- Exécution de la tâche périodique pour envoyer des notifications météorologiques.

## Méthode

### `registerBackgroundFetchAsync(lieuxFavoris: ReadonlyArray<Readonly<Lieu>>, utilisateur: Utilisateur)`

Cette méthode permet d'enregistrer une tâche périodique en arrière-plan. Elle prend en paramètres une liste de lieux favoris et un utilisateur, et retourne une promesse résolue une fois que la tâche est enregistrée avec succès.

#### Paramètres

- `lieuxFavoris`: Un tableau contenant les lieux favoris de l'utilisateur.
- `utilisateur`: L'utilisateur pour lequel la tâche en arrière-plan est enregistrée.

#### Fonctionnement

1. La méthode utilise la fonction `defineTask` de `TaskManager` pour définir une nouvelle tâche en arrière-plan avec le nom `BACKGROUND_FETCH_TASK`.
2. La tâche définie est une fonction asynchrone qui est exécutée périodiquement en arrière-plan.
3. À chaque exécution de la tâche, la méthode envoie des notifications météorologiques aux utilisateurs en fonction de leurs lieux favoris en utilisant le service `NotificationService`.
4. La méthode retourne une promesse résolue une fois que la tâche en arrière-plan est enregistrée avec succès.
