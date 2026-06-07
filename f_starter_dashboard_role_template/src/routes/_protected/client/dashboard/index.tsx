import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore } from '@/stores/courses-store'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Award, CheckCircle2, Play, Sparkles, BookOpenCheck } from 'lucide-react'

export const Route = createFileRoute('/_protected/client/dashboard/')({
  component: StudentDashboardPage,
})

function StudentDashboardPage() {
  const { user } = useAuthStore()
  const { courses, enrollments } = useCoursesStore()

  // Get student's enrollments (based on studentId = user.id)
  const studentEnrollments = React.useMemo(() => {
    if (!user) return []
    // Match by studentId (as string since user.id is number, we convert it)
    return enrollments.filter((e) => e.studentId === String(user.id))
  }, [enrollments, user])

  // Resolve courses details
  const myCourses = React.useMemo(() => {
    return studentEnrollments.map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId)
      return {
        ...course,
        progress: enrollment.progress,
        completedCount: enrollment.completedLessons.length,
      }
    }).filter((c) => c.id !== undefined) // filter out deleted/invalid courses
  }, [studentEnrollments, courses])

  // Stats calculation
  const totalEnrolled = myCourses.length
  const totalCompleted = myCourses.filter((c) => c.progress === 100).length
  const avgProgress = totalEnrolled > 0
    ? Math.round(myCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / totalEnrolled)
    : 0
  const totalLessonsDone = myCourses.reduce((sum, c) => sum + (c.completedCount || 0), 0)

  // Recommended courses (not enrolled yet)
  const recommendedCourses = React.useMemo(() => {
    return courses
      .filter((c) => c.status === 'publié' && !studentEnrollments.some((e) => e.courseId === c.id))
      .slice(0, 3)
  }, [courses, studentEnrollments])

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#79c9db]/10 via-[#2f4ea8]/5 to-transparent p-6 rounded-2xl border border-primary/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
            Bonjour, {user?.name || 'Étudiant'} !
          </h1>
          <p className="text-muted-foreground mt-1">
            Ravi de vous retrouver sur votre espace de transformation et d'apprentissage vibratoire.
          </p>
        </div>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition-all">
          <Link to="/client/catalog">
            <Sparkles className="mr-2 h-5 w-5" /> Explorer le catalogue
          </Link>
        </Button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/10 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cours suivis</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnrolled}</div>
            <p className="text-xs text-muted-foreground">Inscriptions actives</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progression moyenne</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress}%</div>
            <div className="mt-2">
              <Progress value={avgProgress} className="h-1.5 bg-teal-100 dark:bg-zinc-800" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leçons validées</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLessonsDone}</div>
            <p className="text-xs text-muted-foreground">Toutes formations confondues</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificats obtenus</CardTitle>
            <Award className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompleted}</div>
            <p className="text-xs text-muted-foreground">Téléchargeables</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Student Courses */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Mes formations en cours</h2>

        {myCourses.length === 0 ? (
          <Card className="border-dashed border-primary/20 p-10 text-center rounded-2xl bg-accent/10">
            <div className="max-w-md mx-auto space-y-4">
              <BookOpen className="h-12 w-12 text-primary mx-auto opacity-75" />
              <h3 className="text-lg font-semibold">Aucune formation en cours</h3>
              <p className="text-sm text-muted-foreground">
                Vous n'êtes inscrit à aucune formation pour le moment. Explorez notre catalogue pour commencer votre apprentissage.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                <Link to="/client/catalog">Découvrir les cours</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course: any) => (
              <Card key={course.id} className="flex flex-col border-primary/10 shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden bg-card">
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
                    <Badge className="bg-[#2f4ea8]/10 text-primary border-none rounded-md px-2.5 py-0.5">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="rounded-md">
                      {course.level}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg line-clamp-1 text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground font-medium">
                      <span>Progression</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 bg-teal-100 dark:bg-zinc-800" />
                  </div>
                </div>
                <CardFooter className="p-5 pt-0 border-t border-primary/5 bg-accent/5">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-2 flex items-center justify-center transition-all">
                    <Link to="/client/player/$courseId" params={{ courseId: course.id }}>
                      <Play className="mr-2 h-4 w-4 fill-current" />
                      {course.progress === 0
                        ? 'Commencer'
                        : course.progress === 100
                        ? 'Revoir'
                        : 'Continuer'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Section */}
      {recommendedCourses.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Recommandé pour vous</h2>
            <Link to="/client/catalog" className="text-primary dark:text-primary font-medium hover:underline text-sm">
              Tout afficher
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="flex flex-col border-primary/10 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
                {course.image ? (
                  <div className="h-40 w-full overflow-hidden border-b border-primary/5">
                    <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="h-24 w-full bg-gradient-to-br from-[#2f4ea8]/5 to-[#79c9db]/5 flex items-center justify-center border-b border-primary/5">
                    <BookOpen className="h-8 w-8 text-primary/30" />
                  </div>
                )}
                <div className="p-5 flex-1 space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="rounded-md">
                      {course.category}
                    </Badge>
                    <span className="text-primary dark:text-primary font-bold">{course.price} €</span>
                  </div>
                  <h3 className="font-bold text-base line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
                </div>
                <CardFooter className="p-5 pt-0">
                  <Button asChild variant="outline" className="w-full border-primary/20 hover:border-teal-500 hover:bg-accent/10/50 dark:hover:bg-teal-950/20 rounded-xl">
                    <Link to="/client/catalog/$courseId" params={{ courseId: course.id }}>
                      En savoir plus
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
