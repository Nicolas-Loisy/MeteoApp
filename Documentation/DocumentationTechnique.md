# Documentation Technique de l'Application d'Alertes Météo

## Structure du Projet

Le projet est organisé en plusieurs répertoires et fichiers, chacun ayant un rôle spécifique dans le développement de l'application.

### Structure des Répertoires

- **src**: Le répertoire racine du projet.
  - **assets**: Contient les ressources statiques telles que les images, les polices, etc.
  - **components**: Comprend tous les composants React de l'application, divisés en "atoms", "molecules" et "organisms".
    - **atoms**: Les composants de base utilisés dans la construction d'autres composants plus complexes.
    - **molecules**: Des groupes de composants atomiques formant des unités plus complexes.
    - **organisms**: Des ensembles de composants moleculaires ou atomiques formant des parties autonomes de l'interface utilisateur.
  - **config**: Contient les fichiers de configuration de l'application.
  - **locales**: Fichiers de localisation pour les différentes langues prises en charge par l'application.
  - **models**: Modèles de données de l'application.
  - **navigation**: Configuration de la navigation de l'application.
  - **screens**: Les écrans de l'application, correspondant aux différentes vues accessibles par l'utilisateur.
  - **services**: Les services de l'application, tels que les services d'alerte, d'authentification, de géographie, etc.
  - **utils**: Utilitaires divers utilisés dans le projet.



## Technologies Utilisées

L'application est développée en utilisant les technologies suivantes :

- **React Native**: Framework JavaScript pour le développement d'applications mobiles multiplateformes.
- **Firebase**: Plateforme de développement d'applications mobiles de Google, utilisée notamment pour l'authentification et la persistance des données.
- **OpenWeather**: API de météo utilisée pour récupérer les données météorologiques nécessaires aux fonctionnalités de l'application.

## Principales Fonctionnalités

L'application offre les fonctionnalités suivantes :

- Authentification des utilisateurs.
- Recherche et affichage des prévisions météorologiques pour des lieux spécifiques.
- Gestion des alertes météorologiques pour les lieux sélectionnés.
- Personnalisation des paramètres de l'application, tels que les unités de mesure, les langues, etc.
