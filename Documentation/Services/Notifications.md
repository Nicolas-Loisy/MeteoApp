# Service de Notification

Le service de notification est responsable de l'envoi de notifications aux utilisateurs en fonction des événements météorologiques détectés pour leurs lieux favoris.

## Fonctionnalités

- Envoi de notifications individuelles avec un titre et un corps spécifiés.
- Envoi de notifications pour plusieurs lieux favoris en fonction des événements météorologiques détectés.

## Méthodes

### `sendNotification(title: string, body: string)`

Cette méthode permet d'envoyer une notification individuelle avec un titre et un corps spécifiés.

#### Paramètres

- `title`: Le titre de la notification.
- `body`: Le corps de la notification.

#### Fonctionnement

1. La méthode utilise la fonction `scheduleNotificationAsync` de `expo-notifications` pour planifier l'envoi d'une notification avec le titre et le corps spécifiés.
2. La notification est déclenchée 2 secondes après l'appel de la fonction, mais ce délai peut être modifié selon les besoins.

### `sendNotificationsWithConditions(lieuxFavoris: ReadonlyArray<Readonly<Lieu>>, utilisateur: Utilisateur)`

Cette méthode permet d'envoyer des notifications pour plusieurs lieux favoris en fonction des événements météorologiques détectés.

#### Paramètres

- `lieuxFavoris`: Un tableau contenant les lieux favoris de l'utilisateur.
- `utilisateur`: L'utilisateur pour lequel les notifications sont envoyées.

#### Fonctionnement

1. La méthode parcourt chaque lieu favori de l'utilisateur.
2. Pour chaque lieu, elle met à jour les données météorologiques en fonction du système de mesure de l'utilisateur.
3. Ensuite, elle vérifie les événements météorologiques pour ce lieu en utilisant la méthode `checkEvenements`.
4. Si des événements sont détectés pour ce lieu, des notifications sont envoyées pour chaque événement présent.
5. Les titres et les corps des notifications sont traduits en fonction de la langue de l'utilisateur à l'aide de la fonction `t` de `i18next`.
6. Toutes les notifications sont envoyées de manière asynchrone et en parallèle, puis la méthode attend que toutes les notifications soient envoyées avec succès avant de se terminer.
