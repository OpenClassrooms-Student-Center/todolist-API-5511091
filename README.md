# Open Classrooms - API Todo

Cette API à été développée pour le cours [Organisez votre application React avec la logique Redux](https://openclassrooms.com/fr/courses/5511091-organisez-votre-application-react-avec-la-logique-redux). Elle a été réaliser de manière à pouvoir répondre aux besoins des exercices et de la trame de ce cours. Elle comporte une documentation similaire à ce que vous pourriez trouver avec toutes API.

Pour réaliser cette API, nous avons utiliser AdonisJS et SQLite.

## Requis

- NodeJS 8 ou plus.

## Installation

Une fois que les sources sont récupérés, vous devez installer les packages nécessaires au bon fonctinnement du projet en tapant la commande :

```bash
npm install
```

Maintenant que tous les packages sont installés, vous devez initialiser la base de donnée afin de pouvoir utiliser l'API. Pour ce faire, vous devez taper la commande :

```bash
npm run migration:run
```

:tada: L'API est maintenant prête à être utilisé !

## Lancer l'API

Pour accéder et intéragir avec l'API, vous devez la lancer en tapant la commande :

```bash
npm run start
```

Une fois démarré, vous pouvez y accéder en allant sur [http://localhost:3333](http://localhost:3333).

## Accéder à la documentation

Cette API comporte une documentation directement dans ses fichiers sources. Dans le but de pouvoir y accéder, vous devez lancer le serveur Docsify en tapant la commande :

```bash
npm run docs
```

Une fois lancé, la documentation sera accessible depuis [http://localhost:3000](http://localhost:3000).