# 🚀 DIRECTIVE D'INTÉGRATION PAS-À-PAS : DEVS BACKEND (LARAVEL)

Ce document décrit les étapes précises à suivre pour connecter les frontends React/TypeScript aux backends Laravel du monorepo.

---

## ÉTAPE 1 : Récupération du Code
1. Clonez le dépôt principal de l'écosystème :
   ```bash
   git clone https://github.com/Creativityliberty/mindfulness-studio-ecosystem.git
   cd mindfulness-studio-ecosystem
   ```
2. Installez les dépendances des frontends :
   * **Vitrine (Port 3001)** : 
     ```bash
     cd f_mindfulness && npm install
     ```
   * **Dashboard (Port 3000)** : 
     ```bash
     cd f_starter_dashboard_role_template && npm install
     ```

---

## ÉTAPE 2 : Configuration des Backends Laravel
1. Configurez les fichiers `.env` dans les dossiers backends :
   * **`b_mindfulness`** (Vitrine)
   * **`b_starter_dashboard_role_template`** (Dashboard Admin/Rôles)
2. Dans le fichier `config/cors.php` des deux backends Laravel, autorisez explicitement les origines frontends :
   ```php
   'allowed_origins' => [
       'http://localhost:3000', // Dashboard SPA
       'http://localhost:3001', // Vitrine SSR
   ],
   'supports_credentials' => true,
   ```

---

## ÉTAPE 3 : Configuration d'Environnement des Frontends
1. Dans le dossier `f_starter_dashboard_role_template/`, créez un fichier `.env` local :
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
   *(Remplacez par l'URL locale de votre serveur Laravel pour le dashboard)*
2. Dans le dossier `f_mindfulness/`, créez un fichier `.env` local :
   ```env
   VITE_API_URL=http://localhost:8001/api
   ```
   *(Remplacez par l'URL locale de votre serveur Laravel pour la vitrine)*

---

## ÉTAPE 4 : Intégration de l'Authentification (Sanctum / Fortify)
Le frontend stocke actuellement sa session utilisateur fictive dans `f_starter_dashboard_role_template/src/stores/auth-store.ts`.
1. Modifiez la méthode `login` du store pour faire une requête `POST` vers l'endpoint de connexion Laravel (`/api/login`).
2. À la connexion, récupérez le token Bearer renvoyé par Laravel Sanctum et stockez-le en session locale.
3. Configurez les requêtes HTTP (via Axios/Fetch) pour inclure systématiquement le header :
   ```javascript
   Authorization: Bearer <votre_token>
   ```

---

## ÉTAPE 5 : Branchement du Studio Instructeur (Syllabus, Quiz, Ressources)
Toute la logique du studio de création de cours de l'instructeur se trouve dans `f_starter_dashboard_role_template/src/stores/courses-store.ts`.
Vous devez relier les actions de ce store à vos endpoints Laravel :

1. **Création / Édition de Cours (`addCourse`, `updateCourse`)** :
   * Envoyer une requête HTTP `POST` ou `PUT` vers `/api/courses`.
   * Veillez à ce que l'ID de l'instructeur connecté soit lié au cours côté backend. Si le cours ne possède pas l'ID de l'instructeur connecté, la vérification de propriété (`isOwner`) dans le fichier `courses.$courseId.tsx` affichera "Accès refusé".
2. **Modules (`addModule`, `deleteModule`)** :
   * Associer les requêtes de création et de suppression de modules aux tables de la base de données.
3. **Leçons et Médias (`addLesson`, `updateLesson`, `deleteLesson`)** :
   * Gérer l'envoi des URLs de ressources médias (Vidéo, PDF, Audio, Texte).
   * L'onglet "Ressources média" du frontend lira automatiquement ces URLs pour afficher les lecteurs vidéos et audio intégrés.
4. **Questionnaires (`saveQuiz`)** :
   * L'action de sauvegarde envoie les questions sous forme de tableau JSON. Gérez la sauvegarde de cette structure dans votre table `quizzes` ou directement dans une colonne JSON de votre table `lessons`.
