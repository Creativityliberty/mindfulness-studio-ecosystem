import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore } from '@/stores/courses-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Eye, Download, Calendar, ShieldCheck } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export const Route = createFileRoute('/_protected/client/certificates')({
  component: StudentCertificatesPage,
})

function StudentCertificatesPage() {
  const { user } = useAuthStore()
  const { courses, enrollments } = useCoursesStore()
  const [selectedCert, setSelectedCert] = React.useState<any>(null)

  // Find all completed courses (progress === 100) for the current student
  const completedCourses = React.useMemo(() => {
    if (!user) return []
    const studentEnrollments = enrollments.filter((e) => e.studentId === String(user.id) && e.progress === 100)
    return studentEnrollments.map((e) => {
      const course = courses.find((c) => c.id === e.courseId)
      return {
        ...course,
        completionDate: e.lastAccessed,
        enrollmentId: e.id,
      }
    }).filter((c) => c.id !== undefined)
  }, [enrollments, courses, user])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
          Mes Certificats de Réussite
        </h1>
        <p className="text-muted-foreground">
          Retrouvez tous vos diplômes obtenus après avoir complété vos formations à 100%.
        </p>
      </div>

      {completedCourses.length === 0 ? (
        <Card className="border-dashed border-primary/20 p-12 text-center rounded-2xl bg-accent/10">
          <div className="max-w-md mx-auto space-y-4">
            <Award className="h-16 w-16 text-primary/70 mx-auto" />
            <h3 className="text-lg font-bold">Aucun certificat débloqué</h3>
            <p className="text-sm text-muted-foreground">
              Terminez vos formations en cours à 100% (leçons lues et quiz validés) pour obtenir vos diplômes certifiés.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl">
              <Link to="/client/dashboard">Continuer mes formations</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedCourses.map((cert: any) => (
            <Card key={cert.id} className="flex flex-col border-primary/10 shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden">
              <CardHeader className="bg-accent/5 border-b border-primary/5 p-5">
                <Award className="h-10 w-10 text-primary" />
                <CardTitle className="text-lg font-bold leading-tight mt-2 line-clamp-1">
                  {cert.title}
                </CardTitle>
                <CardDescription>
                  Obtenu le : {new Date(cert.completionDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex-1 space-y-2.5">
                <div className="text-sm">
                  <span className="font-semibold text-muted-foreground">Formatrice :</span> {cert.instructorName}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-muted-foreground">Catégorie :</span> {cert.category}
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex gap-2">
                <Button
                  onClick={() => setSelectedCert(cert)}
                  variant="outline"
                  className="flex-1 rounded-xl border-primary/10 hover:border-teal-500"
                >
                  <Eye className="mr-1.5 h-4 w-4" /> Voir le diplôme
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Diploma view Modal */}
      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent className="max-w-3xl rounded-3xl p-6 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center font-bold">Aperçu du Certificat</DialogTitle>
          </DialogHeader>

          {selectedCert && (
            <div className="space-y-6">
              {/* Diploma Card design */}
              <div id="print-area" className="border-[12px] border-teal-600/30 p-8 rounded-2xl text-center space-y-6 bg-amber-50/20 dark:bg-zinc-950/20 relative shadow-inner">
                {/* Decorative frames */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-teal-600/15 pointer-events-none" />

                <div className="space-y-2">
                  <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                    Certificat de Réussite
                  </span>
                  <div className="h-px w-24 bg-primary/30 mx-auto my-2" />
                </div>

                <div className="space-y-4">
                  <p className="text-sm italic text-muted-foreground">Le présent certificat est décerné à</p>
                  <h2 className="text-3xl font-serif font-black text-primary dark:text-primary tracking-wide">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    pour avoir accompli avec succès la totalité de l'enseignement et validé l'ensemble des évaluations requises pour la formation professionnelle :
                  </p>
                  <h3 className="text-xl font-bold text-foreground tracking-tight leading-snug">
                    {selectedCert.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-primary/10 max-w-md mx-auto">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Date d'obtention</span>
                    <p className="text-xs font-semibold flex items-center justify-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {new Date(selectedCert.completionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Directrice de l'Académie</span>
                    <p className="text-xs font-serif italic font-bold text-primary dark:text-primary">
                      Fabienne Dizy Olliveaud
                    </p>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-1.5 text-[10px] text-muted-foreground pt-4">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Académie Vibratoire - Certificat n° {selectedCert.enrollmentId}
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                  <Download className="mr-1.5 h-4 w-4" /> Imprimer le diplôme
                </Button>
                <Button variant="outline" onClick={() => setSelectedCert(null)} className="rounded-xl">
                  Fermer
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
