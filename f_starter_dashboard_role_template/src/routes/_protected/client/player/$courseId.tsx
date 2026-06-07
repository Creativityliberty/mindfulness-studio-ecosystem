import * as React from 'react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore, type Lesson } from '@/stores/courses-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  ArrowLeft,
  FileText,
  Music,
  CheckCircle2,
  Play,
  HelpCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Maximize2
} from 'lucide-react'

export const Route = createFileRoute('/_protected/client/player/$courseId')({
  component: StudentLessonPlayerPage,
})

function StudentLessonPlayerPage() {
  const { courseId } = useParams({ from: '/_protected/client/player/$courseId' })
  const { user } = useAuthStore()
  const { courses, enrollments, completeLesson } = useCoursesStore()

  const course = React.useMemo(() => {
    return courses.find((c) => c.id === courseId)
  }, [courses, courseId])

  const enrollment = React.useMemo(() => {
    if (!user || !course) return null
    return enrollments.find((e) => e.studentId === String(user.id) && e.courseId === course.id)
  }, [enrollments, user, course])

  // Get flat list of all lessons in this course
  const allLessons = React.useMemo(() => {
    if (!course) return []
    const list: { lesson: Lesson; moduleId: string; moduleTitle: string }[] = []
    course.modules.forEach((mod) => {
      mod.lessons.forEach((l) => {
        list.push({ lesson: l, moduleId: mod.id, moduleTitle: mod.title })
      })
    })
    return list
  }, [course])

  const [activeLessonId, setActiveLessonId] = React.useState<string>('')
  const [activeTab, setActiveTab] = React.useState<'description' | 'resources' | 'notes'>('description')
  const [isTheaterMode, setIsTheaterMode] = React.useState(false)

  // Local notes state
  const [noteContent, setNoteContent] = React.useState('')

  // Quiz states
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = React.useState(false)
  const [quizScore, setQuizScore] = React.useState<number | null>(null)

  // Initialize active lesson
  React.useEffect(() => {
    if (allLessons.length > 0 && !activeLessonId) {
      const uncompleted = allLessons.find((item) => !enrollment?.completedLessons.includes(item.lesson.id))
      setActiveLessonId(uncompleted ? uncompleted.lesson.id : allLessons[0].lesson.id)
    }
  }, [allLessons, enrollment, activeLessonId])

  const activeItem = React.useMemo(() => {
    return allLessons.find((item) => item.lesson.id === activeLessonId)
  }, [allLessons, activeLessonId])

  const activeLesson = activeItem?.lesson

  // Load note from localstorage when active lesson changes
  React.useEffect(() => {
    if (user && courseId && activeLessonId) {
      const savedNote = localStorage.getItem(`numtema-note-${user.id}-${courseId}-${activeLessonId}`) || ''
      setNoteContent(savedNote)
    }
    // Reset quiz
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
  }, [activeLessonId, courseId, user])

  const saveNote = () => {
    if (user && courseId && activeLessonId) {
      localStorage.setItem(`numtema-note-${user.id}-${courseId}-${activeLessonId}`, noteContent)
      toast.success('Note sauvegardée avec succès !')
    }
  }

  if (!course || !enrollment) {
    return (
      <div className="container mx-auto p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold">Accès non autorisé</h2>
        <p className="text-muted-foreground">Vous devez vous inscrire à cette formation pour y accéder.</p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/client/catalog/$courseId" params={{ courseId: courseId }}>
            Voir les détails de l'inscription
          </Link>
        </Button>
      </div>
    )
  }

  const handleLessonCompletion = () => {
    if (!activeLesson || !user) return
    completeLesson(String(user.id), course.id, activeLesson.id)
    toast.success('Leçon validée ! Félicitations.')

    // Auto navigate to next lesson
    const currentIndex = allLessons.findIndex((item) => item.lesson.id === activeLesson.id)
    if (currentIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentIndex + 1].lesson.id)
    } else {
      toast.success('Félicitations ! Vous avez complété l\'intégralité des leçons !', {
        icon: '🏆',
      })
    }
  }

  const handlePrevLesson = () => {
    if (!activeLesson) return
    const currentIndex = allLessons.findIndex((item) => item.lesson.id === activeLesson.id)
    if (currentIndex > 0) {
      setActiveLessonId(allLessons[currentIndex - 1].lesson.id)
    }
  }

  const handleNextLesson = () => {
    if (!activeLesson) return
    const currentIndex = allLessons.findIndex((item) => item.lesson.id === activeLesson.id)
    if (currentIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentIndex + 1].lesson.id)
    }
  }

  const handleQuizSubmit = () => {
    if (!activeLesson?.quiz) return
    const questions = activeLesson.quiz.questions
    let correctCount = 0

    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++
      }
    })

    const scorePercent = Math.round((correctCount / questions.length) * 100)
    setQuizScore(scorePercent)
    setQuizSubmitted(true)

    if (scorePercent === 100) {
      toast.success('Félicitations ! Quiz réussi à 100%.')
    } else {
      toast.error(`Votre score : ${scorePercent}%. Vous devez obtenir 100% pour valider le quiz.`)
    }
  }

  const renderActiveLessonMedia = () => {
    if (!activeLesson) return null

    switch (activeLesson.type) {
      case 'video':
        return (
          <div className="aspect-video bg-zinc-950 rounded-[28px] overflow-hidden shadow-2xl relative group">
            <video
              src={activeLesson.resourceUrl || 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4'}
              controls
              className="w-full h-full object-cover"
            />
            {/* Custom Overlay indicators */}
            <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-white">
                Lecteur Vidéo Premium
              </Badge>
              <button 
                onClick={() => setIsTheaterMode(!isTheaterMode)}
                className="bg-black/60 hover:bg-black/80 text-white pointer-events-auto rounded-lg p-1.5 transition-colors"
                title="Mode cinéma"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )
      case 'audio':
        return (
          <div className="rounded-[28px] border border-primary/10 shadow-lg p-10 bg-gradient-to-br from-[#2f4ea8]/5 via-[#79c9db]/5 to-transparent text-center space-y-6 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/15 rounded-full blur-2xl" />
            <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
            
            <div className="bg-primary text-white rounded-full h-20 w-20 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
              <Music className="h-10 w-10 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-xl text-foreground">Écoute vibratoire guidée</h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Installez-vous confortablement, fermez les yeux et écoutez la transmission audio de Fabienne.
              </p>
            </div>
            <audio
              src={activeLesson.resourceUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
              controls
              className="mx-auto w-full max-w-lg relative z-10"
            />
          </div>
        )
      case 'pdf':
        return (
          <Card className="border-primary/10 shadow-lg rounded-[28px] overflow-hidden h-[550px] flex flex-col">
            <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-primary/5 p-4 flex justify-between items-center shrink-0">
              <span className="text-sm font-semibold text-muted-foreground flex items-center">
                <FileText className="h-4 w-4 mr-2 text-sky-600" /> Support PDF de la leçon
              </span>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                  <a href={activeLesson.resourceUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'} download target="_blank" rel="noreferrer" className="flex items-center">
                    <Download className="mr-1 h-3.5 w-3.5" /> Télécharger
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                  <a href={activeLesson.resourceUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'} target="_blank" rel="noreferrer" className="flex items-center">
                    <ExternalLink className="mr-1 h-3.5 w-3.5" /> Plein écran
                  </a>
                </Button>
              </div>
            </div>
            <iframe
              src={activeLesson.resourceUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}
              className="w-full flex-1 border-none"
              title="PDF Viewer"
            />
          </Card>
        )
      default:
        return (
          <Card className="border-primary/10 shadow-md rounded-[28px] p-8 prose dark:prose-invert max-w-none bg-white">
            <h3 className="font-extrabold text-2xl border-b border-primary/5 pb-3 mb-6">Support écrit</h3>
            <p className="text-foreground leading-relaxed whitespace-pre-line text-base">{activeLesson.content}</p>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/90 px-8 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="rounded-xl hover:text-primary">
            <Link to="/client/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </Link>
          </Button>
          <div className="hidden md:block">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {course.title}
            </div>
            <div className="text-xs font-bold text-slate-700 truncate max-w-xs">
              {activeItem?.moduleTitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handlePrevLesson}
            disabled={allLessons.findIndex((item) => item.lesson.id === activeLessonId) === 0}
            variant="outline"
            className="rounded-xl"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
          </Button>
          <span className="text-xs font-bold text-slate-500">
            {allLessons.findIndex((item) => item.lesson.id === activeLessonId) + 1} / {allLessons.length}
          </span>
          <Button
            onClick={handleNextLesson}
            disabled={allLessons.findIndex((item) => item.lesson.id === activeLessonId) === allLessons.length - 1}
            variant="outline"
            className="rounded-xl"
            size="sm"
          >
            Suivant <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Main Work Area */}
        <main className={`flex-1 overflow-y-auto p-6 md:p-8 space-y-8 transition-all duration-300 ${isTheaterMode ? 'max-w-none' : 'max-w-[72%]'}`}>
          {/* Media component */}
          {renderActiveLessonMedia()}

          {/* Core metadata & Action Toggles */}
          {activeLesson && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize rounded-md">
                      Format {activeLesson.type}
                    </Badge>
                    {enrollment.completedLessons.includes(activeLesson.id) && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-none rounded-md">
                        Terminé ✓
                      </Badge>
                    )}
                  </div>
                  <h2 className="text-2xl font-black mt-2 tracking-tight">{activeLesson.title}</h2>
                </div>

                {!activeLesson.quiz && (
                  <Button
                    onClick={handleLessonCompletion}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md font-bold"
                  >
                    {enrollment.completedLessons.includes(activeLesson.id) ? (
                      <span className="flex items-center">
                        <Check className="mr-1.5 h-4 w-4" /> Leçon validée
                      </span>
                    ) : (
                      'Valider cette leçon'
                    )}
                  </Button>
                )}
              </div>

              {/* Tabs list */}
              <div className="flex border-b border-slate-200 gap-2">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
                    activeTab === 'description'
                      ? 'border-teal-600 text-primary font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
                    activeTab === 'resources'
                      ? 'border-teal-600 text-primary font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Ressources & Supports
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
                    activeTab === 'notes'
                      ? 'border-teal-600 text-primary font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Notes Personnelles
                </button>
              </div>

              {/* Tab Contents */}
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm min-h-[200px]">
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {activeLesson.content || "Aucune description fournie pour cette leçon."}
                    </p>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-800 mb-2">Supports téléchargeables</h3>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center text-primary">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Fiche récapitulative PDF</p>
                            <p className="text-xs text-slate-500">Synthèse et points clés de Fabienne</p>
                          </div>
                        </div>
                        <Button asChild size="sm" variant="outline" className="rounded-lg">
                          <a href={activeLesson.resourceUrl || '#'} target="_blank" rel="noreferrer">
                            <Download className="h-4 w-4 mr-1" /> PDF
                          </a>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                            <Music className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Version Audio MP3</p>
                            <p className="text-xs text-slate-500">Pour réécouter et méditer n'importe où</p>
                          </div>
                        </div>
                        <Button asChild size="sm" variant="outline" className="rounded-lg">
                          <a href="#" className="pointer-events-none text-slate-400">
                            Indisponible
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">Prendre des notes</h3>
                        <p className="text-xs text-slate-500">Vos notes sont sauvegardées localement sur votre navigateur.</p>
                      </div>
                      <Button onClick={saveNote} size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-lg">
                        Sauvegarder
                      </Button>
                    </div>
                    <textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Écrivez vos notes de cours ici..."
                      className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Quiz Module nested inside the lesson workspace */}
              {activeLesson.quiz && (
                <Card className="border-primary/15 shadow-md rounded-[28px] overflow-hidden">
                  <CardHeader className="bg-accent/5 border-b border-primary/5">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Quiz de validation
                    </CardTitle>
                    <CardDescription>
                      Obtenez 100% de bonnes réponses pour valider cette leçon et continuer votre formation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {activeLesson.quiz.questions.map((q, qIndex) => (
                      <div key={q.id} className="space-y-3">
                        <h4 className="font-bold text-foreground">
                          {qIndex + 1}. {q.question}
                        </h4>
                        <div className="space-y-2 pl-2">
                          {q.options.map((opt, optIndex) => (
                            <div key={optIndex} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name={q.id}
                                id={`${q.id}-${optIndex}`}
                                checked={quizAnswers[q.id] === optIndex}
                                onChange={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: optIndex }))}
                                disabled={quizSubmitted && quizScore === 100}
                                className="h-4 w-4 border-slate-300 text-primary focus:ring-teal-500"
                              />
                              <Label
                                htmlFor={`${q.id}-${optIndex}`}
                                className={`text-sm cursor-pointer ${
                                  quizSubmitted && optIndex === q.correctAnswer
                                    ? 'text-green-600 font-bold dark:text-green-400'
                                    : quizSubmitted && quizAnswers[q.id] === optIndex && quizAnswers[q.id] !== q.correctAnswer
                                    ? 'text-red-600 line-through dark:text-red-400'
                                    : ''
                                }`}
                              >
                                {opt}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {quizSubmitted && (
                      <div className={`p-4 rounded-xl border font-bold text-center ${
                        quizScore === 100
                          ? 'bg-green-500/5 border-green-500/10 text-green-600 dark:text-green-400'
                          : 'bg-red-500/5 border-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        Votre score : {quizScore}%
                        {quizScore === 100 ? (
                          <p className="text-xs font-medium text-slate-500 mt-1">Félicitations ! Quiz validé.</p>
                        ) : (
                          <p className="text-xs font-medium text-slate-500 mt-1">
                            Vous devez revoir vos réponses et essayer à nouveau.
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-4">
                      {quizScore === 100 ? (
                        <Button
                          onClick={handleLessonCompletion}
                          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-4 font-bold"
                        >
                          Valider la leçon et continuer
                        </Button>
                      ) : (
                        <Button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(quizAnswers).length < activeLesson.quiz.questions.length}
                          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-4 font-bold"
                        >
                          Soumettre les réponses
                        </Button>
                      )}
                      {quizSubmitted && quizScore !== 100 && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setQuizSubmitted(false)
                            setQuizAnswers({})
                            setQuizScore(null)
                          }}
                          className="rounded-xl border-slate-200"
                        >
                          Réessayer
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </main>

        {/* Sidebar course menu */}
        <aside className={`border-l border-slate-200 bg-white p-6 flex flex-col shrink-0 transition-all duration-300 ${isTheaterMode ? 'w-0 opacity-0 overflow-hidden border-none p-0' : 'w-[28%]'}`}>
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Progression</div>
              <div className="text-lg font-black text-slate-800">{enrollment.progress}% complété</div>
            </div>
            <div className="h-2 w-20 bg-slate-100 rounded-full overflow-hidden border">
              <div className="h-full bg-primary rounded-full" style={{ width: `${enrollment.progress}%` }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-1">
            {course.modules.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">
                  {mod.title}
                </h3>
                <div className="space-y-1.5">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId
                    const isDone = enrollment.completedLessons.includes(lesson.id)

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left text-sm transition-all ${
                          isActive
                            ? 'bg-slate-900 text-white font-semibold shadow-md shadow-slate-900/10'
                            : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900 bg-slate-50/20'
                        }`}
                      >
                        <div className="flex items-center min-w-0 pr-2">
                          <div className={`h-6 w-6 rounded-lg flex items-center justify-center mr-2 shrink-0 ${
                            isActive ? 'bg-white/20' : 'bg-slate-100'
                          }`}>
                            {isDone ? (
                              <CheckCircle2 className={`h-4 w-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                            ) : lesson.type === 'video' ? (
                              <Play className={`h-3 w-3 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                            ) : (
                              <FileText className={`h-3 w-3 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                            )}
                          </div>
                          <span className="truncate font-bold text-xs">{lesson.title}</span>
                        </div>
                        <span className={`text-[9px] uppercase font-bold shrink-0 px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {lesson.type}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
