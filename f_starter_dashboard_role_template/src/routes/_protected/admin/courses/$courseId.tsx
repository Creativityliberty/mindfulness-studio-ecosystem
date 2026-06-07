import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useCoursesStore, type Course, type Lesson, type QuizQuestion } from '@/stores/courses-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import { ChevronLeft, Plus, Trash2, Save, Video, FileText, Music, Type, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export const Route = createFileRoute('/_protected/admin/courses/$courseId')({
  component: EditCoursePage,
})

function EditCoursePage() {
  const { courseId } = Route.useParams()
  const navigate = useNavigate()
  const {
    courses,
    updateCourse,
    addModule,
    deleteModule,
    addLesson,
    updateLesson,
    deleteLesson,
  } = useCoursesStore()

  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Cours introuvable</h2>
        <Button onClick={() => navigate({ to: '/admin/courses' })} className="mt-4">
          Retour à la liste
        </Button>
      </div>
    )
  }

  // Course Details form state
  const [title, setTitle] = React.useState(course.title)
  const [description, setDescription] = React.useState(course.description)
  const [level, setLevel] = React.useState<Course['level']>(course.level)
  const [price, setPrice] = React.useState(course.price)
  const [badge, setBadge] = React.useState(course.badge)
  const [image, setImage] = React.useState(course.image || '')

  // Module state
  const [newModuleTitle, setNewModuleTitle] = React.useState('')

  // Lesson state
  const [selectedModuleId, setSelectedModuleId] = React.useState<string | null>(null)
  const [isLessonCreateOpen, setIsLessonCreateOpen] = React.useState(false)
  const [lessonTitle, setLessonTitle] = React.useState('')
  const [lessonType, setLessonType] = React.useState<Lesson['type']>('video')
  const [lessonContent, setLessonContent] = React.useState('')
  const [lessonResourceUrl, setLessonResourceUrl] = React.useState('')

  // Quiz Editor state
  const [activeQuizLesson, setActiveQuizLesson] = React.useState<{ moduleId: string; lesson: Lesson } | null>(null)
  const [isQuizEditorOpen, setIsQuizEditorOpen] = React.useState(false)
  const [quizQuestions, setQuizQuestions] = React.useState<QuizQuestion[]>([])

  const handleSaveDetails = () => {
    updateCourse(course.id, {
      title,
      description,
      level,
      price: Number(price),
      badge,
      image: image || undefined,
    })
    toast.success('Détails du cours sauvegardés !')
  }

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return
    addModule(course.id, newModuleTitle)
    setNewModuleTitle('')
    toast.success('Module ajouté.')
  }

  const handleAddLesson = () => {
    if (!selectedModuleId || !lessonTitle.trim()) return
    addLesson(course.id, selectedModuleId, {
      title: lessonTitle,
      type: lessonType,
      content: lessonContent,
      resourceUrl: lessonResourceUrl || undefined,
    })
    setIsLessonCreateOpen(false)
    setLessonTitle('')
    setLessonContent('')
    setLessonResourceUrl('')
    toast.success('Leçon ajoutée avec succès.')
  }

  // Quiz logic
  const handleOpenQuizEditor = (moduleId: string, lesson: Lesson) => {
    setActiveQuizLesson({ moduleId, lesson })
    setQuizQuestions(lesson.quiz?.questions || [])
    setIsQuizEditorOpen(true)
  }

  const handleAddQuizQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Math.random().toString(36).substring(2, 9),
      question: 'Nouvelle Question ?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
    }
    setQuizQuestions([...quizQuestions, newQuestion])
  }

  const handleUpdateQuestionText = (index: number, text: string) => {
    const updated = [...quizQuestions]
    updated[index].question = text
    setQuizQuestions(updated)
  }

  const handleUpdateQuestionOption = (qIndex: number, oIndex: number, text: string) => {
    const updated = [...quizQuestions]
    updated[qIndex].options[oIndex] = text
    setQuizQuestions(updated)
  }

  const handleUpdateQuestionCorrect = (qIndex: number, oIndex: number) => {
    const updated = [...quizQuestions]
    updated[qIndex].correctAnswer = oIndex
    setQuizQuestions(updated)
  }

  const handleDeleteQuestion = (index: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index))
  }

  const handleSaveQuiz = () => {
    if (!activeQuizLesson) return
    updateLesson(course.id, activeQuizLesson.moduleId, activeQuizLesson.lesson.id, {
      quiz: quizQuestions.length > 0 ? { id: activeQuizLesson.lesson.id, questions: quizQuestions } : undefined,
    })
    setIsQuizEditorOpen(false)
    toast.success('Quiz sauvegardé !')
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Top bar */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/courses">
            <ChevronLeft className="h-4 w-4 mr-1" /> Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modifier : {course.title}</h1>
          <p className="text-muted-foreground">Configurez le syllabus, les leçons et les quiz.</p>
        </div>
      </div>

      <Tabs defaultValue="curriculum" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="curriculum">Curriculum / Syllabus</TabsTrigger>
          <TabsTrigger value="details">Détails du cours</TabsTrigger>
        </TabsList>

        {/* CURRICULUM TAB */}
        <TabsContent value="curriculum" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 items-start">
            {/* Left side: Curriculum */}
            <div className="space-y-4">
              {course.modules.length === 0 ? (
                <Card className="p-8 text-center border-dashed">
                  <p className="text-muted-foreground">Ce cours n'a pas encore de module.</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Créez votre premier module sur la droite.</p>
                </Card>
              ) : (
                course.modules.map((mod) => (
                  <Card key={mod.id} className="border">
                    <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/10">
                      <div>
                        <CardTitle className="text-lg">{mod.title}</CardTitle>
                        <CardDescription>{mod.lessons.length} Leçon(s)</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedModuleId(mod.id)
                            setIsLessonCreateOpen(true)
                          }}
                          className="flex items-center gap-1.5"
                        >
                          <Plus className="h-4 w-4" /> Ajouter Leçon
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteModule(course.id, mod.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      {mod.lessons.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-2">
                          Aucune leçon dans ce module.
                        </p>
                      ) : (
                        mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-lg border bg-card/50"
                          >
                            <div className="flex items-center gap-3">
                              <span className="p-2 rounded-lg bg-muted text-muted-foreground">
                                {lesson.type === 'video' && <Video className="h-4 w-4" />}
                                {lesson.type === 'pdf' && <FileText className="h-4 w-4" />}
                                {lesson.type === 'audio' && <Music className="h-4 w-4" />}
                                {lesson.type === 'text' && <Type className="h-4 w-4" />}
                              </span>
                              <div>
                                <h4 className="font-semibold text-sm">{lesson.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-[10px] uppercase font-bold">
                                    {lesson.type}
                                  </Badge>
                                  {lesson.quiz && (
                                    <Badge className="text-[10px] bg-green-100 text-green-800 hover:bg-green-100">
                                      Contient un Quiz ({lesson.quiz.questions.length})
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenQuizEditor(mod.id, lesson)}
                                className="text-xs flex items-center gap-1.5"
                              >
                                <HelpCircle className="h-3.5 w-3.5" /> Quiz
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteLesson(course.id, mod.id, lesson.id)}
                                className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Right side: Add Module */}
            <Card className="border bg-card">
              <CardHeader>
                <CardTitle>Ajouter un Module</CardTitle>
                <CardDescription>Divisez votre formation en chapitres logiques.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="module-title">Titre du module</FieldLabel>
                  <Input
                    id="module-title"
                    placeholder="ex: Module 2 : Techniques rédactionnelles"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                  />
                </Field>
                <Button onClick={handleAddModule} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Ajouter le module
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DETAILS TAB */}
        <TabsContent value="details" className="max-w-2xl">
          <Card className="border">
            <CardHeader>
              <CardTitle>Détails principaux de la formation</CardTitle>
              <CardDescription>Mettez à jour le titre, prix et description commerciale.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="edit-title">Titre du cours</FieldLabel>
                  <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-desc">Description</FieldLabel>
                  <Textarea
                    id="edit-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-32"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="edit-level">Niveau</FieldLabel>
                    <Select
                      onValueChange={(val) => setLevel(val as Course['level'])}
                      value={level}
                    >
                      <SelectTrigger id="edit-level">
                        <SelectValue placeholder="Niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Débutant">Débutant</SelectItem>
                        <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                        <SelectItem value="Avancé">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="edit-price">Prix (€)</FieldLabel>
                    <Input
                      type="number"
                      id="edit-price"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="edit-badge">Badge commercial</FieldLabel>
                  <Input id="edit-badge" value={badge} onChange={(e) => setBadge(e.target.value)} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-image">URL de l'image de couverture</FieldLabel>
                  <Input id="edit-image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://images.unsplash.com/..." />
                  {image && (
                    <div className="mt-2 rounded-lg overflow-hidden h-32 border">
                      <img src={image} alt="Aperçu de la couverture" className="h-full w-full object-cover" />
                    </div>
                  )}
                </Field>
              </FieldGroup>
            </CardContent>
            <CardContent className="border-t bg-muted/10 flex justify-end gap-2 py-4">
              <Button onClick={handleSaveDetails} className="flex items-center gap-1.5">
                <Save className="h-4 w-4" /> Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for Creating Lesson */}
      <Dialog open={isLessonCreateOpen} onOpenChange={setIsLessonCreateOpen}>
        <DialogContent className="sm:max-w-[500px]" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Ajouter une leçon</DialogTitle>
            <DialogDescription>
              Configurez le contenu de la leçon.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="les-title">Titre de la leçon</FieldLabel>
                <Input
                  id="les-title"
                  placeholder="ex: Rédiger un titre accrocheur"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="les-type">Type de contenu</FieldLabel>
                <Select
                  onValueChange={(val) => setLessonType(val as Lesson['type'])}
                  value={lessonType}
                >
                  <SelectTrigger id="les-type">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Vidéo MP4</SelectItem>
                    <SelectItem value="pdf">Document PDF</SelectItem>
                    <SelectItem value="audio">Podcast Audio</SelectItem>
                    <SelectItem value="text">Texte / Markdown</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {(lessonType === 'video' || lessonType === 'pdf' || lessonType === 'audio') && (
                <Field>
                  <FieldLabel htmlFor="les-url">URL de la ressource (Media)</FieldLabel>
                  <Input
                    id="les-url"
                    placeholder="https://..."
                    value={lessonResourceUrl}
                    onChange={(e) => setLessonResourceUrl(e.target.value)}
                  />
                </Field>
              )}

              <Field>
                <FieldLabel htmlFor="les-content">
                  {lessonType === 'text' ? 'Contenu texte (Markdown autorisé)' : 'Description courte'}
                </FieldLabel>
                <Textarea
                  id="les-content"
                  placeholder="Écrivez le contenu ou les instructions..."
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  className="min-h-24"
                />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLessonCreateOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddLesson}>Créer la leçon</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Quiz Editor */}
      <Dialog open={isQuizEditorOpen} onOpenChange={setIsQuizEditorOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Éditeur de Quiz : {activeQuizLesson?.lesson.title}</DialogTitle>
            <DialogDescription>
              Ajoutez des questions à choix multiples pour tester les connaissances des étudiants.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 my-4">
            {quizQuestions.length === 0 ? (
              <div className="text-center py-6 border rounded-lg border-dashed text-muted-foreground">
                Ce quiz ne contient aucune question.
              </div>
            ) : (
              quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="p-4 rounded-xl border bg-slate-50 space-y-3 relative">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm font-bold text-slate-500">Question {qIndex + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteQuestion(qIndex)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      Supprimer
                    </Button>
                  </div>

                  <Field>
                    <Input
                      value={q.question}
                      onChange={(e) => handleUpdateQuestionText(qIndex, e.target.value)}
                      placeholder="Intitulé de la question..."
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {q.options.map((opt, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctAnswer === oIndex}
                          onChange={() => handleUpdateQuestionCorrect(qIndex, oIndex)}
                          className="h-4 w-4 text-primary"
                        />
                        <Input
                          value={opt}
                          onChange={(e) => handleUpdateQuestionOption(qIndex, oIndex, e.target.value)}
                          placeholder={`Option ${oIndex + 1}...`}
                          className={q.correctAnswer === oIndex ? 'border-green-500 bg-green-50/20' : ''}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <Button variant="outline" onClick={handleAddQuizQuestion} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Ajouter une question
            </Button>
          </div>

          <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t">
            <Button variant="outline" onClick={() => setIsQuizEditorOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveQuiz}>Enregistrer le Quiz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
