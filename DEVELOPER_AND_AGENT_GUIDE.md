# 📘 Guide d'Intégration & Architecture : Mindfulness Studio Ecosystem

Ce guide sert de référence universelle pour l'écosystème **Mindfulness Studio**. Il explique la topologie des projets, la gestion des dépôts Git et de leurs branches, ainsi que le protocole pour connecter les applications frontend avec les API backend Laravel.

---

## 🗺️ Cartographie de l'Écosystème (Monorepo)

Le dossier racine contient les modules suivants :

* **🧘 f_mindfulness** : Vitrine marketing publique (SSR, TanStack Start, Port 3001).
* **⚡ f_starter_dashboard_role_template** : Plateforme applicative (SPA, React Vite, Port 3000) pour l'administration et le studio instructeur.
* **🐘 b_mindfulness** : Backend Laravel principal pour la gestion des formations et de la vitrine.
* **🐘 b_starter_dashboard_role_template** : Backend Laravel d'administration et de gestion multi-rôles.
* **🔑 auth_tanstack_start_ssr_with_sanctum** : Démo technique d'intégration Sanctum (Front + Back).
* **🛡️ fortify_auth_multiple_guard** : Démo d'intégration multi-guards Laravel.
* **📱 app_mindfulness** : Application mobile hybride compagnon.

---

## 🐙 Gestion des Dépôts Git & Branches

L'écosystème est divisé en deux dépôts GitHub distincts :

### 1. Dépôt Racine (`mindfulness-studio-ecosystem`)
* **URL** : `https://github.com/Creativityliberty/mindfulness-studio-ecosystem.git`
* **Contenu** : L'ensemble complet du monorepo incluant tous les modules (fronts, backs, app, démos).
* **Branche `main`** : Version stable et synchronisée de l'écosystème global.

### 2. Dépôt du Dashboard SPA (`formationsession`)
* **URL** : `https://github.com/Creativityliberty/formationsession.git`
* **Contenu** : Spécifiquement le dossier `f_starter_dashboard_role_template`.
* **Branche `main`** : Code de base stable du dashboard d'administration.
* **Branche `dev-antigravity-studio`** : Branche active de développement contenant les fonctionnalités premium d'édition de cours pour instructeurs (curriculum complet, éditeur de quiz, bibliothèque de ressources médias, et correctif du store `instructorId`).

---

## 🐘 Guide de Connexion : Frontends React ↔ Backends Laravel

Pour connecter les applications clientes à vos services API PHP, suivez ces directives de configuration :

### 1. Correspondance des Modules
* **`f_starter_dashboard_role_template`** (React SPA) doit consommer **`b_starter_dashboard_role_template`** (Laravel Admin).
* **`f_mindfulness`** (TanStack Start SSR) et **`app_mindfulness`** (Mobile) doivent consommer **`b_mindfulness`** (Laravel Vitrine).

### 2. Configuration CORS sur les API Laravel
Dans le fichier `config/cors.php` de chaque projet Laravel, autorisez explicitement les ports du frontend :
```php
'allowed_origins' => [
    'http://localhost:3000', // Dashboard SPA
    'http://localhost:3001', // Vitrine SSR
],
'supports_credentials' => true,
```

### 3. Variables d'Environnement
Dans les dossiers frontend (`f_starter_dashboard_role_template` et `f_mindfulness`), configurez l'URL cible de votre API dans le fichier `.env` local :
```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Remplacement des Mocks (Zustand) par les Données API
Les applications frontend utilisent actuellement des stores Zustand persistants locaux pour simuler les données :
* **Store d'Authentification** (`auth-store.ts`) : À relier aux endpoints Laravel Fortify/Sanctum pour stocker le token Bearer (`Authorization: Bearer <token>`) à la connexion.
* **Store de Cours** (`courses-store.ts`) : À interfacer avec l'API Laravel de gestion de cours.
  * **Exemple d'action de cours** : `addCourse()` et `addModule()` doivent envoyer des requêtes `POST` à l'API Laravel au lieu de manipuler uniquement l'état local.
  * **Exemple d'association d'instructeur** : Assurez-vous que l'ID de l'instructeur connecté (extrait du token ou de la session) est injecté lors de la création d'une formation afin de passer avec succès la validation de propriété (`isOwner`).

### 5. Sécurisation et Multi-Guards
Les endpoints Laravel doivent être protégés par le middleware `auth:sanctum`. Appliquez des filtres basés sur le rôle de l'utilisateur (`admin`, `instructor`, `client`) pour empêcher tout accès non autorisé aux formulaires d'édition de cours et aux statistiques financières.
