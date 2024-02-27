# Fonctionnement des Alertes Météorologiques

Les alertes météorologiques sont des fonctionnalités essentielles de l'application, permettant d'informer les utilisateurs des conditions météorologiques potentiellement dangereuses ou perturbantes.

## 1. Types d'Alertes

Dans l'application, plusieurs types d'alertes météorologiques sont disponibles, couvrant un large éventail d'événements météorologiques. Voici les principaux types d'alertes :

- **Précipitations**: Alertes concernant les précipitations, telles que la pluie, la neige, etc.
- **Température Extrême Basse**: Alertes en cas de températures extrêmement basses.
- **Température Extrême Haute**: Alertes en cas de températures extrêmement élevées.
- **Vent Violent**: Alertes concernant des vents violents ou des tempêtes.
- **Visibilité Réduite**: Alertes en cas de visibilité réduite due au brouillard, à la brume, etc.

## 2. Création des Alertes

Les alertes météorologiques sont créées à l'aide de la classe `AlerteFactory`. Cette usine de création permet d'initialiser les différentes alertes en fonction du système de mesure utilisé (métrique ou impérial) et de les configurer avec les valeurs par défaut.

## 3. Personnalisation des Alertes

Les alertes météorologiques peuvent être personnalisées en fonction des préférences de l'utilisateur et des données météorologiques spécifiques. Les seuils de déclenchement des alertes peuvent être ajustés en fonction des critères météorologiques, tels que la température, la vitesse du vent, etc.

## 4. Gestion des Alertes

Les alertes météorologiques sont gérées à l'aide de la classe abstraite `aAlerte`, qui définit les caractéristiques de base d'une alerte météorologique générique. Cette classe fournit des méthodes pour activer ou désactiver une alerte, définir des seuils personnalisés et vérifier si un événement météorologique déclenche l'alerte.

## 5. Déclenchement des Alertes

Les alertes météorologiques sont déclenchées lorsque les conditions météorologiques correspondent aux critères définis pour chaque type d'alerte. L'application vérifie régulièrement les conditions météorologiques en temps réel et déclenche les alertes appropriées si nécessaire.
