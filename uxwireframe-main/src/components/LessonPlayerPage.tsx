import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { 
  Play, 
  FileText, 
  Headphones, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  MessageSquare, 
  StickyNote,
  ExternalLink,
  Volume2,
  Settings,
  Lock,
  ChevronDown,
  ChevronUp,
  Circle,
  CheckCircle,
  Award
} from "lucide-react";

export default function LessonPlayerPage({ onOpenQuiz, onOpenResources, onNavigate }: { onOpenQuiz?: () => void; onOpenResources?: () => void; onNavigate?: (view: any) => void }) {
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(1);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(1);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 1: true });
  const [isCourseSidebarOpen, setIsCourseSidebarOpen] = useState(true);
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  
  // Mock progress state
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    "0-0": true, "0-1": true, "0-2": true,
    "1-0": true
  });

  const modules = [
    {
      title: "Module 1 — Fondations du copywriting",
      lessons: [
        { title: "Introduction", type: "Vidéo", duration: "12 min" },
        { title: "Comprendre le marché", type: "Vidéo", duration: "18 min" },
        { title: "Identifier la douleur client", type: "Live", duration: "45 min" },
      ],
    },
    {
      title: "Module 2 — Structurer une offre",
      lessons: [
        { title: "Créer une promesse forte", type: "Vidéo", duration: "16 min" },
        { title: "Formuler la valeur", type: "Vidéo", duration: "14 min" },
        { title: "Éviter les objections", type: "Vidéo", duration: "20 min" },
      ],
    },
    {
      title: "Module 3 — Pages qui convertissent",
      lessons: [
        { title: "Hero section", type: "Vidéo", duration: "11 min" },
        { title: "Blocs de preuve", type: "Live", duration: "50 min" },
        { title: "Call-to-action", type: "Vidéo", duration: "13 min" },
      ],
    },
  ];

  const currentLesson = modules[currentModuleIndex].lessons[currentLessonIndex];
  const lessonKey = `${currentModuleIndex}-${currentLessonIndex}`;
  const isLessonCompleted = completedLessons[lessonKey];

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleMarkAsCompleted = () => {
    setCompletedLessons(prev => ({ ...prev, [lessonKey]: true }));
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < modules[currentModuleIndex].lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
      setExpandedModules(prev => ({ ...prev, [currentModuleIndex + 1]: true }));
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(modules[currentModuleIndex - 1].lessons.length - 1);
      setExpandedModules(prev => ({ ...prev, [currentModuleIndex - 1]: true }));
    }
  };

  const resources = [
    { label: "Support PDF", type: "PDF", available: true },
    { label: "Version audio", type: "Audio", available: true },
    { label: "Lien live replay", type: "Live", available: false },
  ];

  const notes = [
    "La promesse doit être spécifique et crédible.",
    "Ne parle pas d'abord de toi, parle du résultat utilisateur.",
    "Une offre floue crée une conversion floue.",
  ];

  // Calculate overall progress
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = Object.keys(completedLessons).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex h-screen overflow-hidden">
        <div className={`transition-all duration-300 ease-in-out ${isMainSidebarOpen ? "w-72" : "w-0 overflow-hidden"}`}>
          <Sidebar activeItem="Mes formations" onNavigate={onNavigate} />
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          {/* COURSE SIDEBAR */}
          <aside className={`flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out ${isCourseSidebarOpen ? "w-[380px]" : "w-0 overflow-hidden border-none"}`}>
            <div className="border-b border-slate-200 px-8 py-8 min-w-[380px]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-lg shadow-slate-900/20">
                  FC
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Formation</p>
                  <h1 className="text-xl font-black tracking-tight text-slate-900">Copywriting avancé</h1>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Progression</span>
                  <span className="text-sm font-black text-slate-900">{progressPercent}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div 
                    className="h-full rounded-full bg-slate-900" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 min-w-[380px]">
              <div className="mb-6 flex items-center justify-between px-2">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Programme du cours
                </h2>
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600">
                  {modules.length}
                </div>
              </div>

              <div className="space-y-4">
                {modules.map((module, mIdx) => (
                  <div key={module.title} className="overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm">
                    <button 
                      onClick={() => toggleModule(mIdx)}
                      className="flex w-full items-center justify-between border-b border-slate-50 bg-slate-50/50 px-6 py-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-slate-400 shadow-sm">
                          {mIdx + 1}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Module {mIdx + 1}</p>
                          <h3 className="text-sm font-bold text-slate-900">{module.title}</h3>
                        </div>
                      </div>
                      {expandedModules[mIdx] ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                    </button>

                    {expandedModules[mIdx] && (
                      <div className="space-y-1 p-3">
                        {module.lessons.map((lesson, lIdx) => {
                          const isCurrent = mIdx === currentModuleIndex && lIdx === currentLessonIndex;
                          const isCompleted = completedLessons[`${mIdx}-${lIdx}`];
                          return (
                            <button
                              key={lesson.title}
                              onClick={() => {
                                setCurrentModuleIndex(mIdx);
                                setCurrentLessonIndex(lIdx);
                              }}
                              className={`group w-full rounded-[20px] px-4 py-4 text-left ${
                                isCurrent
                                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                                  isCurrent
                                    ? "bg-white/20 text-white"
                                    : isCompleted
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-slate-100 text-slate-400"
                                }`}>
                                  {isCompleted ? <CheckCircle className="h-4 w-4" /> : lIdx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`truncate text-sm font-bold ${isCurrent ? "text-white" : "text-slate-700"}`}>
                                    {lesson.title}
                                  </p>
                                  <div className="mt-1 flex items-center gap-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? "text-white/60" : "text-slate-400"}`}>
                                      {lesson.type}
                                    </span>
                                    <span className={`h-1 w-1 rounded-full ${isCurrent ? "bg-white/30" : "bg-slate-200"}`} />
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? "text-white/60" : "text-slate-400"}`}>
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}

                        {/* Quiz Item */}
                        <button 
                          onClick={onOpenQuiz}
                          className="group mt-2 w-full rounded-[20px] border-2 border-dashed border-slate-100 bg-slate-50/50 px-4 py-5 text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm group-hover:text-slate-900">
                                <Lock className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">Quiz final du module</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Valider pour continuer</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-300" />
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* PLAYER MAIN AREA */}
          <main className="flex flex-1 flex-col overflow-hidden bg-slate-50 relative">
            {/* Main Sidebar Toggle Button */}
            <button 
              onClick={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
              className={`absolute left-0 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-slate-900 transition-all ${isMainSidebarOpen ? "translate-x-[-20px]" : "translate-x-4"}`}
              title={isMainSidebarOpen ? "Masquer le menu principal" : "Afficher le menu principal"}
            >
              {isMainSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>

            {/* Course Sidebar Toggle Button */}
            <button 
              onClick={() => setIsCourseSidebarOpen(!isCourseSidebarOpen)}
              className={`absolute left-0 top-1/2 z-50 flex h-12 w-8 -translate-y-1/2 items-center justify-center rounded-r-xl bg-white border border-l-0 border-slate-200 shadow-md text-slate-400 hover:text-slate-900 transition-all ${!isCourseSidebarOpen ? "translate-x-0" : "translate-x-[-1px]"}`}
              title={isCourseSidebarOpen ? "Masquer le programme" : "Afficher le programme"}
            >
              {isCourseSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>

            {/* Player Header */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-10 py-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>{modules[currentModuleIndex].title}</span>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-slate-900">{currentLesson.title}</span>
                </div>
                <h2 className="mt-2 truncate text-3xl font-black tracking-tight text-slate-900">{currentLesson.title}</h2>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePrevLesson}
                  className="flex items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white px-6 py-3.5 text-sm font-bold text-slate-600"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </button>
                <button 
                  onClick={handleNextLesson}
                  className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-10">
              <div className={`${(isCourseSidebarOpen || isMainSidebarOpen) && !isTheaterMode ? "max-w-6xl" : "max-w-none"} mx-auto space-y-10 transition-all duration-300`}>
                {/* MEDIA PLAYER SECTION */}
                <section className={`grid gap-8 ${isTheaterMode ? "grid-cols-1" : isCourseSidebarOpen ? "xl:grid-cols-[1fr_380px]" : "xl:grid-cols-[1fr_400px]"}`}>
                  <div className="space-y-6">
                    <div className={`relative aspect-video overflow-hidden rounded-[40px] bg-slate-900 shadow-2xl ring-1 ring-slate-200 ${!isCourseSidebarOpen && !isMainSidebarOpen ? "scale-[1.01]" : ""} transition-all duration-300`}>
                      {activeResource === "PDF" ? (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 p-12 text-center">
                          <div className="mb-6 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50">
                            <FileText className="h-16 w-16 text-slate-400" />
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight">Support PDF</h4>
                          <p className="mt-3 text-base font-medium text-slate-500 max-w-sm">
                            Consultez le document de référence pour cette leçon directement ici.
                          </p>
                          <div className="mt-10 flex gap-4">
                            <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/20">
                              <ExternalLink className="h-4 w-4" />
                              Ouvrir le document
                            </button>
                            <button 
                              onClick={() => setActiveResource(null)}
                              className="rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700"
                            >
                              Retour à la vidéo
                            </button>
                          </div>
                        </div>
                      ) : activeResource === "Audio" ? (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 p-12 text-center text-white">
                          <div className="relative mb-10">
                            <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />
                            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/10 shadow-inner">
                              <Headphones className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <h4 className="text-2xl font-black tracking-tight">Version Audio</h4>
                          <p className="mt-2 text-base font-medium text-slate-400">{currentLesson.title}</p>
                          
                          <div className="mt-12 w-full max-w-lg">
                            <div className="group relative mb-6 h-2 w-full cursor-pointer rounded-full bg-white/10">
                              <div className="h-full w-1/3 rounded-full bg-white" />
                              <div className="absolute left-1/3 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg" />
                            </div>
                            <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                              <span>04:12</span>
                              <span>14:00</span>
                            </div>
                            <div className="mt-10 flex items-center justify-center gap-12">
                              <button className="text-white/40">
                                <ChevronLeft className="h-8 w-8" />
                              </button>
                              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl shadow-white/10">
                                <Play className="h-8 w-8 fill-current" />
                              </button>
                              <button className="text-white/40">
                                <ChevronRight className="h-8 w-8" />
                              </button>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => setActiveResource(null)}
                            className="mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/30"
                          >
                            Retour au lecteur vidéo
                          </button>
                        </div>
                      ) : (
                        <div className="group relative flex h-full w-full items-center justify-center bg-slate-800">
                          <div className="absolute inset-0 bg-slate-900/40" />
                          <button className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-2xl transition-transform hover:scale-110">
                            <Play className="h-10 w-10 fill-current" />
                          </button>
                          
                          {/* Premium Video Controls */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Progress Bar */}
                            <div className="relative mb-6 h-1.5 w-full cursor-pointer rounded-full bg-white/20">
                              <div className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-slate-400" />
                              <div className="absolute left-1/3 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg" />
                            </div>
                            
                            <div className="flex items-center justify-between text-white">
                              <div className="flex items-center gap-8">
                                <button className="hover:text-slate-300">
                                  <Play className="h-6 w-6 fill-current" />
                                </button>
                                <div className="flex items-center gap-4">
                                  <Volume2 className="h-6 w-6 cursor-pointer hover:text-slate-300" />
                                  <div className="h-1 w-20 rounded-full bg-white/20">
                                    <div className="h-full w-1/2 rounded-full bg-white" />
                                  </div>
                                </div>
                                <span className="text-xs font-black tracking-widest">04:12 / {currentLesson.duration}</span>
                              </div>
                              <div className="flex items-center gap-8">
                                <button 
                                  onClick={() => setIsTheaterMode(!isTheaterMode)}
                                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${isTheaterMode ? "bg-white text-slate-900" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}
                                >
                                  {isTheaterMode ? "Quitter Cinéma" : "Mode Cinéma"}
                                </button>
                                <Settings className="h-6 w-6 cursor-pointer hover:text-slate-300" />
                                <ExternalLink className="h-6 w-6 cursor-pointer hover:text-slate-300" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={`grid gap-6 ${isTheaterMode ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
                      <MiniStat label="Format" value={currentLesson.type} />
                      <MiniStat label="Durée" value={currentLesson.duration} />
                      <MiniStat label="Statut" value={isLessonCompleted ? "Terminé" : "En cours"} />
                      {isTheaterMode && <MiniStat label="Module" value={modules[currentModuleIndex].title.split('—')[0]} />}
                    </div>
                  </div>

                  {/* TASKS & COMPLETION */}
                  <div className={`space-y-6 ${isTheaterMode ? "grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0" : ""}`}>
                    <div className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-sm">
                      <h3 className="text-2xl font-black tracking-tight text-slate-900">Objectifs</h3>
                      <p className="mt-2 text-sm font-medium text-slate-500">Complétez ces étapes pour valider la leçon.</p>
                      
                      <div className="mt-8 space-y-4">
                        <TaskItem label="Regarder la vidéo" done={isLessonCompleted} />
                        <TaskItem label="Télécharger le support" done={false} />
                        <TaskItem label="Prendre des notes" done={false} />
                      </div>

                      <button 
                        onClick={handleMarkAsCompleted}
                        disabled={isLessonCompleted}
                        className={`mt-10 w-full rounded-[24px] py-5 text-sm font-black uppercase tracking-widest ${
                          isLessonCompleted
                            ? "bg-emerald-100 text-emerald-600 cursor-default"
                            : "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                        }`}
                      >
                        {isLessonCompleted ? "Leçon terminée ✓" : "Marquer comme terminé"}
                      </button>
                    </div>

                    <div className="rounded-[40px] bg-slate-900 p-8 text-white shadow-xl">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-400">
                        <Award className="h-6 w-6" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold">Prochaine étape</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        Une fois ce module terminé, vous débloquerez le quiz final pour obtenir votre certification.
                      </p>
                      <button 
                        onClick={handleNextLesson}
                        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-slate-900"
                      >
                        Leçon suivante
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* RESOURCES & NOTES */}
                <section className={`grid gap-8 ${isTheaterMode ? "grid-cols-1" : "xl:grid-cols-[1fr_450px]"}`}>
                  <div className="rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm">
                    <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
                      <TabButton label="Ressources" active onClick={onOpenResources} />
                      <TabButton label="Discussion" />
                      <TabButton label="Avis" />
                    </div>

                    <div className="space-y-4">
                      {resources.map((resource) => (
                        <div
                          key={resource.label}
                          className="group flex items-center justify-between rounded-[28px] border border-slate-50 bg-slate-50/50 p-5"
                        >
                          <div className="flex items-center gap-5">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                              {resource.type === "PDF" ? <FileText className="h-6 w-6" /> : resource.type === "Audio" ? <Headphones className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                            </div>
                            <div>
                              <p className="text-base font-bold text-slate-900">{resource.label}</p>
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{resource.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => resource.available && setActiveResource(resource.type)}
                              className={`rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-widest ${
                                resource.available
                                  ? "bg-white text-slate-600 shadow-sm"
                                  : "bg-transparent text-slate-300 cursor-not-allowed"
                              }`}
                            >
                              {resource.available ? "Aperçu" : "Bloqué"}
                            </button>
                            <button
                              disabled={!resource.available}
                              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                resource.available
                                  ? "bg-slate-900 text-white"
                                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
                              }`}
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm">
                    <div className="mb-8 flex items-center justify-between">
                      <h3 className="text-2xl font-black tracking-tight text-slate-900">Notes</h3>
                      <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <StickyNote className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {notes.map((note, i) => (
                        <div key={i} className="relative rounded-3xl bg-slate-50 p-6 text-sm font-medium leading-relaxed text-slate-600 ring-1 ring-slate-100">
                          <div className="absolute -left-1 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-slate-900" />
                          {note}
                        </div>
                      ))}
                    </div>
                    
                    <button className="mt-8 w-full rounded-[24px] border-2 border-slate-100 bg-white py-5 text-sm font-black uppercase tracking-widest text-slate-900">
                      Ajouter une note
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-black text-slate-900">{value}</p>
    </div>
  );
}

function TaskItem({ label, done = false }: { label: string; done?: boolean }) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl p-4 ${done ? "bg-emerald-50/50" : "bg-slate-50"}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
          done ? "bg-emerald-500 text-white" : "bg-white text-slate-300 shadow-sm"
        }`}
      >
        {done ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      </div>
      <p className={`text-sm font-bold ${done ? "text-emerald-700" : "text-slate-600"}`}>{label}</p>
    </div>
  );
}

function TabButton({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-black uppercase tracking-widest ${
        active ? "text-slate-900" : "text-slate-400"
      }`}
    >
      {label}
      {active && <div className="absolute -bottom-6 left-0 h-1 w-full rounded-full bg-slate-900" />}
    </button>
  );
}
