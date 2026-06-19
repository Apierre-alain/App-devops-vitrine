# app-devops — Configuration et démarrage

Ce dépôt à pour but d'être un projet vitrine sur un projet full-stack / devops. Projet assisté par IA, apprentissage, documentation et debug.

Ce dépôt contient une application composée de trois parties : un **frontend** (React), un **backend** (Node/Express) et un **reverse proxy Nginx**. Les services sont orchestrés avec `docker-compose` pour faciliter le déploiement local.

## Arborescence (extraits)
- `docker-compose.yaml` — orchestration des services
- `frontend/` — code client (port 3000)
- `backend/` — code serveur (port 5000)
- `nginx/` — `Dockerfile` et `nginx.conf` pour le reverse proxy

## 🚀 Démarrage très simple

### Prérequis
- `Docker` et `docker-compose` (les seuls prérequis!)

### Lancer le projet en une seule commande :

```bash
docker-compose up -d --build
```

C'est tout ! ✨ Attendez 30-60 secondes que les services démarrent, puis accédez à :
- **Application** : http://localhost
- **API** : http://localhost/api
- **Santé** : http://localhost/health

## Architecture
```
Client
  ↓ (port 80)
Nginx (reverse proxy)
  ├→ Frontend (React build static)
  └→ Backend API
        ↓
    MongoDB (persistance)
```

## Commandes utiles

### Voir les logs
```bash
docker-compose logs -f              # Tous les services
docker-compose logs -f backend      # Seulement le backend
docker-compose logs -f mongodb      # Seulement MongoDB
```

### Redémarrer un service
```bash
docker-compose restart backend
```

### Arrêter tout
```bash
docker-compose down
```

### Arrêter et supprimer les données
```bash
docker-compose down -v
```

## Variables d'environnement
Toutes les variables sont configurées automatiquement. Le fichier `.env` est **ignoré par Git** pour la sécurité (contient des secrets).

**Pour développer localement** :
1. Copier le template : `cp backend/.env.example backend/.env`
2. Éditer si nécessaire : `backend/.env`

**En production** : Utilise les variables du `docker-compose.yaml` (surcharge les `.env`)

## Développement sans Docker (optionnel)
Si vous préférez développer sans conteneurs :

```bash
# Backend
cd backend
npm install
npm start

# Frontend (nouveau terminal)
cd frontend
npm install
npm start

## Contact / Licence
Ajoutez ici les informations de contact ou la licence du projet si nécessaire.

---
Si vous voulez, je peux ajouter un fichier `backend/.env.example` et un `README` plus détaillé pour le développement. Dites-moi si je dois l'ajouter.
