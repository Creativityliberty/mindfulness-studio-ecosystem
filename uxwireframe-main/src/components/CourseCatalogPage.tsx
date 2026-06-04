import React from "react";
import { Sidebar } from "./Sidebar";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  BarChart, 
  ArrowRight, 
  Star,
  Play,
  Layout
} from "lucide-react";

export default function CourseCatalogPage({ 
  onNavigate 
}: { 
  onNavigate?: (view: any) => void;
}) {
  const categories = ["Tous", "Marketing", "Copywriting", "Business", "Branding", "SEO"];

  const courses = [
    {
      id: 1,
      title: "Copywriting avancé",
      category: "Copywriting",
      level: "Intermédiaire",
      price: "149 €",
      duration: "5h 20",
      lessons: 12,
      enrolled: false,
      badge: "Populaire",
      image: "https://picsum.photos/seed/copy/400/250"
    },
    {
      id: 2,
      title: "SEO stratégique",
      category: "SEO",
      level: "Débutant",
      price: "99 €",
      duration: "4h 10",
      lessons: 10,
      enrolled: false,
      badge: "Nouveau",
      image: "https://picsum.photos/seed/seo/400/250"
    },
    {
      id: 3,
      title: "Personal Branding",
      category: "Branding",
      level: "Intermédiaire",
      price: "129 €",
      duration: "3h 45",
      lessons: 9,
      enrolled: true,
      badge: "Déjà acheté",
      image: "https://picsum.photos/seed/brand/400/250"
    },
    {
      id: 4,
      title: "Tunnel de vente",
      category: "Business",
      level: "Avancé",
      price: "179 €",
      duration: "6h 00",
      lessons: 14,
      enrolled: false,
      badge: "Premium",
      image: "https://picsum.photos/seed/funnel/400/250"
    },
    {
      id: 5,
      title: "Email Marketing",
      category: "Marketing",
      level: "Débutant",
      price: "89 €",
      duration: "2h 50",
      lessons: 8,
      enrolled: false,
      badge: "Rapide",
      image: "https://picsum.photos/seed/email/400/250"
    },
    {
      id: 6,
      title: "Offre irrésistible",
      category: "Business",
      level: "Intermédiaire",
      price: "119 €",
      duration: "3h 30",
      lessons: 11,
      enrolled: false,
      badge: "Recommandé",
      image: "https://picsum.photos/seed/offer/400/250"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Catalogue" onNavigate={onNavigate} />

        <main className="min-w-0 flex-1 px-8 py-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <BookOpen className="h-3 w-3 text-slate-500" />
                Catalogue des formations
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Découvrir de nouvelles formations</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                Cette page est différente du dashboard : ici, on explore le catalogue complet, on filtre, on compare et on rejoint de nouveaux parcours.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Search className="mr-2 h-4 w-4 text-slate-400" />
                <input
                  className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Rechercher une formation..."
                />
              </div>
              <button className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Trier
              </button>
            </div>
          </div>

          {/* Featured Course */}
          <section className="mb-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Formation mise en avant
                </p>
                <h3 className="mt-2 text-3xl font-bold">Copywriting avancé</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Un programme premium pour clarifier votre offre, renforcer votre promesse et construire des pages qui transforment mieux.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge label="12 leçons" icon={<Play className="h-3 w-3" />} />
                  <Badge label="4 modules" icon={<Layout className="h-3 w-3" />} subtle />
                  <Badge label="Intermédiaire" icon={<BarChart className="h-3 w-3" />} subtle />
                  <Badge label="149 €" icon={<Star className="h-3 w-3" />} subtle />
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button 
                    onClick={() => onNavigate?.("course")}
                    className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10"
                  >
                    Voir les détails
                  </button>
                  <button 
                    onClick={() => onNavigate?.("checkout")}
                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm"
                  >
                    Acheter maintenant
                  </button>
                </div>
              </div>

              <div className="rounded-[24px] bg-slate-100 p-2 overflow-hidden relative">
                <div className="aspect-video flex items-center justify-center rounded-[20px] bg-slate-200 overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/featured/800/450" 
                    alt="Featured Course" 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-slate-900/5" />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold shadow-sm ${
                    index === 0
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Course Grid */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Toutes les formations</h3>
              <p className="text-sm font-medium text-slate-500">{courses.length} résultats</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/10" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                      {course.badge}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {course.category}
                      </span>
                      <span className="text-base font-bold text-slate-900">{course.price}</span>
                    </div>

                    <h4 className="text-xl font-bold leading-tight">
                      {course.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-500 font-medium">{course.level}</p>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <MiniInfo label="Durée" value={course.duration} icon={<Clock className="h-3 w-3" />} />
                      <MiniInfo label="Leçons" value={`${course.lessons}`} icon={<Play className="h-3 w-3" />} />
                      <MiniInfo label="Niveau" value={course.level.split(' ')[0]} icon={<BarChart className="h-3 w-3" />} />
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button 
                        onClick={() => onNavigate?.("course")}
                        className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-700"
                      >
                        Voir détail
                      </button>
                      <button
                        onClick={() => !course.enrolled && onNavigate?.("checkout")}
                        className={`flex-1 rounded-2xl px-4 py-3 text-xs font-bold flex items-center justify-center gap-2 ${
                          course.enrolled
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                        }`}
                      >
                        {course.enrolled ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" />
                            Déjà inscrit
                          </>
                        ) : (
                          <>
                            Acheter
                            <ArrowRight className="h-3 w-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Badge({ label, subtle = false, icon }: { label: string; subtle?: boolean; icon?: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
        subtle
          ? "border border-slate-200 bg-white text-slate-500 shadow-sm"
          : "bg-slate-900 text-white"
      }`}
    >
      {icon}
      {label}
    </span>
  );
}

function MiniInfo({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-2.5 text-center ring-1 ring-slate-200/50 shadow-sm">
      <div className="flex justify-center mb-1 text-slate-400">
        {icon}
      </div>
      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-0.5 text-[11px] font-bold text-slate-900 truncate">{value}</p>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
