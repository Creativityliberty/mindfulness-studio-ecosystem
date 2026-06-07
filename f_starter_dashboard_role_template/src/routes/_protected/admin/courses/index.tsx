import * as React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCoursesStore, type Course } from '@/stores/courses-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Plus, Search, Trash2, Edit3, Eye, EyeOff } from 'lucide-react'
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

// Form schema for course creation
const createCourseSchema = z.object({
  title: z.string().min(3, 'Le titre doit faire au moins 3 caractères'),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères'),
  level: z.enum(['Débutant', 'Intermédiaire', 'Avancé']),
  price: z.coerce.number().min(0, 'Le prix doit être positif'),
  badge: z.string().default('Nouveau'),
  status: z.enum(['brouillon', 'publié']).default('brouillon'),
  image: z.string().optional(),
})

export const Route = createFileRoute('/_protected/admin/courses/')({
  component: AdminCoursesPage,
})

function AdminCoursesPage() {
  const navigate = useNavigate()
  const { courses, addCourse, deleteCourse, updateCourse } = useCoursesStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [levelFilter, setLevelFilter] = React.useState<string>('all')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)

  // Filter courses
  const filteredCourses = React.useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter
      return matchesSearch && matchesLevel && matchesStatus
    })
  }, [courses, searchTerm, levelFilter, statusFilter])

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
    const courseId = addCourse({
      title: data.title,
      description: data.description,
      level: data.level,
      price: data.price,
      badge: data.badge,
      status: data.status,
      image: data.image || undefined,
    })
    toast.success('Cours créé avec succès !')
    setIsCreateOpen(false)
    form.reset()
    // Redirect to edit detailed syllabus
    navigate({ to: `/admin/courses/${courseId}` })
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      deleteCourse(id)
      toast.success('Cours supprimé avec succès.')
    }
  }

  const toggleStatus = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation()
    const newStatus = course.status === 'publié' ? 'brouillon' : 'publié'
    updateCourse(course.id, { status: newStatus })
    toast.success(newStatus === 'publié' ? 'Cours publié !' : 'Cours masqué (brouillon).')
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Cours</h1>
          <p className="text-muted-foreground">
            Créez, gérez et publiez vos formations et programmes d'études.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Nouveau Cours
        </Button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl border">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              <SelectItem value="Débutant">Débutant</SelectItem>
              <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
              <SelectItem value="Avancé">Avancé</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="publié">Publiés</SelectItem>
              <SelectItem value="brouillon">Brouillons</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold">Aucun cours trouvé</h3>
          <p className="text-muted-foreground mt-2">
            Commencez par créer votre premier cours en cliquant sur "Nouveau Cours".
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              onClick={() => navigate({ to: `/admin/courses/${course.id}` })}
              className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border bg-card"
            >
              {/* Cover placeholder / Image */}
              <div className="h-40 w-full bg-muted flex items-center justify-center relative">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                ) : (
                  <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                )}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <Badge variant={course.status === 'publié' ? 'default' : 'secondary'}>
                    {course.status === 'publié' ? 'En ligne' : 'Brouillon'}
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    {course.badge}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-background/90 text-foreground px-2.5 py-1 rounded-lg text-sm font-bold shadow-sm">
                  {course.price} €
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-1">{course.title}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2 mt-1">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Niveau :</span>
                  {course.level}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span className="font-semibold text-foreground">Curriculum :</span>
                  {course.modules?.length || 0} Module(s)
                </div>
              </CardContent>

              <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => toggleStatus(course, e)}
                  className="flex items-center gap-1.5"
                >
                  {course.status === 'publié' ? (
                    <>
                      <EyeOff className="h-4 w-4" /> Masquer
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" /> Publier
                    </>
                  )}
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate({ to: `/admin/courses/${course.id}` })
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <Edit3 className="h-4 w-4" /> Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => handleDelete(course.id, e)}
                    className="h-9 w-9 p-0"
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
        <DialogContent className="sm:max-w-[500px]" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Créer une formation</DialogTitle>
            <DialogDescription>
              Entrez les informations de base de votre nouveau cours.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      placeholder="ex: Copywriting Avancé"
                      aria-invalid={fieldState.invalid}
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
                      placeholder="Décrivez l'objectif global de la formation..."
                      className="min-h-20"
                      aria-invalid={fieldState.invalid}
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
                        <SelectTrigger id="course-level">
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
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="badge"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="course-badge">Badge commercial</FieldLabel>
                    <Input
                      {...field}
                      id="course-badge"
                      placeholder="ex: Populaire, Nouveau, Promotion"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

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
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Créer et continuer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
