import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore, type Course, type Lesson, type QuizQuestion } from '@/stores/courses-store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ChevronLeft,
  Plus,
  Trash2,
  Save,
  Video,
  FileText,
  Music,
  Type,
  HelpCircle,
  ShieldAlert,
  GripVertical,
  Eye,
  EyeOff,
  Pencil,
  CheckCircle2,
  X,
  BookOpen,
  LayoutList,
  Settings2,
  Link as LinkIcon,
  Upload,
  Play,
  Download,
  Volume2,
  AlertCircle,
} from 'lucide-react'

export const Route = createFileRoute('/_protected/instructor/courses/$courseId')({
  component: EditInstructorCoursePage,
})

/* ─── helpers ─────────────────────────────────────────── */

const LESSON_TYPE_META = {
  video: { icon: Video, label: 'Vidéo', color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
  pdf: { icon: FileText, label: 'PDF', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
  audio: { icon: Music, label: 'Audio', color: 'text-violet-500', bg: 'bg-violet-500/10 border-violet-500/20' },
  text: { icon: Type, label: 'Texte', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
} as const

function LessonIcon({ type }: { type: Lesson['type'] }) {
  const meta = LESSON_TYPE_META[type]
  const Icon = meta.icon
  return (
    <div className={`p-2 rounded-lg border ${meta.bg}`}>
      <Icon className={`h-4 w-4 ${meta.color}`} />
    </div>
  )
}

/* ─── sub-components ──────────────────────────────────── */

interface LessonRowProps {
  lesson: Lesson
  moduleId: string
  courseId: string
  onEdit: (moduleId: string, lesson: Lesson) => void
  onQuiz: (moduleId: string, lesson: Lesson) => void
  onDelete: (moduleId: string, lessonId: string) => void
}

function LessonRow({ lesson, moduleId, onEdit, onQuiz, onDelete }: LessonRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/50 bg-background hover:border-primary/20 transition-colors group">
      <div className="flex items-center gap-3">
        <GripVertical className="h-4 w-4 text-muted-foreground/30 shrink-0 hidden sm:block" />
        <LessonIcon type={lesson.type} />
        <div>
          <h4 className="font-semibold text-sm text-foreground">{lesson.title}</h4>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <Badge variant="outline" className="text-[10px] uppercase font-bold rounded-md py-0">
              {LESSON_TYPE_META[lesson.type].label}
            </Badge>
            {lesson.resourceUrl && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <LinkIcon className="h-2.5 w-2.5" />
                Ressource liée
              </span>
            )}
            {lesson.quiz && (
              <Badge className="text-[10px] bg-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-md py-0 dark:bg-emerald-900/30 dark:text-emerald-400">
                Quiz ({lesson.quiz.questions.length}q)
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 justify-end shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(moduleId, lesson)}
          className="h-8 px-2.5 text-xs rounded-lg hover:bg-primary/5"
        >
          <Pencil className="h-3.5 w-3.5 mr-1" /> Modifier
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onQuiz(moduleId, lesson)}
          className="h-8 px-2.5 text-xs rounded-lg hover:bg-amber-500/10 text-amber-600 dark:text-amber-400"
        >
          <HelpCircle className="h-3.5 w-3.5 mr-1" /> Quiz
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(moduleId, lesson.id)}
          className="h-8 w-8 p-0 rounded-lg text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

/* ─── media preview ───────────────────────────────────── */

function MediaPreview({ url, type }: { url: string; type: Lesson['type'] }) {
  if (!url) return null
  if (type === 'video') {
    return (
      <div className="mt-3 rounded-xl overflow-hidden border border-primary/10 bg-black">
        <video src={url} controls className="w-full max-h-48 object-contain" />
      </div>
    )
  }
  if (type === 'audio') {
    return (
      <div className="mt-3 p-4 rounded-xl border border-primary/10 bg-accent/5 flex items-center gap-3">
        <div className="p-2 rounded-full bg-violet-500/10">
          <Volume2 className="h-5 w-5 text-violet-500" />
        </div>
        <audio src={url} controls className="w-full h-10" />
      </div>
    )
  }
  if (type === 'pdf') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-2.5 p-3.5 rounded-xl border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 transition-colors"
      >
        <Download className="h-4 w-4 text-orange-500 shrink-0" />
        <span className="text-sm font-medium text-orange-600 dark:text-orange-400 truncate">
          Prévisualiser le PDF
        </span>
      </a>
    )
  }
  return null
}

/* ─── main page ───────────────────────────────────────── */

function EditInstructorCoursePage() {
  const { courseId } = Route.useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { courses, updateCourse, addModule, deleteModule, addLesson, updateLesson, deleteLesson } =
    useCoursesStore()

  const course = courses.find((c) => c.id === courseId)

  const isOwner = React.useMemo(() => {
    if (!user || !course) return false
    // Owner = created by this user OR demo course for instructors
    return (
      course.instructorId === String(user.id) ||
      (course.id === 'lithotherapie-cristaux' && user.role === 'instructor')
    )
  }, [course, user])

  /* ── details form state ── */
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [level, setLevel] = React.useState<Course['level']>('Débutant')
  const [price, setPrice] = React.useState(0)
  const [badge, setBadge] = React.useState('')
  const [image, setImage] = React.useState('')
  const [detailsDirty, setDetailsDirty] = React.useState(false)

  /* ── module add state ── */
  const [newModuleTitle, setNewModuleTitle] = React.useState('')

  /* ── lesson create/edit dialog ── */
  const [lessonDialog, setLessonDialog] = React.useState<{
    open: boolean
    mode: 'create' | 'edit'
    moduleId: string | null
    lesson: Lesson | null
  }>({ open: false, mode: 'create', moduleId: null, lesson: null })

  const [lessonTitle, setLessonTitle] = React.useState('')
  const [lessonType, setLessonType] = React.useState<Lesson['type']>('video')
  const [lessonContent, setLessonContent] = React.useState('')
  const [lessonResourceUrl, setLessonResourceUrl] = React.useState('')

  /* ── quiz editor ── */
  const [quizDialog, setQuizDialog] = React.useState<{
    open: boolean
    moduleId: string | null
    lesson: Lesson | null
  }>({ open: false, moduleId: null, lesson: null })
  const [quizQuestions, setQuizQuestions] = React.useState<QuizQuestion[]>([])

  /* ── populate state on load ── */
  React.useEffect(() => {
    if (course && isOwner) {
      setTitle(course.title)
      setDescription(course.description)
      setLevel(course.level)
      setPrice(course.price)
      setBadge(course.badge || '')
      setImage(course.image || '')
    }
  }, [course, isOwner])

  /* ── guard ── */
  if (!course) {
    return (
      <div className="container mx-auto p-8 text-center space-y-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <BookOpen className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Cours introuvable</h2>
        <Button onClick={() => navigate({ to: '/instructor/courses' as any })} className="rounded-xl">
          Retour à la liste
        </Button>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="container mx-auto p-12 text-center max-w-md space-y-6 pt-20">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">Accès Refusé</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Vous n'êtes pas autorisé à modifier cette formation. Seul le formateur propriétaire peut y accéder.
        </p>
        <Button asChild className="rounded-xl bg-primary hover:bg-primary/90 text-white">
          <Link to="/instructor/courses" params={undefined}>Retourner à mon catalogue</Link>
        </Button>
      </div>
    )
  }

  /* ── handlers ── */
  const handleSaveDetails = () => {
    updateCourse(course.id, { title, description, level, price: Number(price), badge, image: image || undefined })
    toast.success('Formation mise à jour avec succès !')
    setDetailsDirty(false)
  }

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return
    addModule(course.id, newModuleTitle.trim())
    setNewModuleTitle('')
    toast.success('Chapitre ajouté.')
  }

  const openCreateLesson = (moduleId: string) => {
    setLessonTitle('')
    setLessonType('video')
    setLessonContent('')
    setLessonResourceUrl('')
    setLessonDialog({ open: true, mode: 'create', moduleId, lesson: null })
  }

  const openEditLesson = (moduleId: string, lesson: Lesson) => {
    setLessonTitle(lesson.title)
    setLessonType(lesson.type)
    setLessonContent(lesson.content)
    setLessonResourceUrl(lesson.resourceUrl || '')
    setLessonDialog({ open: true, mode: 'edit', moduleId, lesson })
  }

  const handleSaveLesson = () => {
    if (!lessonTitle.trim()) {
      toast.error('Le titre de la leçon est obligatoire.')
      return
    }
    const data = {
      title: lessonTitle.trim(),
      type: lessonType,
      content: lessonContent,
      resourceUrl: lessonResourceUrl.trim() || undefined,
    }
    if (lessonDialog.mode === 'create' && lessonDialog.moduleId) {
      addLesson(course.id, lessonDialog.moduleId, data)
      toast.success('Leçon créée.')
    } else if (lessonDialog.mode === 'edit' && lessonDialog.moduleId && lessonDialog.lesson) {
      updateLesson(course.id, lessonDialog.moduleId, lessonDialog.lesson.id, data)
      toast.success('Leçon mise à jour.')
    }
    setLessonDialog({ open: false, mode: 'create', moduleId: null, lesson: null })
  }

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    if (!confirm('Supprimer cette leçon ?')) return
    deleteLesson(course.id, moduleId, lessonId)
    toast.success('Leçon supprimée.')
  }

  /* quiz handlers */
  const openQuizEditor = (moduleId: string, lesson: Lesson) => {
    setQuizQuestions(lesson.quiz?.questions || [])
    setQuizDialog({ open: true, moduleId, lesson })
  }

  const addQuestion = () => {
    setQuizQuestions((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ])
  }

  const updateQuestionText = (i: number, text: string) =>
    setQuizQuestions((prev) => prev.map((q, idx) => (idx === i ? { ...q, question: text } : q)))

  const updateOption = (qIdx: number, oIdx: number, text: string) =>
    setQuizQuestions((prev) =>
      prev.map((q, idx) =>
        idx === qIdx ? { ...q, options: q.options.map((o, oi) => (oi === oIdx ? text : o)) } : q
      )
    )

  const setCorrect = (qIdx: number, oIdx: number) =>
    setQuizQuestions((prev) =>
      prev.map((q, idx) => (idx === qIdx ? { ...q, correctAnswer: oIdx } : q))
    )

  const removeQuestion = (i: number) =>
    setQuizQuestions((prev) => prev.filter((_, idx) => idx !== i))

  const handleSaveQuiz = () => {
    if (!quizDialog.moduleId || !quizDialog.lesson) return
    // Validate: all questions need at least text
    const invalid = quizQuestions.some((q) => !q.question.trim())
    if (invalid) {
      toast.error('Chaque question doit avoir un intitulé.')
      return
    }
    updateLesson(course.id, quizDialog.moduleId, quizDialog.lesson.id, {
      quiz: quizQuestions.length > 0 ? { id: quizDialog.lesson.id, questions: quizQuestions } : undefined,
    })
    setQuizDialog({ open: false, moduleId: null, lesson: null })
    toast.success('Quiz enregistré !')
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="container mx-auto p-4 max-w-6xl space-y-6">
      {/* ── Top bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="outline" size="sm" asChild className="rounded-xl w-fit">
          <Link to="/instructor/courses" params={undefined}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Mes formations
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground truncate">{course.title}</h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <Badge variant={course.status === 'publié' ? 'default' : 'secondary'} className="rounded-md text-xs">
              {course.status === 'publié' ? (
                <><Eye className="h-3 w-3 mr-1" />En ligne</>
              ) : (
                <><EyeOff className="h-3 w-3 mr-1" />Brouillon</>
              )}
            </Badge>
            <span className="text-xs text-muted-foreground">{course.modules.length} chapitre(s) · {totalLessons} leçon(s)</span>
            <span className="text-xs font-bold text-primary">{course.price} €</span>
          </div>
        </div>
        <Button
          onClick={() => {
            const newStatus = course.status === 'publié' ? 'brouillon' : 'publié'
            updateCourse(course.id, { status: newStatus })
            toast.success(newStatus === 'publié' ? 'Formation mise en ligne !' : 'Formation masquée.')
          }}
          variant={course.status === 'publié' ? 'outline' : 'default'}
          className="rounded-xl shrink-0"
        >
          {course.status === 'publié' ? (
            <><EyeOff className="h-4 w-4 mr-1.5" />Masquer</>
          ) : (
            <><Eye className="h-4 w-4 mr-1.5" />Publier</>
          )}
        </Button>
      </div>

      {/* ── Tabs ── */}
      <Tabs defaultValue="curriculum" className="space-y-6">
        <TabsList className="flex w-full max-w-lg bg-muted/40 rounded-xl border p-1 gap-1">
          <TabsTrigger value="curriculum" className="flex-1 rounded-lg flex items-center gap-1.5 text-xs sm:text-sm">
            <LayoutList className="h-3.5 w-3.5" /> Curriculum
          </TabsTrigger>
          <TabsTrigger value="medias" className="flex-1 rounded-lg flex items-center gap-1.5 text-xs sm:text-sm">
            <Play className="h-3.5 w-3.5" /> Ressources
          </TabsTrigger>
          <TabsTrigger value="details" className="flex-1 rounded-lg flex items-center gap-1.5 text-xs sm:text-sm">
            <Settings2 className="h-3.5 w-3.5" /> Fiche
          </TabsTrigger>
        </TabsList>

        {/* ══════ CURRICULUM TAB ══════ */}
        <TabsContent value="curriculum" className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
            {/* Left: modules list */}
            <div className="space-y-4">
              {course.modules.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-primary/15 bg-accent/5 rounded-2xl space-y-3">
                  <div className="p-4 rounded-2xl bg-primary/5">
                    <BookOpen className="h-10 w-10 text-primary/30" />
                  </div>
                  <h3 className="font-bold text-foreground">Aucun chapitre encore</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Créez votre premier chapitre depuis le panneau de droite pour commencer à structurer votre formation.
                  </p>
                </div>
              ) : (
                course.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
                    {/* Module header */}
                    <div className="flex items-center justify-between px-5 py-4 bg-accent/30 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary">
                          {modIdx + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-foreground">{mod.title}</h3>
                          <p className="text-xs text-muted-foreground">{mod.lessons.length} leçon(s)</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openCreateLesson(mod.id)}
                          className="h-8 rounded-lg border-primary/20 hover:bg-primary/5 text-xs"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" /> Leçon
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm(`Supprimer le chapitre "${mod.title}" et toutes ses leçons ?`)) {
                              deleteModule(course.id, mod.id)
                              toast.success('Chapitre supprimé.')
                            }
                          }}
                          className="h-8 w-8 p-0 rounded-lg text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Lessons list */}
                    <div className="p-4 space-y-2.5 bg-card">
                      {mod.lessons.length === 0 ? (
                        <button
                          onClick={() => openCreateLesson(mod.id)}
                          className="w-full text-xs text-muted-foreground text-center py-4 border border-dashed rounded-xl border-primary/10 bg-accent/5 hover:bg-primary/5 hover:border-primary/20 transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5 inline mr-1" />
                          Ajouter la première leçon
                        </button>
                      ) : (
                        mod.lessons.map((lesson) => (
                          <LessonRow
                            key={lesson.id}
                            lesson={lesson}
                            moduleId={mod.id}
                            courseId={course.id}
                            onEdit={openEditLesson}
                            onQuiz={openQuizEditor}
                            onDelete={handleDeleteLesson}
                          />
                        ))
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right: add module panel */}
            <div className="rounded-2xl border border-border/60 bg-card shadow-sm p-5 space-y-4 sticky top-4">
              <div>
                <h3 className="font-bold text-base">Nouveau chapitre</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Segmentez votre cours en modules clairs.</p>
              </div>
              <div className="space-y-3">
                <Field>
                  <FieldLabel htmlFor="module-title" className="text-xs">Titre du chapitre</FieldLabel>
                  <Input
                    id="module-title"
                    placeholder="ex: Chapitre 1 — Introduction"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddModule()}
                    className="rounded-xl border-primary/15 h-10 text-sm"
                  />
                </Field>
                <Button
                  onClick={handleAddModule}
                  disabled={!newModuleTitle.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-10"
                >
                  <Plus className="h-4 w-4 mr-1.5" /> Créer le chapitre
                </Button>
              </div>

              {/* Summary */}
              {course.modules.length > 0 && (
                <div className="pt-3 border-t border-border/50 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Résumé</p>
                  <div className="space-y-1.5">
                    {(['video', 'pdf', 'audio', 'text'] as Lesson['type'][]).map((t) => {
                      const count = course.modules
                        .flatMap((m) => m.lessons)
                        .filter((l) => l.type === t).length
                      if (count === 0) return null
                      const meta = LESSON_TYPE_META[t]
                      const Icon = meta.icon
                      return (
                        <div key={t} className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Icon className={`h-3.5 w-3.5 ${meta.color}`} />
                            {meta.label}
                          </span>
                          <span className="font-semibold text-foreground">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* ══════ RESSOURCES MÉDIA TAB ══════ */}
        <TabsContent value="medias" className="space-y-5">
          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold">Ressources Média</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Aperçu de toutes les ressources (vidéo, audio, PDF) liées à vos leçons. Pour modifier l'URL d'une ressource, cliquez "Modifier" sur la leçon dans l'onglet Curriculum.
              </p>
            </div>

            {course.modules.every((m) => m.lessons.every((l) => !l.resourceUrl)) ? (
              <div className="flex flex-col items-center py-12 text-center space-y-3">
                <div className="p-4 rounded-2xl bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-bold">Aucune ressource externe</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Ajoutez des leçons de type Vidéo, Audio ou PDF dans le Curriculum et renseignez une URL de ressource pour les retrouver ici.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {course.modules.map((mod) => {
                  const withMedia = mod.lessons.filter((l) => l.resourceUrl)
                  if (withMedia.length === 0) return null
                  return (
                    <div key={mod.id} className="space-y-3">
                      <h3 className="text-sm font-bold text-foreground border-b border-border/50 pb-2">{mod.title}</h3>
                      <div className="space-y-4">
                        {withMedia.map((lesson) => (
                          <div key={lesson.id} className="rounded-xl border border-border/50 bg-accent/20 p-4 space-y-3">
                            <div className="flex items-center gap-3">
                              <LessonIcon type={lesson.type} />
                              <div>
                                <p className="font-semibold text-sm">{lesson.title}</p>
                                <a
                                  href={lesson.resourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline truncate block max-w-xs"
                                >
                                  {lesson.resourceUrl}
                                </a>
                              </div>
                            </div>
                            <MediaPreview url={lesson.resourceUrl!} type={lesson.type} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* URL tips */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-amber-700 dark:text-amber-400">Format des URLs de ressources</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong>Vidéo</strong> : lien direct vers un fichier .mp4, ou embed YouTube/Vimeo</li>
                  <li><strong>PDF</strong> : lien vers un PDF hébergé (Google Drive, Dropbox, AWS S3...)</li>
                  <li><strong>Audio</strong> : lien vers un fichier .mp3 ou .ogg public</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ══════ FICHE DESCRIPTIVE TAB ══════ */}
        <TabsContent value="details" className="max-w-2xl">
          <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
            <div className="p-6 space-y-5">
              <div>
                <h2 className="text-lg font-bold">Fiche descriptive</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Informations commerciales de votre formation.</p>
              </div>

              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="edit-title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Titre de la formation</FieldLabel>
                  <Input
                    id="edit-title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); setDetailsDirty(true) }}
                    className="rounded-xl border-primary/15 h-11"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-desc" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description commerciale</FieldLabel>
                  <Textarea
                    id="edit-desc"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); setDetailsDirty(true) }}
                    className="min-h-28 rounded-xl border-primary/15 resize-none"
                    placeholder="Décrivez les bienfaits, le programme et le public cible de votre formation..."
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="edit-level" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Niveau</FieldLabel>
                    <Select onValueChange={(v) => { setLevel(v as Course['level']); setDetailsDirty(true) }} value={level}>
                      <SelectTrigger id="edit-level" className="rounded-xl border-primary/15 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Débutant">Débutant</SelectItem>
                        <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                        <SelectItem value="Avancé">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="edit-price" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prix public (€)</FieldLabel>
                    <Input
                      type="number"
                      id="edit-price"
                      value={price}
                      min={0}
                      onChange={(e) => { setPrice(Number(e.target.value)); setDetailsDirty(true) }}
                      className="rounded-xl border-primary/15 h-11"
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="edit-badge" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Badge (étiquette catalogue)</FieldLabel>
                  <Input
                    id="edit-badge"
                    value={badge}
                    onChange={(e) => { setBadge(e.target.value); setDetailsDirty(true) }}
                    className="rounded-xl border-primary/15 h-11"
                    placeholder="Nouveau · Populaire · Recommandé · Essentiel..."
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-image" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL Image de couverture</FieldLabel>
                  <Input
                    id="edit-image"
                    value={image}
                    onChange={(e) => { setImage(e.target.value); setDetailsDirty(true) }}
                    placeholder="https://images.unsplash.com/..."
                    className="rounded-xl border-primary/15 h-11"
                  />
                  {image && (
                    <div className="mt-2 rounded-xl overflow-hidden h-40 border border-primary/10">
                      <img src={image} alt="Aperçu" className="h-full w-full object-cover" />
                    </div>
                  )}
                </Field>
              </FieldGroup>
            </div>

            <div className="border-t border-border/50 bg-muted/20 flex items-center justify-between gap-3 px-6 py-4">
              {detailsDirty && (
                <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Modifications non enregistrées
                </p>
              )}
              <Button
                onClick={handleSaveDetails}
                className="ml-auto flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white rounded-xl"
              >
                <Save className="h-4 w-4" /> Enregistrer la fiche
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* ══════ DIALOG : Créer / Modifier leçon ══════ */}
      <Dialog open={lessonDialog.open} onOpenChange={(o) => setLessonDialog((s) => ({ ...s, open: o }))}>
        <DialogContent className="sm:max-w-[540px] rounded-3xl p-0 overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
            <DialogTitle className="font-bold text-lg">
              {lessonDialog.mode === 'create' ? 'Ajouter une leçon' : 'Modifier la leçon'}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {lessonDialog.mode === 'create'
                ? 'Créez du contenu interactif pour votre module.'
                : 'Mettez à jour le contenu et les ressources de cette leçon.'}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="les-title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Titre de la leçon <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="les-title"
                  placeholder="ex: Introduction théorique au LaHoChi"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="rounded-xl border-primary/15 h-11"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="les-type" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type de contenu</FieldLabel>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.entries(LESSON_TYPE_META) as [Lesson['type'], typeof LESSON_TYPE_META[Lesson['type']]][]).map(([type, meta]) => {
                    const Icon = meta.icon
                    const selected = lessonType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setLessonType(type)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                          selected
                            ? `${meta.bg} ${meta.color} border-current`
                            : 'border-border/50 text-muted-foreground hover:border-primary/20 hover:bg-accent/30'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {meta.label}
                      </button>
                    )
                  })}
                </div>
              </Field>

              {(lessonType === 'video' || lessonType === 'pdf' || lessonType === 'audio') && (
                <Field>
                  <FieldLabel htmlFor="les-url" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    URL de la ressource {lessonType === 'video' ? 'vidéo' : lessonType === 'pdf' ? 'PDF' : 'audio'}
                  </FieldLabel>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="les-url"
                        placeholder="https://..."
                        value={lessonResourceUrl}
                        onChange={(e) => setLessonResourceUrl(e.target.value)}
                        className="pl-10 rounded-xl border-primary/15 h-11"
                      />
                    </div>
                  </div>
                  {lessonResourceUrl && <MediaPreview url={lessonResourceUrl} type={lessonType} />}
                </Field>
              )}

              <Field>
                <FieldLabel htmlFor="les-content" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {lessonType === 'text' ? 'Contenu de la leçon' : 'Description / Introduction'}
                </FieldLabel>
                <Textarea
                  id="les-content"
                  placeholder={
                    lessonType === 'text'
                      ? 'Rédigez le contenu textuel de la leçon ici...'
                      : 'Décrivez brièvement le contenu et les objectifs de cette leçon...'
                  }
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  className="min-h-24 rounded-xl border-primary/15 resize-none"
                />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-border/50 bg-muted/20 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setLessonDialog((s) => ({ ...s, open: false }))}
              className="rounded-xl flex-1"
            >
              <X className="h-4 w-4 mr-1.5" /> Annuler
            </Button>
            <Button
              onClick={handleSaveLesson}
              disabled={!lessonTitle.trim()}
              className="rounded-xl flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
              {lessonDialog.mode === 'create' ? 'Créer la leçon' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ══════ DIALOG : Quiz Editor ══════ */}
      <Dialog open={quizDialog.open} onOpenChange={(o) => setQuizDialog((s) => ({ ...s, open: o }))}>
        <DialogContent className="sm:max-w-[620px] rounded-3xl p-0 overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
            <DialogTitle className="font-bold text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-amber-500" />
              Éditeur de Quiz
            </DialogTitle>
            <DialogDescription>
              {quizDialog.lesson?.title} — Créez des questions à choix multiples pour évaluer vos apprenants.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
            {quizQuestions.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed rounded-2xl border-primary/10 bg-accent/5 space-y-2">
                <HelpCircle className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                <p className="text-sm text-muted-foreground">Aucune question pour l'instant.</p>
              </div>
            ) : (
              quizQuestions.map((q, qIdx) => (
                <div key={q.id} className="p-5 rounded-2xl border border-primary/10 bg-accent/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary">
                      {qIdx + 1}
                    </span>
                    <Input
                      value={q.question}
                      onChange={(e) => updateQuestionText(qIdx, e.target.value)}
                      placeholder="Saisissez l'intitulé de la question…"
                      className="flex-1 rounded-xl border-primary/15 h-10 text-sm font-medium"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(qIdx)}
                      className="h-9 w-9 p-0 shrink-0 text-destructive hover:bg-destructive/10 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCorrect(qIdx, oIdx)}
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            q.correctAnswer === oIdx
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {q.correctAnswer === oIdx && (
                            <div className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </button>
                        <Input
                          value={opt}
                          onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                          placeholder={`Option ${oIdx + 1}`}
                          className={`flex-1 rounded-xl h-9 text-sm border-primary/15 ${
                            q.correctAnswer === oIdx
                              ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
                              : ''
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Cliquez sur le cercle à gauche pour désigner la bonne réponse.
                  </p>
                </div>
              ))
            )}

            <Button
              variant="outline"
              onClick={addQuestion}
              className="w-full rounded-xl border-dashed border-primary/20 hover:bg-primary/5 h-11"
            >
              <Plus className="h-4 w-4 mr-1.5" /> Ajouter une question
            </Button>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-border/50 bg-muted/20 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setQuizDialog((s) => ({ ...s, open: false }))}
              className="rounded-xl flex-1"
            >
              <X className="h-4 w-4 mr-1.5" /> Annuler
            </Button>
            <Button
              onClick={handleSaveQuiz}
              className="rounded-xl flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              <Save className="h-4 w-4 mr-1.5" /> Enregistrer le quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
