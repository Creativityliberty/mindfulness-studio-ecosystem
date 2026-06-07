import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore, type Course } from '@/stores/courses-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Plus, Search, Trash2, Edit3, Eye, EyeOff, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

// Creation validation schema
const createCourseSchema = z.object({
  title: z.string().min(3, 'Le titre doit faire au moins 3 caractères'),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères'),
  level: z.enum(['Débutant', 'Intermédiaire', 'Avancé']),
  price: z.coerce.number().min(0, 'Le prix doit être positif'),
  badge: z.string().default('Nouveau'),
  status: z.enum(['brouillon', 'publié']).default('brouillon'),
  image: z.string().optional(),
})

export const Route = createFileRoute('/_protected/instructor/courses')({
  component: InstructorCoursesPage,
})

function InstructorCoursesPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { courses, addCourse, deleteCourse, updateCourse } = useCoursesStore()
  
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)

  const isPending = user?.status === 'en_attente'

  // Filter only courses belonging to the current instructor or template courses
  const myCourses = React.useMemo(() => {
    if (!user || isPending) return []
    return courses.filter(
      (course) =>
        course.instructorId === String(user.id) ||
        (course.id === 'lithotherapie-cristaux' && user.role === 'instructor')
    )
  }, [courses, user, isPending])

  // Apply search and status filters
  const filteredCourses = React.useMemo(() => {
    return myCourses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [myCourses, searchTerm, statusFilter])

  // Form setup
  const form = useForm<any>({
    resolver: zodResolver(createCourseSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      level: 'Débutant',
      price: 99,
      badge: 'Nouveau',
      status: 'brouillon',
      image: '',
    },
  })

  const onSubmit = (data: any) => {
    if (!user) return

    const courseId = addCourse({
      title: data.title,
      description: data.description,
      level: data.level,
      price: data.price,
      badge: data.badge,
      status: data.status,
      image: data.image || undefined,
      instructorId: String(user.id),
      instructorName: user.name,
      instructorTitle: 'Instructeur Praticien',
    })

    toast.success('Votre cours a été créé !')
    setIsCreateOpen(false)
    form.reset()
    
    // Redirect to edit syllabus
    navigate({ to: `/instructor/courses/${courseId}` as any })
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Voulez-vous vraiment supprimer cette formation ?')) {
      deleteCourse(id)
      toast.success('Formation supprimée.')
    }
  }

  const toggleStatus = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation()
    const newStatus = course.status === 'publié' ? 'brouillon' : 'publié'
    updateCourse(course.id, { status: newStatus })
    toast.success(newStatus === 'publié' ? 'Formation en ligne !' : 'Formation masquée.')
  }

  if (isPending) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent">
            Mes Formations
          </h1>
          <p className="text-muted-foreground">
            Pilotez votre catalogue de cours holistiques et éditez vos syllabus de formation.
          </p>
        </div>
        <Card className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-primary/20 bg-accent/5 rounded-2xl max-w-2xl mx-auto space-y-4">
          <Clock className="h-12 w-12 text-amber-500 animate-pulse mb-2" />
          <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300">Accès restreint aux cours</h3>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            Votre compte est en cours d'examen par la direction de Bien-être Studio. Vous pourrez créer et gérer vos cours dès que Fabienne Dizy Olliveaud aura validé votre dossier.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent">
            Mes Formations
          </h1>
          <p className="text-muted-foreground">
            Pilotez votre catalogue de cours holistiques et éditez vos syllabus de formation.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md">
          <Plus className="h-4 w-4" /> Nouvelle Formation
        </Button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl border border-primary/10">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans mes cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 rounded-xl border-primary/10"
          />
        </div>
        <div className="w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] rounded-xl border-primary/10">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="publié">En ligne</SelectItem>
              <SelectItem value="brouillon">Brouillon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCourses.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-primary/20 bg-accent/5 rounded-2xl">
          <BookOpen className="h-12 w-12 text-primary mb-4 opacity-50" />
          <h3 className="text-lg font-bold">Aucune formation trouvée</h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Commencez dès maintenant en créant votre premier cours énergétique et holistique.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              onClick={() => navigate({ to: `/instructor/courses/${course.id}` as any })}
              className="flex flex-col overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-primary/10 bg-card rounded-2xl"
            >
              {/* Image banner */}
              <div className="h-40 w-full bg-muted flex items-center justify-center relative">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                ) : (
                  <BookOpen className="h-10 w-10 text-primary/30" />
                )}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <Badge variant={course.status === 'publié' ? 'default' : 'secondary'} className="rounded-md">
                    {course.status === 'publié' ? 'En ligne' : 'Brouillon'}
                  </Badge>
                  <Badge variant="outline" className="bg-background rounded-md">
                    {course.badge}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-background/90 text-primary px-2.5 py-1 rounded-lg text-sm font-bold shadow-sm">
                  {course.price} €
                </div>
              </div>

              <CardHeader className="p-5">
                <CardTitle className="text-lg font-bold line-clamp-1">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow pt-0 px-5 text-sm space-y-1.5 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Niveau</span>
                  <span className="font-semibold text-foreground">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Curriculum</span>
                  <span className="font-semibold text-foreground">{course.modules?.length || 0} Module(s)</span>
                </div>
              </CardContent>

              <CardFooter className="border-t border-primary/5 bg-accent/5 p-4 flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => toggleStatus(course, e)}
                  className="flex items-center gap-1.5 rounded-xl border-primary/10 hover:bg-primary/5"
                >
                  {course.status === 'publié' ? (
                    <>
                      <EyeOff className="h-4 w-4" /> Masquer
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" /> Mettre en ligne
                    </>
                  )}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate({ to: `/instructor/courses/${course.id}` as any })
                    }}
                    className="flex items-center gap-1.5 rounded-xl border-primary/10"
                  >
                    <Edit3 className="h-4 w-4" /> Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => handleDelete(course.id, e)}
                    className="h-9 w-9 p-0 rounded-xl"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create Course Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl p-6" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Créer une formation</DialogTitle>
            <DialogDescription>
              Entrez les informations de base de votre nouveau cours énergétique.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="course-title">Titre du cours</FieldLabel>
                    <Input
                      {...field}
                      id="course-title"
                      placeholder="ex: Reiki Usui - Niveau 1"
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="course-desc">Description</FieldLabel>
                    <Textarea
                      {...field}
                      id="course-desc"
                      placeholder="Décrivez le contenu et les bienfaits de cette formation..."
                      className="min-h-20 rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="level"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="course-level">Niveau</FieldLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="course-level" className="rounded-xl border-primary/10">
                          <SelectValue placeholder="Niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Débutant">Débutant</SelectItem>
                          <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                          <SelectItem value="Avancé">Avancé</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />

                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="course-price">Prix (€)</FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        id="course-price"
                        className="rounded-xl border-primary/10 focus-visible:ring-primary"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="course-image">URL de l'image de couverture</FieldLabel>
                    <Input
                      {...field}
                      id="course-image"
                      placeholder="ex: https://images.unsplash.com/..."
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <DialogFooter className="pt-4 flex gap-2">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-xl flex-1">
                Annuler
              </Button>
              <Button type="submit" className="rounded-xl flex-1 bg-primary hover:bg-primary/90 text-white">
                Créer et continuer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
