# Service Météorologique OpenWeather

Le service météorologique OpenWeather est responsable de la récupération des données météorologiques en temps réel à partir de l'API OpenWeather.

## Fonctionnalités

- Récupération des données météorologiques pour une position géographique spécifiée.


## Méthodes

### `getMeteo(longitude: dtUniteCoordonnee, latitude: dtUniteCoordonnee, unite: SystemeMesureEnum): Promise<meteoType>`

Cette méthode permet de récupérer les données météorologiques pour une position géographique spécifiée.

#### Paramètres

- `longitude`: La longitude de la position géographique.
- `latitude`: La latitude de la position géographique.
- `unite`: Le système de mesure à utiliser pour les données météorologiques.

#### Retour

La méthode retourne une promesse résolue avec les données météorologiques récupérées au format `meteoType`.

#### Fonctionnement

1. La méthode construit l'URL de requête à l'API OpenWeather en utilisant la latitude, la longitude et l'API key.
2. Elle envoie une requête GET à l'API OpenWeather pour obtenir les données météorologiques.
3. Les données sont converties en un format standard `meteoType` utilisé par l'application, comprenant des informations telles que la température, la pression, la vitesse du vent, etc.
4. Les données météorologiques sont renvoyées sous forme de promesse résolue.

### `getUnite(unitEnum: SystemeMesureEnum): string`

Cette méthode privée permet de convertir un enum `SystemeMesureEnum` en une chaîne de caractères représentant l'unité de mesure à utiliser dans la requête à l'API OpenWeather.