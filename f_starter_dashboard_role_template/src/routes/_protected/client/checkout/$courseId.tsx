import * as React from 'react'
import { createFileRoute, Link, useParams, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore } from '@/stores/courses-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute('/_protected/client/checkout/$courseId')({
  component: StudentCheckoutPage,
})

function StudentCheckoutPage() {
  const { courseId } = useParams({ from: '/_protected/client/checkout/$courseId' })
  const { user } = useAuthStore()
  const { courses, enrollStudent, addTransaction } = useCoursesStore()
  const navigate = useNavigate()

  const [cardName, setCardName] = React.useState(user?.name || '')
  const [cardNumber, setCardNumber] = React.useState('4242 4242 4242 4242')
  const [cardExpiry, setCardExpiry] = React.useState('12/28')
  const [cardCvc, setCardCvc] = React.useState('123')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const course = React.useMemo(() => {
    return courses.find((c) => c.id === courseId)
  }, [courses, courseId])

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

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error('Vous devez être connecté pour vous inscrire.')
      return
    }

    setIsSubmitting(true)

    // Simulate short network delay
    setTimeout(() => {
      // 1. Enroll the student
      enrollStudent(String(user.id), course.id)

      // 2. Add transaction record
      addTransaction({
        studentEmail: user.email,
        studentName: user.name,
        courseTitle: course.title,
        amount: course.price,
        status: 'Reçu',
        courseId: course.id,
      })

      setIsSubmitting(false)
      toast.success('Paiement accepté ! Vous êtes maintenant inscrit.')

      // 3. Redirect to the lesson player
      navigate({ to: `/client/player/${course.id}` })
    }, 1200)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      {/* Back link */}
      <div>
        <Button asChild variant="ghost" className="rounded-lg hover:text-primary">
          <Link to="/client/catalog/$courseId" params={{ courseId: course.id }} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Annuler et retourner
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Payment Form (Left column) */}
        <div className="md:col-span-3 space-y-6">
          <Card className="border-primary/10 shadow-md rounded-2xl overflow-hidden">
            <CardHeader className="bg-accent/5 border-b border-primary/5">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Informations de paiement simulé
              </CardTitle>
              <CardDescription>
                Saisissez des coordonnées bancaires fictives pour tester l'inscription.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="font-semibold text-foreground">
                    Titulaire de la carte
                  </Label>
                  <Input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    placeholder="Nom du titulaire"
                    className="rounded-xl border-primary/10 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="font-semibold text-foreground">
                    Numéro de carte bancaire
                  </Label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    placeholder="4242 4242 4242 4242"
                    className="rounded-xl border-primary/10 focus-visible:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry" className="font-semibold text-foreground">
                      Date d'expiration
                    </Label>
                    <Input
                      id="cardExpiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      placeholder="MM/AA"
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc" className="font-semibold text-foreground">
                      CVC / CVV
                    </Label>
                    <Input
                      id="cardCvc"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      required
                      placeholder="123"
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10 mt-4">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>
                    Test d'inscription sécurisé. Aucun débit réel ne sera effectué sur vos comptes.
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md py-6 text-base font-bold transition-all mt-6"
                >
                  {isSubmitting ? 'Validation en cours...' : `Confirmer l'inscription - ${course.price} €`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Details Panel (Right column) */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-md rounded-2xl overflow-hidden bg-card">
            <CardHeader className="border-b border-primary/5 bg-zinc-50 dark:bg-zinc-900/50">
              <CardTitle className="text-base font-bold">Récapitulatif de la commande</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="rounded-md">
                  {course.category}
                </Badge>
                <h4 className="font-extrabold text-foreground leading-snug">{course.title}</h4>
                <p className="text-xs text-muted-foreground">Formatrice : {course.instructorName}</p>
              </div>

              <div className="border-t border-primary/5 pt-4 space-y-2.5 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prix du cours</span>
                  <span>{course.price}.00 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frais administratifs</span>
                  <span>0.00 €</span>
                </div>
                <div className="border-t border-primary/10 pt-3 flex justify-between font-bold text-base">
                  <span className="text-foreground">Total à régler</span>
                  <span className="text-primary dark:text-primary">{course.price}.00 €</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
