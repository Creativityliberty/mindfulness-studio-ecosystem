# 🐘 Guide Technique : Intégration API Laravel & Synchronisation Globale

Ce document détaille, étape par étape, comment connecter l'écosystème frontend React (`f_starter_dashboard_role_template`) à un backend PHP **Laravel** en utilisant **Laravel Sanctum** pour l'authentification et les API RESTful.

---

## 🔑 Comptes de Test en Développement (Mock Mode)

Pour tester la plateforme localement avant le branchement API réel, utilisez les comptes pré-configurés ci-dessous. Le mot de passe unique pour tous les comptes est **`password`** :

| Rôle | Adresse Email de Test | Rôle Système | Accès Tableaux de Bord |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@test.com` | Administrateur principal | Moderation des instructeurs, Finances, Stats globales |
| **Formateur** | `instructor@test.com` | Instructeur agréé | Création de cours, chapitres, suivi des gains |
| **Élève** | `client@test.com` | Étudiant (Client) | Catalogue, mes formations, certificats, factures |

---

## ⚙️ Configuration des Variables d'Environnement (`.env`)

Afin d'éviter d'avoir des adresses IP ou des ports codés en dur dans le code, configurez les variables suivantes dans vos fichiers d'environnement.

### 1. Variables Frontend (React SPA - Port 3000)
Créez ou modifiez le fichier `f_starter_dashboard_role_template/.env` :
```env
# URL de la vitrine marketing
VITE_VITRINE_URL=http://localhost:3001

# URL de l'API backend Laravel
VITE_API_URL=http://localhost:8000
```

### 2. Variables Vitrine (TanStack Start - Port 3001)
Créez ou modifiez le fichier `f_mindfulness/.env` :
```env
# URL de l'application plateforme React
VITE_PLATFORM_URL=http://localhost:3000
```

### 3. Variables Backend Laravel (Port 8000)
Créez ou modifiez le fichier `.env` de votre projet Laravel :
```env
# URL de la vitrine pour les notifications de synchronisation
VITRINE_URL=http://localhost:3001
```

---

## 🛠️ Phase 1 : Configuration Initiale de Laravel

### 1. Installation de Laravel Sanctum
Dans votre projet Laravel backend (`b_mindfulness` ou `b_starter_dashboard_role_template`) :
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 2. Configuration CORS (`config/cors.php`)
Autorisez explicitement les deux ports de développement frontend à échanger des requêtes avec votre API backend :
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:3000'), // Port de l'application React SPA
        env('VITRINE_URL', 'http://localhost:3001'),   // Port de la vitrine SSR
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Requis si vous utilisez l'authentification par cookie de session
];
```

### 3. Middleware de Sanctum (`app/Http/Kernel.php`)
Dans la clé `api` du tableau `$middlewareGroups`, assurez-vous d'avoir le middleware de Sanctum pour prendre en charge les cookies :
```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

---

## 💾 Phase 2 : Schéma et Migrations de la Base de Données

Créez et structurez vos tables SQL pour correspondre aux modèles attendus par le client.

### 1. Table `users` (Utilisateurs et Rôles)
Modifiez la migration par défaut de la table `users` pour inclure le rôle :
```php
Schema::table('users', function (Blueprint $table) {
    // Rôles acceptés : admin, instructor, client
    $table->string('role')->default('client');
});
```

### 2. Table `instructors` (Détails des Candidatures et Gains)
Générez le modèle et la migration associés :
```bash
php artisan make:model Instructor -m
```
Structure de la table `database/migrations/xxxx_create_instructors_table.php` :
```php
Schema::create('instructors', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('specialty');
    $table->text('bio')->nullable();
    // pending = candidature en attente, approved = accepté, suspended = suspendu
    $table->enum('status', ['pending', 'approved', 'suspended'])->default('pending');
    $table->decimal('accumulated_earnings', 10, 2)->default(0.00);
    $table->timestamps();
});
```

### 3. Table `courses` (Catalogue des Formations)
```bash
php artisan make:model Course -m
```
Structure de la table `database/migrations/xxxx_create_courses_table.php` :
```php
Schema::create('courses', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('description');
    $table->decimal('price', 8, 2);
    $table->string('level'); // débutant, intermédiaire, avancé
    $table->string('category')->default('Général');
    $table->foreignId('instructor_id')->constrained('users')->onDelete('cascade');
    $table->string('status')->default('draft'); // draft, published
    $table->timestamps();
});
```

### 4. Table `transactions` (Historique des Achats)
```bash
php artisan make:model Transaction -m
```
Structure de la table `database/migrations/xxxx_create_transactions_table.php` :
```php
Schema::create('transactions', function (Blueprint $table) {
    $table->id(); // Peut être généré sous forme de hash (ex: tx-lh-150)
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('course_id')->constrained()->onDelete('cascade');
    $table->string('course_title');
    $table->decimal('amount', 8, 2);
    $table->string('status')->default('Reçu'); // Reçu, Échoué
    $table->timestamps();
});
```

---

## 🔌 Phase 3 : Routes et Contrôleurs de l'API (`routes/api.php`)

Voici comment définir vos points d'accès API.

```php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\InstructorController;
use App\Http\Controllers\Api\CourseController;

// --- Routes Publiques ---
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/register-instructor', [InstructorController::class, 'apply']);

// --- Routes Protégées (Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    
    // --- Routes Client (Student) ---
    Route::get('/client/courses', [CourseController::class, 'myEnrollments']);
    Route::post('/client/checkout', [CourseController::class, 'checkout']);
    Route::get('/client/transactions', [CourseController::class, 'transactions']);

    // --- Routes Instructeur ---
    Route::middleware('role:instructor')->group(function () {
        Route::get('/instructor/courses', [InstructorController::class, 'courses']);
        Route::post('/instructor/courses', [InstructorController::class, 'createCourse']);
        Route::put('/instructor/courses/{id}', [InstructorController::class, 'updateCourse']);
    });

    // --- Routes Administrateur ---
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/instructors', [AdminController::class, 'listInstructors']);
        Route::put('/admin/instructors/{id}/status', [AdminController::class, 'updateInstructorStatus']);
        Route::get('/admin/dashboard/stats', [AdminController::class, 'getStats']);
    });
});
```

### Exemple de Middleware pour valider les Rôles (`app/Http/Middleware/RoleMiddleware.php`)
```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role)
    {
        if ($request->user() && $request->user()->role === $role) {
            return $next($request);
        }
        
        return response()->json(['error' => 'Accès non autorisé.'], 403);
    }
}
```
*(N'oubliez pas d'enregistrer le middleware sous le nom `role` dans `app/Http/Kernel.php` ou dans la configuration globale de vos middlewares).*

---

## 🔄 Phase 4 : Déclenchement automatique de la Synchro de la Vitrine (Port 3001)

Chaque fois qu'un cours est créé ou modifié par un instructeur (ou validé par l'admin) dans la base Laravel, le serveur Laravel doit notifier le serveur de la vitrine (`f_mindfulness` tournant sur le port 3001) pour mettre à jour son fichier `courses-db.json`.

Dans le modèle `Course` ou dans son Controller, déclenchez une requête HTTP POST :

```php
// App/Http/Controllers/Api/InstructorController.php
use Illuminate\Support\Facades\Http;

public function createCourse(Request $request) 
{
    // 1. Validation et enregistrement du cours en base de données
    $course = new Course();
    // ... assignation des variables ...
    $course->save();

    // 2. Récupérer tous les cours publiés pour synchroniser la vitrine
    $allPublishedCourses = Course::where('status', 'published')->get();

    // 3. Déclencher le webhook de synchro vers la vitrine (via variable d'environnement)
    $vitrineUrl = env('VITRINE_URL', 'http://localhost:3001');
    try {
        Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post($vitrineUrl . '/api/sync-courses', [
            'courses' => $allPublishedCourses->toArray()
        ]);
    } catch (\Exception $e) {
        // Loggez l'erreur de connexion mais ne bloquez pas l'utilisateur
        Log::error("Échec de la synchronisation de la vitrine : " . $e->getMessage());
    }

    return response()->json($course, 201);
}
```

---

## ⚡ Phase 5 : Remplacement des Simulations dans le Frontend (React)

Côté client (`f_starter_dashboard_role_template`), modifiez les stores Zustand pour remplacer les données simulées par des appels réseau.

### Exemple : Remplacement du Store d'authentification (`src/stores/auth-store.ts`)
```typescript
// Avant : simulation locale
// Après : intégration de fetch/axios vers Laravel
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    // 1. Appel du cookie CSRF Sanctum
    await fetch('http://localhost:8000/sanctum/csrf-cookie', { method: 'GET' })
    
    // 2. Authentification
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (response.ok) {
      const userData = await response.json()
      set({ user: userData, isAuthenticated: true })
    }
  }
}))
```
