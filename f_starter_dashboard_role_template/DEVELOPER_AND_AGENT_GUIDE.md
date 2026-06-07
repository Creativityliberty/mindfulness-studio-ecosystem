# 📘 Guide Intégration : Développeurs PHP (Laravel) & Agents IA

Ce guide sert de référence universelle dans ce workspace pour permettre à tout **développeur backend PHP** de comprendre instantanément l'architecture et à tout **agent IA** d'obtenir le contexte complet pour coder sans erreur.

---

## 🗺️ Cartographie Visuelle des Dossiers

```
yemplate/
├── 🧘 f_mindfulness/                      # FRONT : Vitrine Marketing (SSR, TanStack Start, Port 3001)
├── ⚡ f_starter_dashboard_role_template/  # FRONT : Plateforme Applicative (SPA, React Vite, Port 3000)
│
├── 🐘 b_mindfulness/                     # BACK : Laravel principal de l'écosystème de formation
├── 🐘 b_starter_dashboard_role_template/ # BACK : Laravel d'administration & gestion multi-rôles
│
├── 🔑 auth_tanstack_start_ssr_with_sanctum/ # Démo d'intégration Sanctum (Front + Back)
├── 🛡️ fortify_auth_multiple_guard/          # Démo d'intégration multi-guards (Front + Back)
└── 📱 app_mindfulness/                   # FRONT : Application mobile hybride/compagnon
```

---

## 🤖 Instructions Spécifiques pour les AGENTS IA (Prompt System context)

Si vous êtes un agent d'IA intervenant sur ce projet, respectez ces règles d'or :
1. **Pas d'ad-hoc styling** : Utilisez les variables CSS v4 globales et les utilitaires Tailwind configurés dans les dossiers front.
2. **CORS & Ports** : N'oubliez jamais que `f_starter_dashboard_role_template` (3000) et `f_mindfulness` (3001) partagent leurs données via des appels API (`POST /api/sync-courses` sur la vitrine). Toute modification du store de cours (`courses-store.ts`) doit propager l'état.
3. **Traductions** : L'ensemble de l'interface utilisateur finale doit rester strictement en **Français**.
4. **Typage strict** : Respectez scrupuleusement les définitions TypeScript du dossier `src/types/` et la structure générée dans `src/routeTree.gen.ts`.

---

## 🐘 Guide pour le Développeur Backend PHP (Laravel)

En tant que développeur PHP, voici où se trouvent les pièces maêtresses et comment implémenter la logique dynamique sur les dossiers `b_mindfulness` ou `b_starter_dashboard_role_template`.

### 1. Structure Standard Laravel à Retenir
Dans chaque projet Laravel :
* **Modèles & Logique métier** : `app/Models/` (ex: `User.php`, `Course.php`, `Instructor.php`).
* **Contrôleurs de l'API** : `app/Http/Controllers/Api/` (gestion des cours, souscription, onboarding).
* **Définition des Routes API** : `routes/api.php` (protégées par le middleware de Sanctum).
* **Migrations et Seeders** : `database/migrations/` et `database/seeders/` pour injecter les utilisateurs par défaut (admin, instructeurs).

### 2. Gestion de l'Authentification & Multi-Guards
Les templates intègrent **Laravel Sanctum** et **Laravel Fortify** :
* **Sanctum (API REST State-less)** : Le frontend React envoie des requêtes avec le header `Authorization: Bearer <token>` ou utilise des cookies de session d'état (Sanctum SPA cookie-based auth).
* **Configuration Multi-Guards** (`fortify_auth_multiple_guard`) :
  * Si vous séparez les tables élèves et administrateurs/formateurs, configurez les guards dans `config/auth.php`.
  * Exemple de middleware dans `app/Http/Middleware/` pour vérifier le rôle décodé depuis le token Sanctum ou la session :
    ```php
    if ($request->user()->role !== 'admin') {
        return response()->json(['error' => 'Non autorisé'], 403);
    }
    ```

### 3. Modèles de Données requis pour le Sync
Pour alimenter les dashboards et la vitrine, la base de données doit avoir les structures suivantes :

#### Table `courses` (Formations)
* `id` (int/uuid)
* `title` (string)
* `description` (text)
* `price` (decimal)
* `level` (enum: débutant, intermédiaire, avancé)
* `instructor_id` (foreign key)
* `status` (enum: draft, published)
* `chapters` (json ou relation)

#### Table `instructors` (Candidatures & Gains)
* `id` (int/uuid)
* `user_id` (foreign key vers `users`)
* `specialty` (string)
* `bio` (text)
* `status` (enum: pending, approved, suspended)
* `accumulated_earnings` (decimal)

---

## 🔌 Comment Connecter le Front React avec le Back Laravel

### Étape 1 : Configurer CORS sur Laravel
Dans `config/cors.php`, assurez-vous que les ports frontaux sont autorisés :
```php
'allowed_origins' => [
    'http://localhost:3000',
    'http://localhost:3001',
],
'supports_credentials' => true,
```

### Étape 2 : Brancher les Appels API dans le Frontend
Dans le dossier du frontend (`f_starter_dashboard_role_template`), modifiez les services d'appel dans `src/services/` ou configurez un client Axios/Fetch global pointant vers l'URL locale de votre serveur Laravel (ex: `http://localhost:8000/api`).

Exemple de flow d'onboarding formateur :
1. L'instructeur postule sur la page `/register-instructor` du frontend (React).
2. React envoie une requête `POST` à `http://localhost:8000/api/instructors/register`.
3. Laravel crée l'utilisateur avec le rôle `instructor`, l'état `pending`, et notifie l'administrateur.
4. L'administrateur (Fabienne) approuve sur son dashboard. L'état passe à `approved` et le formateur peut désormais créer des cours.
