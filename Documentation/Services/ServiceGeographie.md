# Service de Géographie OpenWeather

Le service de géographie OpenWeather est responsable de la recherche de lieux géographiques en utilisant l'API OpenWeather.

## Fonctionnalités

- Recherche de lieux géographiques en fonction du nom spécifié.

## Méthodes

### `rechercheLieux(nomLieu: string): Promise<lieuType[]>`

Cette méthode permet de rechercher des lieux géographiques en fonction du nom spécifié.

#### Paramètres

- `nomLieu`: Le nom du lieu à rechercher.

#### Retour

La méthode retourne une promesse résolue avec un tableau de lieux géographiques au format `lieuType[]`.

#### Fonctionnement

1. La méthode construit l'URL de requête à l'API OpenWeather en utilisant le nom du lieu et l'API key.
2. Elle envoie une requête GET à l'API OpenWeather pour obtenir les données de lieux géographiques.
3. Les données de lieux obtenues sont ajustées et converties en un format standard `lieuType` utilisé par l'application.
4. Les lieux sont filtrés pour s'assurer qu'ils sont uniques, en utilisant une clé unique générée par la fonction `creerKey` du module `LieuUtils`.
5. Les lieux filtrés sont renvoyés sous forme de promesse résolue.

### Méthode Privée `ajusterDonnees(data: any): lieu_OW[]`

Cette méthode privée permet d'ajuster les données de lieux obtenues à partir de l'API OpenWeather en un format standard.

#### Paramètre

- `data`: Les données de lieux obtenues de l'API OpenWeather.

#### Retour

La méthode retourne un tableau d'objets de type `lieu_OW`, représentant les lieux géographiques ajustés.
