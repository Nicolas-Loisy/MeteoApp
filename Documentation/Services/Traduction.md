## Traduction avec i18n

L'application utilise la bibliothèque i18n pour la gestion de la traduction afin d'offrir une expérience utilisateur localisée et multilingue.

### Configuration

La configuration de i18n se trouve dans le fichier `i18n.tsx` sous le répertoire `services/i18n`. Ce fichier contient les paramètres de configuration de i18n, tels que les langues prises en charge, les chemins vers les fichiers de traduction, etc. Il est chargé au démarrage de l'application pour initialiser le système de traduction.

### Fichiers de Traduction

Les fichiers de traduction sont stockés dans le répertoire `locales`. Chaque fichier correspond à une langue spécifique, par exemple `en_US.json` pour l'anglais américain et `fr_FR.json` pour le français. Ces fichiers contiennent des paires clé-valeur où la clé est l'identifiant du texte dans la langue par défaut et la valeur est sa traduction dans la langue cible.

Exemple de fichier de traduction (`fr_FR.json`) :

```json
{
  "welcome": "Bienvenue",
  "settings": "Paramètres",
  "search": "Rechercher",
  ...
}
```

### Utilisation dans le Code

Pour utiliser la traduction dans le code, la fonction `t` est utilisée, qui prend en paramètre la clé du texte à traduire. Par exemple :

```jsx
import { t } from 'i18n';

const welcomeMessage = t('welcome');
```

Lorsque l'application est exécutée, la fonction `t` récupère la traduction correspondante de la clé spécifiée dans le fichier de traduction approprié en fonction de la langue actuelle de l'utilisateur.

### Changement de Langue

L'application permet à l'utilisateur de changer la langue de l'interface à tout moment. Lorsque l'utilisateur sélectionne une nouvelle langue dans les paramètres, l'application met à jour la langue actuelle et recharge les traductions correspondantes.
