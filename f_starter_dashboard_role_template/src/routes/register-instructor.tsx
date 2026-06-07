import * as React from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { GraduationCap, ArrowLeft, Mail, User, ShieldAlert, Award, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { authService } from '@/services/auth-service'

export const Route = createFileRoute('/register-instructor')({
  component: RegisterInstructorPage,
})

function RegisterInstructorPage() {
  const navigate = useNavigate()

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [speciality, setSpeciality] = React.useState('')
  const [presentation, setPresentation] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const [loading, setLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Les champs Nom, Email et Mot de passe sont obligatoires.')
      return
    }

    setLoading(true)
    try {
      const mockUser = await authService.registerInstructor({
        name,
        email,
        speciality,
        presentation,
      })

      // We save the user credentials in localStorage, leaving status as 'en_attente'
      localStorage.setItem('mock_user', JSON.stringify(mockUser))
      
      setIsSubmitted(true)
      toast.success('Dossier de candidature soumis !')
    } catch (err: any) {
      toast.error('Erreur lors de la création.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    // Directly authenticate with this user in Zustand store
    const userStr = localStorage.getItem('mock_user')
    if (userStr) {
      const user = JSON.parse(userStr)
      // Approve the user status for simulation login
      await authService.updateInstructorStatus(user.email, 'approuve')
      user.status = 'approuve'
      useAuthStore.getState().setUser(user)
      toast.success('Connexion immédiate en mode démonstration !')
      navigate({ to: '/instructor/dashboard' as any })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col justify-center items-center p-6 relative">
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Button asChild variant="ghost" className="rounded-xl">
          <Link to="/become-instructor">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            Académie Vibratoire
          </h2>
          <p className="text-sm text-muted-foreground">
            Rejoignez-nous pour enseigner et partager vos cours énergétiques.
          </p>
        </div>

        {!isSubmitted ? (
          <Card className="border-primary/10 shadow-lg rounded-3xl bg-card overflow-hidden">
            <CardHeader>
              <CardTitle className="font-bold text-xl">Dossier de candidature</CardTitle>
              <CardDescription>
                Créez votre accès formateur pour proposer vos programmes d'études.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inst-name" className="font-semibold flex items-center gap-1.5">
                      <User className="h-4 w-4 text-muted-foreground" /> Nom complet
                    </Label>
                    <Input
                      id="inst-name"
                      placeholder="Jean Dupont"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inst-email" className="font-semibold flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-muted-foreground" /> Adresse email
                    </Label>
                    <Input
                      id="inst-email"
                      type="email"
                      placeholder="jean.dupont@test.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inst-spec" className="font-semibold flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-muted-foreground" /> Spécialité / Titre
                    </Label>
                    <Input
                      id="inst-spec"
                      placeholder="ex: Praticien en Soins Énergétiques, Lithothérapeute"
                      value={speciality}
                      onChange={(e) => setSpeciality(e.target.value)}
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inst-bio">Présentez brièvement votre parcours</Label>
                    <Textarea
                      id="inst-bio"
                      placeholder="Décrivez vos années d'expérience et votre alignement avec l'académie..."
                      value={presentation}
                      onChange={(e) => setPresentation(e.target.value)}
                      className="min-h-20 rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inst-password">Mot de passe de connexion</Label>
                    <Input
                      id="inst-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-primary/5 bg-accent/5 flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md py-6 font-bold text-base transition-all"
                >
                  {loading ? 'Création du dossier...' : 'Créer mon dossier de formateur'}
                </Button>
                <div className="text-center text-xs text-muted-foreground">
                  En vous inscrivant, vous acceptez de respecter la charte éthique et énergétique de l'Académie Vibratoire.
                </div>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card className="border-primary/10 shadow-lg rounded-3xl bg-card overflow-hidden text-center p-8 space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <CardTitle className="font-bold text-2xl">Dossier reçu avec succès !</CardTitle>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Votre candidature est en cours de modération. Fabienne Dizy Olliveaud étudiera vos spécialités sous 48 heures.
              </p>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-left flex gap-3 text-amber-800 dark:text-amber-300">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm">Mode Démo Interactif</h5>
                <p className="text-xs mt-0.5 leading-relaxed">
                  Pour tester immédiatement votre nouvel espace enseignant, cliquez sur le bouton ci-dessous pour simuler l'approbation automatique par Fabienne.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleDemoLogin}
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md py-5 font-bold"
              >
                {loading ? 'Connexion...' : 'Simuler l\'approbation & Se connecter'}
              </Button>
              <Button asChild variant="outline" className="flex-1 rounded-xl py-5 font-semibold">
                <Link to="/">Retour au site</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
