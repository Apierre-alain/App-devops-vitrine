# App DevOps — Stack Full-Stack

Ce dépôt est un projet vitrine d'une architecture full-stack / DevOps. Projet d'apprentissage, assisté par IA pour la documentation et le debugging. Si cela ressemble à du code fait par IA, c'est elle qui à corrigé mes erreur.

Application full-stack moderne avec React (frontend), Node/Express (backend), MongoDB (base de données) et Nginx (reverse proxy). Déployée avec Docker et Docker Compose.

---

## Prérequis

- Docker ([installer ici](https://www.docker.com/products/docker-desktop))
- docker-compose (généralement inclus avec Docker Desktop)

Node, npm, MongoDB, etc. sont conteneurisés et inclus dans ce projet.

---

## Démarrage

```bash
docker-compose up -d --build
```

Accédez à l'application via :
- App web : http://localhost
- API : http://localhost/api
- Health check : http://localhost/health

Le démarrage initial peut prendre 30-60 secondes.

---

## Structure du projet

```
app-devops/
├── docker-compose.yaml      # Orchestration des services
├── backend/                 # API Node/Express
│   ├── .env.example        # Template de configuration
│   ├── Dockerfile
│   └── src/
├── frontend/               # Application React
│   ├── Dockerfile
│   └── src/
└── nginx/                  # Reverse proxy
    ├── Dockerfile
    └── nginx.conf
```

---

## Architecture

```
Client (Browser)
    ↓ :80
    ↓
NGINX (Reverse Proxy)
├─ Route /     → Frontend (React)
├─ Route /api  → Backend (Express)
└─ Route /health → Backend health endpoint
    ↓                  ↓
Frontend           Backend
(React)            (Express)
                       ↓
                   MongoDB
```

---

## Commandes

### Afficher les logs
```bash
docker-compose logs -f               # Tous
docker-compose logs -f backend       # Backend uniquement
docker-compose logs -f mongodb       # MongoDB uniquement
```

### Redémarrer un service
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Arrêter les services
```bash
docker-compose down                  # Arrête tous les services
docker-compose down -v               # Arrête et supprime les volumes
```

### Reconstruction d'un service
```bash
docker-compose up -d --build backend
```

---

## Variables d'environnement

### Système .env

| Fichier | Localisation | Git | Rôle |
|---------|------|------|------|
| `.env.example` | `backend/` | Poussé | Template de configuration |
| `.env` | `backend/` | Ignoré (.gitignore) | Variables de production/secrets |

### Fonctionnement

- `.env.example` est poussé sur le dépôt (pas de secrets)
- Au build Docker, si `.env` n'existe pas, il est créé depuis `.env.example`
- Vous pouvez personnaliser `backend/.env` localement sans impact sur Git

### Configuration disponible

```bash
cat backend/.env.example
```

Variables configurées par défaut :
- `MONGODB_URI` - Connexion MongoDB locale
- `JWT_SECRET` - Clé de signature des tokens
- `NODE_ENV` - Mode d'exécution (production)
- `PORT_BACKEND` - Port interne du backend (3000)

---

## Développement local (sans Docker)

Pour développer sans conteneurs, vous avez besoin de Node.js et npm installés localement.

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Configuration requise :
- Le backend a besoin d'une instance MongoDB (configurer `MONGODB_URI` dans `.env`)
- Frontend : http://localhost:3000
- API Backend : http://localhost:5000

---

## Dépannage

**Services qui ne démarrent pas**
```bash
docker-compose logs          # Consulter les erreurs
docker-compose down -v       # Nettoyer tous les volumes
docker-compose up -d --build # Relancer
```

**Port 80 déjà utilisé**
Modifier le port dans `docker-compose.yaml` :
```yaml
ports:
  - "8080:80"  # Utiliser le port 8080 à la place de 80
```

**Connexion MongoDB impossible**
- MongoDB initialise la base au premier démarrage (peut prendre 30 secondes)
- Vérifier : `docker-compose logs mongodb`

**Accès direct à MongoDB**
```bash
docker exec -it mongodb mongosh -u admin -p password123
```

---

## Stack technique

- **Frontend** : React 19, React Router, Axios
- **Backend** : Express 5, Mongoose, JWT, Winston
- **Database** : MongoDB
- **Proxy** : Nginx
- **Infrastructure** : Docker, Docker Compose

---
