# Contexte Géographique

Le contexte géographique gère les opérations liées à la recherche de lieux géographiques.

## Fonctionnalités

- Recherche de lieux géographiques par nom.
- Récupération des résultats de recherche.

## Attributs Disponibles

- `resultatsRecherche`: Liste des lieux géographiques résultant de la recherche.

## Méthodes

### Recherche de Lieux

- `rechercheLieux(nomLieu: string): Promise<void>`: Effectue une recherche de lieux géographiques en fonction du nom spécifié.

## Utilisation

Le contexte géographique est utilisé dans les composants React de l'application pour effectuer des recherches de lieux géographiques. Il est encapsulé dans le composant `GeographieProvider`, qui doit être placé au-dessus de l'arborescence des composants où il est utilisé.

```javascript
<GeographieProvider>
  {/* Vos composants */}
</GeographieProvider>
```

Les composants peuvent ensuite utiliser le hook `useGeographie` pour accéder aux données et méthodes du contexte géographique.

```javascript
const { resultatsRecherche, rechercheLieux } = useGeographie();
```