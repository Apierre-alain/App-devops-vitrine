# Développement — Backend

Ce dossier contient le serveur Node/Express du projet.

**Prérequis**
- `node` et `npm` installés (vérifiez la version dans `package.json`).

**Installation**

    cd backend
    npm install

**Variables d'environnement**
Copiez `backend/.env.example` en `backend/.env` et adaptez les valeurs :
- `DATABASE_URL` — URL de la base de données (ex. MongoDB)
- `JWT_SECRET` — clé secrète pour les tokens JWT
- `PORT` — port d'écoute (par défaut 5000)
- `NODE_ENV`, `LOG_LEVEL`

**Lancer en local (sans Docker)**

    # depuis le dossier backend
    npm install
    # démarre le serveur (script `start` défini dans package.json)
    npm start

    # ou (mode développement avec nodemon)
    npm install -D nodemon
    npx nodemon src/server.js

**Lancer avec Docker Compose (depuis la racine du projet)**

    docker-compose up -d --build backend

**Logs & dépannage**
- Voir les logs du conteneur : `docker-compose logs -f backend`
- Si le serveur ne démarre pas, vérifiez :
  - que `backend/.env` existe et contient `DATABASE_URL` et `JWT_SECRET`
  - que la base de données est joignable

**Tests**
Pas de tests automatisés fournis pour l'instant.
