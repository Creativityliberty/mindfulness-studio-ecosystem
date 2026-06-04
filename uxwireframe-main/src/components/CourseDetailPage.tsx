import { Sidebar } from "./Sidebar";
import { Play } from "lucide-react";

export default function CourseDetailPage({ onBack, onStart, onNavigate }: { onBack: () => void; onStart?: () => void; onNavigate?: (view: any) => void }) {
  const isPurchased = true;
  const isStarted = true;

  const ctaLabel = isPurchased ? (isStarted ? "Continuer la formation" : "Commencer la formation") : "Acheter la formation";

  const modules = [
    {
      title: "Les fondamentaux de la vente",
      quizTitle: "Quiz : Fondamentaux",
      lessons: [
        { title: "Introduction au module", type: "Vidéo", duration: "10:00", hasPdf: true, hasAudio: false, hasLive: false },
        { title: "Psychologie de l'acheteur", type: "Vidéo", duration: "25:00", hasPdf: true, hasAudio: true, hasLive: false },
      ],
    },
    {
      title: "La structure d'une page de vente",
      quizTitle: "Quiz : Structure",
      lessons: [
        { title: "Le hook irrésistible", type: "Vidéo", duration: "15:00", hasPdf: true, hasAudio: false, hasLive: true },
        { title: "L'offre et la promesse", type: "Vidéo", duration: "30:00", hasPdf: true, hasAudio: true, hasLive: false },
        { title: "Gérer les objections", type: "Vidéo", duration: "20:00", hasPdf: false, hasAudio: true, hasLive: false },
      ],
    },
    {
      title: "Techniques avancées de persuasion",
      quizTitle: "Quiz : Persuasion",
      lessons: [
        { title: "Le storytelling de marque", type: "Vidéo", duration: "45:00", hasPdf: true, hasAudio: true, hasLive: false },
        { title: "Preuve sociale et autorité", type: "Vidéo", duration: "18:00", hasPdf: true, hasAudio: false, hasLive: false },
      ],
    },
    {
      title: "Finalisation et lancement",
      quizTitle: "Quiz : Lancement",
      lessons: [
        { title: "Checklist avant publication", type: "Vidéo", duration: "12:00", hasPdf: true, hasAudio: false, hasLive: false },
        { title: "Analyse des conversions", type: "Vidéo", duration: "22:00", hasPdf: true, hasAudio: true, hasLive: true },
      ],
    },
  ];

  const learnItems = [
    "Maîtriser les structures de copywriting qui convertissent",
    "Apprendre à rédiger des titres accrocheurs",
    "Comprendre la psychologie derrière chaque achat",
    "Savoir structurer une offre irrésistible",
    "Optimiser vos pages pour le SEO et la conversion",
    "Utiliser le storytelling pour fidéliser",
  ];

  const targetAudience = [
    "Entrepreneurs souhaitant booster leurs ventes",
    "Copywriters débutants ou intermédiaires",
    "Responsables marketing et communication",
    "Freelances voulant améliorer leur offre",
  ];

  const results = [
    "Une page de vente prête à l'emploi",
    "Une meilleure compréhension de votre cible",
    "Une augmentation significative de vos taux de conversion",
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Mes formations" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8">
          <button onClick={onBack} className="mb-6 text-sm text-slate-500">
            ← Retour aux formations
          </button>

          <section className="mb-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-center">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge label="Populaire" />
                  <Badge label="Intermédiaire" />
                  <Badge label={`${modules.reduce((acc, module) => acc + module.lessons.length, 0)} leçons`} />
                  <Badge label="4 modules" />
                </div>

                <h2 className="text-4xl font-bold tracking-tight">Copywriting avancé</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  Une formation pensée pour vous aider à mieux vendre avec les mots : offre,
                  structure, promesse, objections et pages qui convertissent vraiment.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <InfoCard label="Formateur" value="Nümtema" />
                  <InfoCard label="Durée" value="5h 20" />
                  <InfoCard label="Modules" value={`${modules.length}`} />
                  <InfoCard label="Progression" value={isStarted ? "38%" : "0%"} />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <MiniStat label="Lives" value={`${modules.flatMap((module) => module.lessons).filter((lesson) => lesson.hasLive).length}`} />
                  <MiniStat label="PDF" value={`${modules.flatMap((module) => module.lessons).filter((lesson) => lesson.hasPdf).length}`} />
                  <MiniStat label="Audios" value={`${modules.flatMap((module) => module.lessons).filter((lesson) => lesson.hasAudio).length}`} />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={onStart}
                    className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
                  >
                    {ctaLabel}
                  </button>
                  <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700">
                    Ajouter aux favoris
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-4 shadow-2xl">
                <div className="relative aspect-video overflow-hidden rounded-[24px] bg-slate-800 flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-0 bg-slate-900/40" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-2xl transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 fill-current" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/60 text-[10px] font-black uppercase tracking-widest">
                    <span>Aperçu de la formation</span>
                    <span>02:45</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <div>
                    <p className="text-sm font-semibold text-white">Votre progression</p>
                    <p className="text-sm text-slate-400">Leçon actuelle : Structurer une offre</p>
                  </div>
                  <div className="text-lg font-bold text-white">38%</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Ce que vous allez apprendre</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {learnItems.map((item) => (
                  <div key={item}>
                    <ListCard text={item} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Cette formation est pour</h3>
              <div className="mt-5 space-y-3">
                {targetAudience.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Programme de la formation</h3>
                <p className="mt-1 text-sm text-slate-500">Chaque module contient des leçons, des ressources et un quiz dédié.</p>
              </div>
              <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                Tout déplier
              </button>
            </div>

            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={module.title} className="overflow-hidden rounded-[24px] border border-slate-200">
                  <div className="flex items-center justify-between bg-slate-50 px-5 py-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Module {index + 1}
                      </p>
                      <h4 className="mt-1 text-lg font-semibold">{module.title}</h4>
                    </div>
                    <span className="text-sm text-slate-500">{module.lessons.length} leçons</span>
                  </div>
                  <div className="space-y-2 bg-white p-4">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.title}
                        className="rounded-2xl border border-slate-200 px-4 py-4"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                              {lessonIndex + 1}
                            </div>
                            <div>
                              <span className="block text-sm font-medium text-slate-800">{lesson.title}</span>
                              <span className="mt-1 block text-xs text-slate-500">
                                {lesson.type} • {lesson.duration}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <ResourceBadge label={lesson.type} />
                            {lesson.hasPdf && <ResourceBadge label="PDF" subtle />}
                            {lesson.hasAudio && <ResourceBadge label="Audio" subtle />}
                            {lesson.hasLive && <ResourceBadge label="Lien live" subtle />}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{module.quizTitle}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            Validation du module avec questions, score et déblocage de progression.
                          </p>
                        </div>
                        <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                          Voir le quiz
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold">Résultat attendu</h3>
              <div className="mt-5 space-y-3">
                {results.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">Prêt à avancer ?</p>
              <h3 className="mt-2 text-3xl font-bold">Passez à la suite</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                La structure est claire, le parcours aussi. Il ne reste qu’à entrer dans la formation et commencer le travail.
              </p>
              <button
                onClick={onStart}
                className="mt-6 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                {ctaLabel}
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
      {label}
    </span>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function ListCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm shadow-sm">
        ✓
      </div>
      <p className="text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function ResourceBadge({ label, subtle = false }: { label: string; subtle?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        subtle
          ? "border border-slate-200 bg-white text-slate-600"
          : "bg-slate-900 text-white"
      }`}
    >
      {label}
    </span>
  );
}
