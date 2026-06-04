import { Sidebar } from "./Sidebar";

export default function StudentDashboardWireframe({ onViewCourse, onNavigate }: { onViewCourse: () => void; onNavigate?: (view: any) => void }) {
  const isNewStudent = false; // Changed to false to show courses

  const courses = [
    {
      id: 1,
      title: "Marketing Digital",
      level: "Débutant",
      progress: 62,
      status: "Continuer",
      badge: "En cours",
    },
    {
      id: 2,
      title: "Copywriting Avancé",
      level: "Intermédiaire",
      progress: 38,
      status: "Continuer",
      badge: "Populaire",
    },
    {
      id: 3,
      title: "SEO Stratégique",
      level: "Débutant",
      progress: 0,
      status: "Commencer",
      badge: "Nouveau",
    },
    {
      id: 4,
      title: "Personal Branding",
      level: "Intermédiaire",
      progress: 100,
      status: "Revoir",
      badge: "Terminé",
    },
    {
      id: 5,
      title: "Tunnel de Vente",
      level: "Avancé",
      progress: 12,
      status: "Continuer",
      badge: "En cours",
    },
    {
      id: 6,
      title: "Email Marketing",
      level: "Débutant",
      progress: 0,
      status: "Commencer",
      badge: "Recommandé",
    },
  ];

  const activities = [
    "Vous avez terminé “Introduction au branding”",
    "Quiz validé à 85%",
    "Nouveau module disponible dans Copywriting Avancé",
    "Vous avez commencé “SEO Stratégique”",
  ];

  const gettingStartedItems = [
    "Complétez votre profil pour personnaliser votre expérience",
    "Choisissez votre première formation dans le catalogue",
    "Commencez la première leçon pour débloquer votre progression",
    "Activez les notifications pour suivre les nouveautés",
  ];

  const recommendations = [
    "Création de contenu",
    "Acquisition client",
    "Storytelling de marque",
  ];

  const stats = [
    { value: "3", label: "Formations en cours" },
    { value: "18", label: "Leçons terminées" },
    { value: "5h 40", label: "Temps appris" },
    { value: "1", label: "Certificat obtenu" },
  ];

  const emptyStats = [
    { value: "0", label: "Formation commencée" },
    { value: "0", label: "Leçon terminée" },
    { value: "0h", label: "Temps appris" },
    { value: "0", label: "Certificat obtenu" },
  ];

  const displayedStats = isNewStudent ? emptyStats : stats;
  const displayedActivityItems = isNewStudent ? gettingStartedItems : activities;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Dashboard" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8">
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Bonjour Lionel 👋</h2>
              <p className="mt-2 text-base text-slate-500">
                {isNewStudent
                  ? "Bienvenue, on va vous aider à démarrer simplement."
                  : "Prêt à continuer votre apprentissage ?"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex w-72 items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="mr-2 text-slate-400">⌕</span>
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Rechercher une formation..."
                />
              </div>
              <button 
                onClick={() => onNavigate?.("notifications")}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                🔔
              </button>
              <button 
                onClick={() => onNavigate?.("messaging")}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                💬
              </button>
              <button 
                onClick={() => onNavigate?.("profile")}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                👤
              </button>
            </div>
          </header>

          {isNewStudent ? (
            <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Bienvenue sur la plateforme
                  </p>
                  <h3 className="mt-2 text-3xl font-bold leading-tight">
                    Commencez votre parcours d’apprentissage sereinement
                  </h3>
                  <p className="mt-3 max-w-2xl text-slate-500">
                    Vous n’avez pas encore commencé de formation. Explorez vos contenus,
                    découvrez comment fonctionne la plateforme et lancez votre première leçon.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                      Découvrir mes formations
                    </button>
                    <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
                      Voir comment ça marche
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <h4 className="text-lg font-semibold">Premiers pas</h4>
                  <div className="mt-4 space-y-3">
                    <StepCard
                      title="1. Compléter votre profil"
                      description="Ajoutez votre photo et vos préférences."
                    />
                    <StepCard
                      title="2. Choisir une formation"
                      description="Sélectionnez le programme à démarrer."
                    />
                    <StepCard
                      title="3. Suivre votre progression"
                      description="Retrouvez vos avancées ici ensuite."
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="grid gap-6 md:grid-cols-[160px_1fr] md:items-center">
                <div className="flex h-40 items-center justify-center rounded-2xl bg-slate-200 text-sm font-medium text-slate-500">
                  Thumbnail
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Continuez votre formation
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">Copywriting avancé</h3>
                  <p className="mt-1 text-slate-500">Leçon 4 : Structurer une offre</p>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-500">Progression</span>
                      <span className="font-semibold">38%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-200">
                      <div className="h-3 rounded-full bg-slate-900" style={{ width: "38%" }} />
                    </div>
                  </div>

                  <button className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                    Continuer
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {displayedStats.map((stat) => (
              <div
                key={stat.label}
                onClick={() => stat.label.includes("Certificat") && onNavigate?.("certificates")}
                className={`rounded-3xl bg-white p-5 shadow-sm ${
                  isNewStudent
                    ? "border border-dashed border-slate-300"
                    : "border border-slate-200"
                } ${stat.label.includes("Certificat") ? "cursor-pointer" : ""}`}
              >
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="mt-2 text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {isNewStudent ? "Découvrez vos formations" : "Mes formations"}
              </h3>
              <button className="text-sm font-medium text-slate-500">
                Voir tout
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative">
                    <div className="flex h-44 items-center justify-center bg-slate-200 text-sm font-medium text-slate-500">
                      Image formation
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
                      {course.badge}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="mb-1 text-xl font-semibold leading-tight">{course.title}</div>
                    <div className="text-sm text-slate-500">{course.level}</div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Progression</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-slate-200">
                        <div
                          className="h-2.5 rounded-full bg-slate-900"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button 
                        onClick={onViewCourse}
                        className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                      >
                        Voir les détails
                      </button>
                      <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                        🛒
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">
                {isNewStudent ? "Guide de démarrage" : "Activité récente"}
              </h3>
              <div className="mt-5 space-y-4">
                {displayedActivityItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-sm">
                      ✓
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">
                {isNewStudent ? "À explorer en premier" : "Recommandé pour vous"}
              </h3>
              <div className="mt-5 space-y-4">
                {recommendations.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-3 flex h-24 items-center justify-center rounded-2xl bg-slate-200 text-sm text-slate-500">
                      Preview
                    </div>
                    <p className="font-medium">{item}</p>
                    <button className="mt-3 text-sm font-semibold text-slate-600">
                      Voir détail
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StepCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}
