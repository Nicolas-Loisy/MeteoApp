# Documentation sur la Classe MeteoBuilder

La classe `MeteoBuilder` est responsable de la construction d'objets `Meteo` à partir des données météorologiques fournies par un service météo.

## 1. Méthodes

La classe `MeteoBuilder` expose la méthode suivante :

### 1.1 `getMeteo(longitude: dtUniteCoordonnee, latitude: dtUniteCoordonnee, units: SystemeMesureEnum): Promise<Meteo>`

Cette méthode statique permet de récupérer les données météorologiques pour une certaine position géographique spécifiée par sa longitude et sa latitude, avec des unités de mesure spécifiées. Elle prend les paramètres suivants :

- `longitude`: Objet `dtUniteCoordonnee` représentant la longitude de la position.
- `latitude`: Objet `dtUniteCoordonnee` représentant la latitude de la position.
- `units`: Enum `SystemeMesureEnum` spécifiant le système de mesure à utiliser pour les données météorologiques.

Cette méthode retourne une promesse résolue avec un objet `Meteo` représentant les données météorologiques récupérées.

## 2. Attributs

La classe `MeteoBuilder` ne contient aucun attribut public ou privé.

## Conclusion

La classe `MeteoBuilder` encapsule la logique de construction des objets `Meteo` en utilisant les données fournies par un service météo.