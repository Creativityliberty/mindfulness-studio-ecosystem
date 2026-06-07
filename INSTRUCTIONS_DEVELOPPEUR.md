# 📖 DIRECTIVES PRAGMATIQUES POUR LES DÉVELOPPEURS LARAVEL (PAS-À-PAS)

Si vous ne connaissez pas le frontend (React/Zustand), pas de panique. Voici **les 3 seuls fichiers** du dossier `f_starter_dashboard_role_template` que vous devez ouvrir et modifier pour connecter vos API Laravel.

---

## 🛠️ FICHIER 1 : L'URL de votre API Backend
* **Chemin du fichier** : `f_starter_dashboard_role_template/src/lib/api.ts`
* **Ce qu'il faut faire** : À la ligne 6, remplacez la valeur `baseURL` par l'URL locale de votre serveur Laravel :
```typescript
// Ligne 6
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ← METTEZ VOTRE URL LOCAL LARAVEL ICI
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})
```

---

## 🛠️ FICHIER 2 : L'Authentification (Connexion, Inscription, Utilisateur)
* **Chemin du fichier** : `f_starter_dashboard_role_template/src/services/auth-service.ts`
* **Ce qu'il faut faire** : Actuellement, ce fichier utilise des fausses données simulées (Mocks). Vous devez remplacer les méthodes par des requêtes Axios réelles vers votre backend Laravel :

### 1. Remplacer la fonction `login` (Ligne 52) :
```typescript
// Remplacez tout le contenu de la méthode login par :
async login(credentials: LoginCredentials): Promise<LoginResponse> {
  // 1. Obtenir le cookie CSRF (Sanctum)
  await api.get('/csrf-cookie'); 
  
  // 2. Envoyer les identifiants
  const response = await api.post('/login', credentials);
  const user = response.data.user;
  
  // Sauvegarde locale de la session
  localStorage.setItem('mock_user', JSON.stringify(user));
  return {
    two_factor: false,
    user,
  };
}
```

### 2. Remplacer la fonction `getCurrentUser` (Ligne 99) :
```typescript
// Remplacez par un appel API qui récupère l'utilisateur connecté :
async getCurrentUser(): Promise<User> {
  const response = await api.get('/user');
  const user = response.data;
  localStorage.setItem('mock_user', JSON.stringify(user));
  return user;
}
```

### 3. Remplacer la fonction `logout` (Ligne 92) :
```typescript
// Remplacez par :
async logout(): Promise<void> {
  await api.post('/logout');
  localStorage.removeItem('mock_user');
}
```

---

## 🛠️ FICHIER 3 : Le Store des Cours (Syllabus, Modules, Leçons, Quiz)
* **Chemin du fichier** : `f_starter_dashboard_role_template/src/stores/courses-store.ts`
* **Ce qu'il faut faire** : Les actions de création et modification de cours sont gérées localement dans Zustand. Vous devez rediriger ces actions vers votre base de données via votre API.

### 1. Création d'un cours (Ligne 729, fonction `addCourse`) :
```typescript
// Au lieu d'ajouter le cours dans le tableau local en mémoire, envoyez-le à Laravel :
addCourse: async (course) => {
  const response = await api.post('/courses', course);
  const newCourse = response.data;
  
  // Optionnel : recharger les cours
  get().fetchCourses(); 
  
  return newCourse.id; // Retourne l'UUID créé par Laravel
}
```

### 2. Ajout de Module (Ligne 746, fonction `addModule`) :
```typescript
// Relier à une route POST /api/courses/{courseId}/modules
addModule: async (courseId, title) => {
  await api.post(`/courses/${courseId}/modules`, { title });
  get().fetchCourses(); // Rafraîchit l'affichage
}
```

### 3. Ajout de Leçon (Ligne 818, fonction `addLesson`) :
```typescript
// Relier à une route POST /api/courses/{courseId}/modules/{moduleId}/lessons
addLesson: async (courseId, moduleId, lesson) => {
  await api.post(`/courses/${courseId}/modules/${moduleId}/lessons`, lesson);
  get().fetchCourses();
}
```

---

## 🗄️ STRUCTURES SQL DE BASE (À créer dans Laravel)
Pour que les frontends affichent tout correctement, vos tables de base de données doivent comporter ces colonnes :

1. **Table `users`** :
   * `id`, `name`, `email`, `password`.
   * `role` : Type VARCHAR (doit contenir `'admin'`, `'instructor'` ou `'client'`).
   * `status` : Type VARCHAR (pour les instructeurs : `'en_attente'`, `'approuve'`, `'suspendu'`).

2. **Table `courses`** :
   * `id` (UUID recommandé), `title`, `description`, `price` (decimal), `level` (`'Débutant'`, `'Intermédiaire'`, `'Avancé'`).
   * `instructor_id` (clé étrangère vers `users.id`).
   * `status` (`'brouillon'`, `'publié'`).

3. **Table `lessons`** :
   * `id`, `module_id` (clé étrangère).
   * `title`, `type` (`'video'`, `'pdf'`, `'audio'`, `'text'`).
   * `resourceUrl` (VARCHAR pour stocker le lien vers Vimeo, Youtube, Cloudinary, S3...).
   * `quiz` (colonne de type JSON pour stocker le tableau de questions du quiz).
