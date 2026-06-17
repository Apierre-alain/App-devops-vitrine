# app-devops — Configuration et démarrage

Ce dépôt à pour but d'être un projet vitrine sur un projet full-stack / devops. Projet assisté par IA, apprentissage, documentation et debug.

Ce dépôt contient une application composée de trois parties : un **frontend** (React), un **backend** (Node/Express) et un **reverse proxy Nginx**. Les services sont orchestrés avec `docker-compose` pour faciliter le déploiement local.

## Arborescence (extraits)
- `docker-compose.yaml` — orchestration des services
- `frontend/` — code client (port 3000)
- `backend/` — code serveur (port 5000)
- `nginx/` — `Dockerfile` et `nginx.conf` pour le reverse proxy

## Prérequis
- `Docker` (recommandé >= 20.10)
- `docker-compose` (recommandé >= 1.29)
- Pour le développement sans conteneur : `node` et `npm`/`yarn` (versions selon `package.json`)

## Variables d'environnement (exemple)
Le `backend` attend typiquement des variables d'environnement. Vérifiez `backend/config/database.js` pour les noms exacts. Exemples fréquents :
- `DATABASE_URL` — URL de connexion à la base de données
- `JWT_SECRET` — clé secrète pour les tokens
- `PORT` — port d'écoute (optionnel, le conteneur configure généralement 5000)

Créez un fichier `.env` à la racine du `backend` si nécessaire, ou définissez ces variables dans votre environnement ou votre orchestrateur.

## Quick Start (local, Docker)
1. Construire et démarrer tous les services :

```bash
docker-compose up -d --build
```

2. Voir les logs d'un service (ex. `nginx`) :

```bash
docker-compose logs -f nginx
```

3. Redémarrer un service (ex. `nginx`) :

```bash
docker-compose restart nginx
```

4. Arrêter et supprimer les conteneurs :

```bash
docker-compose down
```

## Points d'accès
- Application (frontend) : http://localhost
- API (reverse proxy) : http://localhost/api
- Health check : http://localhost/health

## Développement sans Docker (optionnel)
Si vous préférez lancer les services localement sans conteneurs :

```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
npm install
npm start
```

Vérifiez `frontend/package.json` et `backend/package.json` pour les scripts exacts.

## Dépannage rapide
- Lister les conteneurs en fonctionnement :

```bash
docker ps
```

- Voir les logs du backend :

```bash
docker-compose logs -f backend
```

- Rebuild d'un service :

```bash
docker-compose up -d --build backend
```

Si un service ne répond pas, commencez par vérifier ses logs et l'état du conteneur.

## Personnalisation Nginx
Pour modifier la configuration Nginx : éditez `nginx/nginx.conf`, puis :

```bash
docker-compose build nginx
docker-compose up -d nginx
```

## Contact / Licence
Ajoutez ici les informations de contact ou la licence du projet si nécessaire.

---
Si vous voulez, je peux ajouter un fichier `backend/.env.example` et un `README` plus détaillé pour le développement. Dites-moi si je dois l'ajouter.
