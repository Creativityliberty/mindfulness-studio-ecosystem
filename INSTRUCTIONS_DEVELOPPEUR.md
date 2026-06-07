# 📖 DIRECTIVES D'INTÉGRATION PRAGMATIQUES (PAS-À-PAS)

---

## 🔍 COMPRENDRE L'ARCHITECTURE : QUI FAIT QUOI ?

Le projet est divisé en **2 sous-systèmes indépendants** (Vitrine d'un côté, Dashboard applicatif de l'autre). Chaque frontend a son propre backend Laravel associé :

### 1. Le Système Vitrine (Marketing / Vente)
* **Frontend (`f_mindfulness`)** :
  * **Rôle** : Site vitrine public, Landing Page (Tourne sur le **Port 3001**). C'est là que les visiteurs découvrent les cours, s'inscrivent, postulent pour devenir praticien et contactent l'équipe.
  * **Techno** : TanStack Start SSR (React).
* **Backend (`b_mindfulness`)** :
  * **Rôle** : API Laravel principale de la vitrine. Gère les cours publiés visibles publiquement, le catalogue et les formulaires de contact.

### 2. Le Système Dashboard (Espace Apprenant / Studio Instructeur / Administration)
* **Frontend (`f_starter_dashboard_role_template`)** :
  * **Rôle** : Plateforme applicative connectée (Tourne sur le **Port 3000**). C'est l'espace où :
    * Les **Clients** suivent les cours, regardent les vidéos, passent les quiz et téléchargent leurs certificats.
    * Les **Instructeurs** gèrent leurs revenus et créent leurs cours (Syllabus, modules, leçons, quiz).
    * Les **Administrateurs** modèrent la plateforme (validation des instructeurs, suivi des paiements).
  * **Techno** : SPA React + Vite + TanStack Router.
* **Backend (`b_starter_dashboard_role_template`)** :
  * **Rôle** : API Laravel d'administration. Gère l'authentification multi-rôles, le studio d'édition de cours, la validation des formateurs, l'historique des achats et la génération des reçus/diplômes.

---

## 🛠️ FICHIERS FRONTEND À CONFIUGURER & MODIFIER

Pour connecter le **Dashboard Frontend (`f_starter_dashboard_role_template`)** à votre **Backend Laravel Admin (`b_starter_dashboard_role_template`)**, vous n'avez qu'à configurer/modifier ces 3 fichiers précis :

### 📁 FICHIER 1 : L'URL de votre API Backend
* **Chemin du fichier** : `f_starter_dashboard_role_template/src/lib/api.ts`
* **Ce qu'il faut faire** : À la ligne 6, remplacez la valeur `baseURL` par l'URL locale de votre serveur Laravel :
```typescript
// Ligne 6
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ← METTEZ VOTRE URL LOCAL LARAVEL D'ADMINISTRATION ICI
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
