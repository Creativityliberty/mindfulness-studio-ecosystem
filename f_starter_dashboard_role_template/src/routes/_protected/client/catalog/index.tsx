import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore, type Course } from '@/stores/courses-store'
import { Card as UICard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, BookOpen, Clock, Star, Play, Sparkles, Zap, Activity, Sprout, Palette } from 'lucide-react'

export const Route = createFileRoute('/_protected/client/catalog/')({
  component: StudentCatalogPage,
})

function StudentCatalogPage() {
  const { user } = useAuthStore()
  const { courses, enrollments } = useCoursesStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [levelFilter, setLevelFilter] = React.useState<string>('all')

  const studentEnrollments = React.useMemo(() => {
    if (!user) return []
    return enrollments.filter((e) => e.studentId === String(user.id))
  }, [enrollments, user])

  const publishedCourses = React.useMemo(() => {
    return courses.filter((c) => c.status === 'publié')
  }, [courses])

  // Filter courses by search and level
  const filterCoursesList = (category: string) => {
    return publishedCourses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter
      const matchesCategory = category === 'all' || course.category === category
      return matchesSearch && matchesLevel && matchesCategory
    })
  }

  const categories: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'all', label: 'Toutes les formations', icon: Sparkles },
    { id: 'Initiations Énergétiques', label: 'Initiations Énergétiques', icon: Zap },
    { id: 'Équilibrage des Chakras', label: 'Équilibrage des Chakras', icon: Activity },
    { id: 'Élixirs & Remèdes', label: 'Élixirs & Remèdes', icon: Sprout },
    { id: 'Créativité & Rituels', label: 'Créativité & Rituels', icon: Palette },
  ]

  const CourseCard = ({ course }: { course: Course }) => {
    const isEnrolled = studentEnrollments.some((e) => e.courseId === course.id)

    return (
      <UICard className="flex flex-col border-primary/10 shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden bg-card">
        {course.image ? (
          <div className="h-44 w-full overflow-hidden border-b border-primary/5">
            <img src={course.image} alt={course.title} className="h-full w-full object-cover transition-transform hover:scale-105 duration-300" />
          </div>
        ) : (
          <div className="h-32 w-full bg-gradient-to-br from-[#2f4ea8]/10 to-[#79c9db]/10 flex items-center justify-center border-b border-primary/5">
            <BookOpen className="h-10 w-10 text-primary/40" />
          </div>
        )}
        <div className="p-5 flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="rounded-md">
              {course.category}
            </Badge>
            <Badge variant="outline" className="rounded-md">
              {course.level}
            </Badge>
          </div>
          <div>
            <h3 className="font-bold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors h-14">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mt-2 h-15">
              {course.description}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium pt-2">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 mr-1 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="p-5 pt-0 border-t border-primary/5 bg-accent/5 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Tarif</span>
            <span className="text-xl font-extrabold text-primary dark:text-primary">
              {course.price} €
            </span>
          </div>

          <Button asChild className="rounded-xl px-4 py-2 font-semibold shadow-sm transition-all bg-primary hover:bg-primary/90 text-white">
            {isEnrolled ? (
              <Link to="/client/player/$courseId" params={{ courseId: course.id }}>
                <Play className="mr-1.5 h-4 w-4 fill-current" /> Suivre
              </Link>
            ) : (
              <Link to="/client/catalog/$courseId" params={{ courseId: course.id }}>
                <BookOpen className="mr-1.5 h-4 w-4" /> Détails
              </Link>
            )}
          </Button>
        </div>
      </UICard>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
          Catalogue des Formations
        </h1>
        <p className="text-muted-foreground">
          Découvrez nos initiations vibratoires, ateliers de création d'élixirs et parcours d'équilibrage énergétique guidés par Fabienne.
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-accent/10 border border-primary/10 p-4 rounded-2xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
          <Input
            placeholder="Rechercher une formation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-primary/10 focus-visible:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-sm font-medium text-muted-foreground hidden md:inline">Niveau :</span>
          <div className="flex gap-1.5">
            {['all', 'Débutant', 'Intermédiaire', 'Avancé'].map((level) => (
              <Button
                key={level}
                variant={levelFilter === level ? 'default' : 'outline'}
                onClick={() => setLevelFilter(level)}
                size="sm"
                className="rounded-lg text-xs"
              >
                {level === 'all' ? 'Tous' : level}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto bg-transparent gap-2 p-0 border-b border-primary/10 pb-2 overflow-x-auto justify-start">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="rounded-lg border border-primary/10 px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center"
            >
              <cat.icon className="mr-1.5 h-4 w-4 shrink-0" />
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => {
          const list = filterCoursesList(cat.id)
          return (
            <TabsContent key={cat.id} value={cat.id} className="space-y-4 outline-none">
              {list.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-primary/10">
                  Aucune formation ne correspond à vos critères pour le moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
