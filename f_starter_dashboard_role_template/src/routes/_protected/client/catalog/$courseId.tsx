import * as React from 'react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore } from '@/stores/courses-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Clock,
  Star,
  ArrowLeft,
  Video,
  FileText,
  Music,
  HelpCircle,
  Shield,
  Layers,
  Play,
} from 'lucide-react'

export const Route = createFileRoute('/_protected/client/catalog/$courseId')({
  component: StudentCourseDetailPage,
})

function StudentCourseDetailPage() {
  const { courseId } = useParams({ from: '/_protected/client/catalog/$courseId' })
  const { user } = useAuthStore()
  const { courses, enrollments } = useCoursesStore()

  const course = React.useMemo(() => {
    return courses.find((c) => c.id === courseId)
  }, [courses, courseId])

  const isEnrolled = React.useMemo(() => {
    if (!user || !course) return false
    return enrollments.some((e) => e.studentId === String(user.id) && e.courseId === course.id)
  }, [enrollments, user, course])

  if (!course) {
    return (
      <div className="container mx-auto p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold">Formation introuvable</h2>
        <p className="text-muted-foreground">Ce cours n'existe pas ou a été retiré.</p>
        <Button asChild>
          <Link to="/client/catalog">Retourner au catalogue</Link>
        </Button>
      </div>
    )
  }

  // Count total lessons
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)

  const LessonIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-primary mr-2 shrink-0" />
      case 'pdf':
        return <FileText className="h-4 w-4 text-sky-600 mr-2 shrink-0" />
      case 'audio':
        return <Music className="h-4 w-4 text-emerald-600 mr-2 shrink-0" />
      default:
        return <FileText className="h-4 w-4 text-amber-600 mr-2 shrink-0" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Back button */}
      <div>
        <Button asChild variant="ghost" className="rounded-lg hover:text-primary">
          <Link to="/client/catalog" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retourner au catalogue
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Program */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-md">
                {course.category}
              </Badge>
              <Badge variant="outline" className="rounded-md">
                {course.level}
              </Badge>
              {course.badge && (
                <Badge className="bg-emerald-100 text-emerald-800 border-none rounded-md">
                  {course.badge}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Instructor Bio */}
          <Card className="border-primary/10 shadow-sm rounded-2xl overflow-hidden bg-gradient-to-r from-[#2f4ea8]/5 to-transparent">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">Votre Formatrice</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-primary text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg shrink-0">
                FD
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-foreground">{course.instructorName}</h4>
                <p className="text-xs text-primary font-semibold">{course.instructorTitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fabienne vous accompagne avec bienveillance, cœur, et dans le respect de votre rythme. Ses formations et ateliers sont nés de son propre chemin de guérison et de transmission pour vous reconnecter à votre potentiel intuitif et spirituel.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Curriculum */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-primary/10 pb-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Programme de la formation
              </h2>
              <span className="text-xs text-muted-foreground font-semibold">
                {course.modules.length} modules • {totalLessons} leçons
              </span>
            </div>

            {course.modules.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border border-dashed border-primary/10 rounded-2xl">
                Le syllabus de ce cours est en cours d'écriture par Fabienne.
              </div>
            ) : (
              <div className="space-y-4">
                {course.modules.map((mod) => (
                  <Card key={mod.id} className="border-primary/10 shadow-sm rounded-xl">
                    <CardHeader className="py-4 bg-accent/5">
                      <CardTitle className="text-base font-bold flex items-center gap-2">
                        <Layers className="h-4.5 w-4.5 text-primary" />
                        {mod.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 border-t border-primary/5">
                      {mod.lessons.length === 0 ? (
                        <div className="p-4 text-xs text-muted-foreground">Aucune leçon dans ce module.</div>
                      ) : (
                        <div className="divide-y divide-teal-500/5">
                          {mod.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-4 flex items-center justify-between text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                            >
                              <div className="flex items-center min-w-0">
                                <LessonIcon type={lesson.type} />
                                <span className="font-medium truncate text-foreground">
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0 ml-4">
                                <span className="text-xs uppercase text-muted-foreground font-semibold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                                  {lesson.type}
                                </span>
                                {lesson.quiz && (
                                  <Badge variant="outline" className="text-xs border-primary/20 text-primary dark:text-primary">
                                    <HelpCircle className="h-3 w-3 mr-1" /> Quiz
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Inscription Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-6 border-primary/15 shadow-lg rounded-2xl overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[#2f4ea8] to-[#79c9db]" />
            {course.image && (
              <div className="h-48 w-full overflow-hidden border-b border-primary/5">
                <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
              </div>
            )}
            <CardHeader className="pb-3 text-center">
              <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Tarif unique</span>
              <div className="text-4xl font-black text-primary dark:text-primary mt-1">
                {course.price} €
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
              {/* Core Features Info */}
              <div className="space-y-3.5 pt-2 border-t border-primary/5">
                <div className="flex items-center text-sm font-medium">
                  <Clock className="h-4.5 w-4.5 text-primary mr-3" />
                  <span>Durée : {course.duration}</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <BookOpen className="h-4.5 w-4.5 text-primary mr-3" />
                  <span>Contenu : {totalLessons} leçons interactives</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Star className="h-4.5 w-4.5 text-primary mr-3" />
                  <span>Niveau recommandé : {course.level}</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Shield className="h-4.5 w-4.5 text-primary mr-3" />
                  <span>Accès à vie 7j/7, 24h/24</span>
                </div>
              </div>

              {/* Purchase Trigger */}
              {isEnrolled ? (
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md py-6 text-base font-bold">
                  <Link to="/client/player/$courseId" params={{ courseId: course.id }}>
                    <Play className="mr-2 h-5 w-5 fill-current" /> Suivre la formation
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md py-6 text-base font-bold">
                  <Link to="/client/checkout/$courseId" params={{ courseId: course.id }}>
                    S'inscrire maintenant
                  </Link>
                </Button>
              )}

              <p className="text-center text-xs text-muted-foreground">
                Paiement et inscription 100% sécurisés.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
