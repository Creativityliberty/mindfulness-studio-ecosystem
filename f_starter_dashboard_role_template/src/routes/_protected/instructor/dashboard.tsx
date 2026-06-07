import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore } from '@/stores/courses-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Star, Sparkles, TrendingUp, Clock } from 'lucide-react'

export const Route = createFileRoute('/_protected/instructor/dashboard')({
  component: InstructorDashboardPage,
})

function InstructorDashboardPage() {
  const { user } = useAuthStore()
  const { courses, transactions } = useCoursesStore()

  const isPending = user?.status === 'en_attente'

  // Filter courses belongs to this instructor or template course
  const myCourses = React.useMemo(() => {
    if (!user || isPending) return []
    return courses.filter(
      (c) =>
        c.instructorId === String(user.id) ||
        (c.id === 'lithotherapie-cristaux' && user.role === 'instructor')
    )
  }, [courses, user, isPending])

  const myCourseIds = React.useMemo(() => myCourses.map(c => c.id), [myCourses])

  const myTransactions = React.useMemo(() => {
    return transactions.filter(t => t.courseId && myCourseIds.includes(t.courseId))
  }, [transactions, myCourseIds])

  const totalStudents = React.useMemo(() => {
    // Unique students by email
    const emails = myTransactions.map(tx => tx.studentEmail)
    return new Set(emails).size
  }, [myTransactions])

  const totalRevenue = React.useMemo(() => {
    return myTransactions.reduce((sum, tx) => sum + (tx.status === 'Reçu' ? tx.amount : 0), 0)
  }, [myTransactions])

  const avgRating = myCourses.length > 0 
    ? (myCourses.reduce((sum, c) => sum + c.rating, 0) / myCourses.length).toFixed(1) 
    : '5.0'

  if (isPending) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-amber-800 dark:text-amber-300">
              Candidature en cours : {user?.name}
            </h1>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
              Votre dossier de formateur a bien été reçu et est en cours d'examen par la direction de Bien-être Studio.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-amber-500/25 px-4 py-2 rounded-xl border border-amber-500/20">
            <Clock className="h-5 w-5 text-amber-700 dark:text-amber-300 shrink-0 animate-pulse" />
            <span className="text-sm font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wide">Validation en cours</span>
          </div>
        </div>

        <Card className="border-primary/10 shadow-lg rounded-3xl bg-card p-8 text-center max-w-2xl mx-auto space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
            <Clock className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Étude de votre profil</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fabienne Dizy Olliveaud étudie vos spécialités et validera vos privilèges d'édition d'ici 24h à 48h. Dès approbation, vous pourrez concevoir vos modules énergétiques, ajouter des vidéos, et publier vos cours sur le catalogue global.
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-2xl text-left border text-xs text-muted-foreground space-y-2">
            <div className="font-semibold text-foreground">Détails transmis :</div>
            <div><strong className="text-foreground">Spécialité :</strong> {user?.speciality || 'Non spécifiée'}</div>
            <div><strong className="text-foreground">Présentation :</strong> {user?.presentation || 'Aucune biographie rédigée.'}</div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#2f4ea8]/10 via-[#79c9db]/5 to-transparent p-6 rounded-2xl border border-primary/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent">
            Espace Enseignant : {user?.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos formations vibratoires, consultez vos inscriptions et diffusez vos enseignements énergétiques.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#2f4ea8]/10 px-4 py-2 rounded-xl border border-primary/5">
          <Sparkles className="h-5 w-5 text-primary shrink-0 animate-pulse" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">Compte Instructeur Actif</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/10 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Mes Formations</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myCourses.length}</div>
            <p className="text-xs text-muted-foreground">Créations dans votre espace</p>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Étudiants</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Inscriptions uniques</p>
          </CardContent>
        </Card>
 
        <Card className="border-primary/10 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className="h-4 w-4 text-amber-400 fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating} / 5.0</div>
            <p className="text-xs text-muted-foreground">Évaluations des apprenants</p>
          </CardContent>
        </Card>
 
        <Card className="border-primary/10 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenus Estimés</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">Ventes directes cumulées</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses management area */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Mes Programmes</h2>
        
        {myCourses.length === 0 ? (
          <Card className="border-dashed border-primary/20 p-10 text-center rounded-2xl bg-accent/5">
            <div className="max-w-md mx-auto space-y-4">
              <BookOpen className="h-12 w-12 text-primary mx-auto opacity-75" />
              <h3 className="text-lg font-semibold">Aucun cours créé</h3>
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas encore créé de formation. Utilisez les outils de création de cours pour lancer votre premier enseignement.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {myCourses.map((course) => (
              <Card key={course.id} className="flex flex-col border-primary/10 shadow-md rounded-2xl overflow-hidden bg-card">
                {course.image && (
                  <div className="h-40 w-full overflow-hidden border-b border-primary/5">
                    <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-5 flex-grow space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="rounded-md">{course.category}</Badge>
                    <Badge variant={course.status === 'publié' ? 'default' : 'secondary'} className="rounded-md">
                      {course.status === 'publié' ? 'En ligne' : 'Brouillon'}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
