# 🚀 App DevOps — Stack Full-Stack orchestrée

Projet full-stack moderne avec **React** (frontend), **Node/Express** (backend), **MongoDB** (base de données) et **Nginx** (reverse proxy). Tout dans Docker ! 🐳

---

## ⚡ Démarrage en 1 minute

```bash
docker-compose up -d --build
```

**Puis accédez à :**
- App web : http://localhost
- API : http://localhost/api
- Health check : http://localhost/health

C'est tout ! Attendez 30-60 sec au premier démarrage. 🎯

---

## 📁 Structure du projet

```
app-devops/
├── docker-compose.yaml      # Orchestre tous les services
├── backend/                 # API Node/Express
│   ├── .env.example        # Modèle de configuration
│   ├── Dockerfile          # Conteneur backend
│   └── src/                # Code source
├── frontend/               # App React
│   ├── Dockerfile          # Conteneur frontend
│   └── src/                # Composants React
└── nginx/                  # Reverse proxy
    ├── Dockerfile
    └── nginx.conf
```

---

## 🏗️ Architecture

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │ :80
       ↓
┌─────────────────────────────────────┐
│        NGINX (Reverse Proxy)        │
│  - Route /     → Frontend            │
│  - Route /api  → Backend             │
│  - Route /health → Backend health    │
└──────┬──────────────────┬────────────┘
       ↓                  ↓
   ┌────────────┐    ┌──────────────┐
   │  Frontend  │    │   Backend    │
   │  (React)   │    │ (Express)    │
   └────────────┘    └──────┬───────┘
                            ↓
                     ┌──────────────┐
                     │   MongoDB    │
                     │  (Database)  │
                     └──────────────┘
```

---

## 🛠️ Commandes essentielles

### 📊 Voir les logs
```bash
docker-compose logs -f               # Tous
docker-compose logs -f backend       # Backend uniquement
docker-compose logs -f mongodb       # MongoDB uniquement
```

### 🔄 Redémarrer un service
```bash
docker-compose restart backend       # Restart backend
docker-compose restart frontend      # Restart frontend
```

### 🛑 Arrêter
```bash
docker-compose down                  # Arrête tout
docker-compose down -v               # Arrête + efface les data
```

### 🔨 Rebuild un service
```bash
docker-compose up -d --build backend # Rebuild backend seulement
```

---

## 🔐 Variables d'environnement

### Le système `.env` expliqué

| Fichier | Où ? | Poussé sur Git ? | Rôle |
|---------|------|------------------|------|
| `.env.example` | `backend/` | ✅ Oui | Modèle / documentation |
| `.env` | `backend/` | ❌ Non (`.gitignore`) | Valeurs réelles (secrets) |

### Comment ça marche

1. **Quand tu pushes** = Seul `.env.example` est envoyé (pas de secrets exposés)
2. **Build du Docker** = Si `.env` n'existe pas, Docker le crée depuis `.env.example`
3. **Pour toi en local** = Tu peux éventuellement modifier `backend/.env` sans que Git la force

### Modifier les variables

```bash
# Pour voir/modifier les valeurs
cat backend/.env.example

# Pour les changer localement
nano backend/.env  # ou ton éditeur préféré
```

**Valeurs par défaut** (`backend/.env.example`) :
- `MONGODB_URI` → Base de données locale (`mongodb://...`)
- `JWT_SECRET` → Clé de signature des tokens
- `NODE_ENV` → Mode `production`
- `PORT_BACKEND` → Port 3000 (interne au conteneur)

---

## 💻 Développement local (sans Docker)

Si tu préfères développer sans Docker :

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend (nouveau terminal)
```bash
cd frontend
npm install
npm start
```

**⚠️ Notes** :
- Le backend a besoin de MongoDB (configure `MONGODB_URI` dans `.env`)
- Le frontend sera sur http://localhost:3000
- L'API sera sur http://localhost:5000

---

## ❓ FAQ / Troubleshooting

**"Les services ne démarrent pas"**
```bash
docker-compose logs          # Voir les erreurs
docker-compose down -v       # Nettoyer
docker-compose up -d --build # Relancer
```

**"Port 80 déjà utilisé"**
- Modifier le port dans `docker-compose.yaml` : `"8080:80"` au lieu de `"80:80"`

**"MongoDB ne se connecte pas"**
- Attendre ~30 sec au premier démarrage (MongoDB initialise la base)
- Vérifier : `docker-compose logs mongodb`

**"Je veux accéder à MongoDB directement"**
```bash
# Via le conteneur
docker exec -it mongodb mongosh -u admin -p password123
```

---

## 📦 Stack technique

- **Frontend** : React 19, React Router, Axios
- **Backend** : Express 5, Mongoose, JWT, Winston logs
- **Database** : MongoDB
- **Proxy** : Nginx
- **Container** : Docker & Docker Compose

---
