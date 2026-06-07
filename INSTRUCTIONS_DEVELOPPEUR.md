# 📖 DIRECTIVES D'INTÉGRATION PRAGMATIQUES (PAS-À-PAS)

---

## 🔍 MAPPING DES DÉPÔTS GITHUB & LEUR BACKEND ASSOCIÉ

Pour que tout soit parfaitement clair, voici comment associer les dépôts GitHub distants aux dossiers de code backend :

### 1. Le Dépôt `formationsession` (Dashboard Frontend)
* **Qu'est-ce que c'est ?** C'est le frontend du Dashboard (l'espace membre, le studio de cours instructeur, et le panel admin).
* **Son dossier de code local** : `f_starter_dashboard_role_template/`
* **Son Backend associé** : **`b_starter_dashboard_role_template`** (le dossier local contenant l'API Laravel d'administration générale et de gestion multi-rôles).

### 2. Le Dépôt `mindfulness-studio-ecosystem` (Monorepo global)
Ce dépôt regroupe tous les projets sous une même structure. Voici les binômes Frontend ↔ Backend à l'intérieur :

* **Binôme A (Le Dashboard applicatif)** :
  * **Frontend** : `f_starter_dashboard_role_template/` (identique au dépôt `formationsession`)
  * **Backend** : **`b_starter_dashboard_role_template/`** (API Laravel pour l'administration et les rôles)
* **Binôme B (Le Site Vitrine)** :
  * **Frontend** : `f_mindfulness/` (Landing page et vitrine)
  * **Backend** : **`b_mindfulness/`** (API Laravel pour la vitrine publique)

---

## 🛠️ FICHIERS FRONTEND À CONFIUGURER & MODIFIER

Pour connecter le **Dashboard Frontend (`formationsession` / `f_starter_dashboard_role_template`)** à votre **Backend Laravel Admin (`b_starter_dashboard_role_template`)**, vous n'avez qu'à configurer/modifier ces 3 fichiers précis :

### 📁 FICHIER 1 : L'URL de votre API Backend
* **Chemin du fichier** : `f_starter_dashboard_role_template/src/lib/api.ts`
* **Ce qu'il faut faire** : À la ligne 6, remplacez la valeur `baseURL` par l'URL locale de votre serveur Laravel :
```typescript
// Ligne 6
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ← METTEZ L'URL DE VOTRE BACKEND b_starter_dashboard_role_template ICI
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})
```

---

### 📁 FICHIER 2 : L'Authentification (Connexion, Inscription, Session utilisateur)
* **Chemin du fichier** : `f_starter_dashboard_role_template/src/services/auth-service.ts`
* **Ce qu'il faut faire** : Remplacer les fausses données simulées (Mocks) par des requêtes Axios réelles vers votre backend Laravel.

#### 1. Remplacer la fonction `login` (Ligne 52) :
```typescript
// Remplacez tout le contenu de la méthode login par :
async login(credentials: LoginCredentials): Promise<LoginResponse> {
  // 1. Obtenir le cookie CSRF (Laravel Sanctum)
  await api.get('/csrf-cookie'); 
  
  // 2. Envoyer les identifiants de connexion
  const response = await api.post('/login', credentials);
  const user = response.data.user;
  
  // Sauvegarde locale de la session utilisateur
  localStorage.setItem('mock_user', JSON.stringify(user));
  return {
    two_factor: false,
    user,
  };
}
```

#### 2. Remplacer la fonction `getCurrentUser` (Ligne 99) :
```typescript
// Remplacez par un appel API qui récupère l'utilisateur connecté depuis Laravel :
async getCurrentUser(): Promise<User> {
  const response = await api.get('/user');
  const user = response.data;
  localStorage.setItem('mock_user', JSON.stringify(user));
  return user;
}
```

#### 3. Remplacer la fonction `logout` (Ligne 92) :
```typescript
// Remplacez par :
async logout(): Promise<void> {
  await api.post('/logout');
  localStorage.removeItem('mock_user');
}
```

---

### 📁 FICHIER 3 : Le Store des Cours (Création de cours, Syllabus, Modules, Leçons, Quiz)
* **Chemin du fichier** : `f_starter_dashboard_role_template/src/stores/courses-store.ts`
* **Ce qu'il faut faire** : Relier les actions de création et d'édition de cours du studio instructeur à vos routes API Laravel.

#### 1. Création d'un cours (Ligne 729, fonction `addCourse`) :
```typescript
// Au lieu d'ajouter le cours dans le tableau local en mémoire, envoyez-le à Laravel :
addCourse: async (course) => {
  const response = await api.post('/courses', course);
  const newCourse = response.data;
  
  // Optionnel : recharger la liste des cours depuis le serveur
  get().fetchCourses(); 
  
  return newCourse.id; // Retourne l'UUID créé par Laravel (redirige automatiquement vers la page d'édition)
}
```

#### 2. Ajout de Module (Ligne 746, fonction `addModule`) :
```typescript
// Relier à une route POST /api/courses/{courseId}/modules
addModule: async (courseId, title) => {
  await api.post(`/courses/${courseId}/modules`, { title });
  get().fetchCourses(); // Rafraîchit l'affichage du syllabus
}
```

#### 3. Ajout de Leçon (Ligne 818, fonction `addLesson`) :
```typescript
// Relier à une route POST /api/courses/{courseId}/modules/{moduleId}/lessons
addLesson: async (courseId, moduleId, lesson) => {
  await api.post(`/courses/${courseId}/modules/${moduleId}/lessons`, lesson);
  get().fetchCourses();
}
```

---

## 🗄️ STRUCTURES SQL ATTENDUES DANS LARAVEL

Pour assurer la compatibilité avec l'affichage et les redirections des interfaces, prévoyez ces structures de données :

1. **Table `users`** :
   * `id`, `name`, `email`, `password`.
   * `role` : Type VARCHAR (doit impérativement contenir `'admin'`, `'instructor'` ou `'client'`).
   * `status` : Type VARCHAR (pour les instructeurs : `'en_attente'`, `'approuve'`, `'suspendu'`).

2. **Table `courses`** :
   * `id` (UUID ou Integer), `title`, `description`, `price` (decimal), `level` (`'Débutant'`, `'Intermédiaire'`, `'Avancé'`).
   * `instructor_id` (clé étrangère vers `users.id`).
   * `status` (`'brouillon'`, `'publié'`).

3. **Table `lessons`** :
   * `id`, `module_id` (clé étrangère).
   * `title`, `type` (`'video'`, `'pdf'`, `'audio'`, `'text'`).
   * `resourceUrl` (VARCHAR pour stocker les liens médias de type Youtube, Vimeo, S3, etc.).
   * `quiz` (colonne de type JSON pour stocker le tableau de questions du quiz).
