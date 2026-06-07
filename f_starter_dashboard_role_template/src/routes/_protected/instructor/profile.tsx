import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Mail, CheckCircle, AlertCircle, Camera, Award, BookOpen } from 'lucide-react'

export const Route = createFileRoute('/_protected/instructor/profile')({
  component: InstructorProfilePage,
})

function InstructorProfilePage() {
  const { user, setUser } = useAuthStore()
  
  const [name, setName] = React.useState(user?.name || '')
  const [email, setEmail] = React.useState(user?.email || '')
  const [specialty, setSpecialty] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [avatarUrl, setAvatarUrl] = React.useState('')
  
  const [status, setStatus] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      
      // Load saved bio and specialty if present
      const savedSpecialty = localStorage.getItem(`instructor_specialty_${user.id}`)
      const savedBio = localStorage.getItem(`instructor_bio_${user.id}`)
      if (savedSpecialty) setSpecialty(savedSpecialty)
      if (savedBio) setBio(savedBio)
    }
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)

    if (!name.trim() || !email.trim()) {
      setStatus({ type: 'error', message: "Le nom et l'adresse email sont requis." })
      return
    }

    if (password && password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Les mots de passe ne correspondent pas.' })
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (user) {
      const updatedUser = {
        ...user,
        name,
        email,
        updated_at: new Date().toISOString(),
      }

      localStorage.setItem('mock_user', JSON.stringify(updatedUser))
      localStorage.setItem(`instructor_specialty_${user.id}`, specialty)
      localStorage.setItem(`instructor_bio_${user.id}`, bio)
      setUser(updatedUser)
      
      setStatus({ type: 'success', message: 'Profil formateur mis à jour avec succès !' })
      setPassword('')
      setConfirmPassword('')
    } else {
      setStatus({ type: 'error', message: 'Erreur lors de la mise à jour.' })
    }
    setLoading(false)
  }

  const mockAvatars = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop'
  ]

  const selectAvatar = (url: string) => {
    setAvatarUrl(url)
    if (user) {
      localStorage.setItem(`avatar_${user.id}`, url)
      setStatus({ type: 'success', message: 'Avatar sélectionné !' })
    }
  }

  React.useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`avatar_${user.id}`)
      if (saved) {
        setAvatarUrl(saved)
      } else {
        setAvatarUrl(mockAvatars[0])
      }
    }
  }, [user])

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
          Profil Formateur
        </h1>
        <p className="text-muted-foreground">
          Gérez votre biographie publique, vos spécialités d'enseignement et vos accès instructeur.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Quick Info */}
        <div className="space-y-6">
          <Card className="border-indigo-500/10 shadow-md rounded-2xl overflow-hidden bg-card">
            <CardHeader className="bg-gradient-to-b from-indigo-500/5 to-transparent pb-4 text-center">
              <CardTitle className="text-base font-bold">Avatar Instructeur</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg rounded-full">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback className="text-2xl font-bold bg-indigo-500/10 text-indigo-500">
                    FR
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white h-6 w-6" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-lg">{name || 'Formateur'}</h3>
                <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  Formateur Agréé
                </span>
              </div>

              <div className="w-full pt-4 border-t border-indigo-500/5">
                <Label className="text-xs font-semibold text-muted-foreground block mb-2 text-center">
                  Choisir un avatar instructeur
                </Label>
                <div className="flex justify-center gap-2">
                  {mockAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAvatar(url)}
                      className={`h-10 w-10 rounded-full overflow-hidden border-2 transition-all ${
                        avatarUrl === url ? 'border-indigo-500 scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                      }`}
                    >
                      <img src={url} alt={`Avatar ${idx}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/10 shadow-sm rounded-2xl bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Award className="h-4 w-4 text-indigo-500" /> Certification
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>• Statut de publication : Actif</p>
              <p>• Rémunération : 70% par vente</p>
              <p>• Vérifié par l'administration</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Profile Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-indigo-500/10 shadow-md rounded-2xl bg-card">
            <CardHeader>
              <CardTitle className="font-bold text-xl">Informations Publiques & Compte</CardTitle>
              <CardDescription>
                Mettez à jour votre biographie et votre spécialité. Ces éléments sont visibles par vos étudiants sur la vitrine.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSave}>
              <CardContent className="space-y-4">
                {status && (
                  <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                    status.type === 'success' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-destructive/10 border-destructive/20 text-destructive'
                  }`}>
                    {status.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm font-medium">{status.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-1.5 font-semibold">
                      <User className="h-4 w-4 text-muted-foreground" /> Nom complet
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean-Marc"
                      className="rounded-xl border-indigo-500/10 focus-visible:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1.5 font-semibold">
                      <Mail className="h-4 w-4 text-muted-foreground" /> Adresse email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="formateur@test.com"
                      className="rounded-xl border-indigo-500/10 focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty" className="flex items-center gap-1.5 font-semibold">
                    <Award className="h-4 w-4 text-muted-foreground" /> Spécialité / Expertise
                  </Label>
                  <Input
                    id="specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="Méditation Pleine Conscience, Yoga Sonore, Sonothérapie"
                    className="rounded-xl border-indigo-500/10 focus-visible:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="flex items-center gap-1.5 font-semibold">
                    <BookOpen className="h-4 w-4 text-muted-foreground" /> Biographie publique
                  </Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Partagez votre parcours et votre philosophie d'enseignement avec vos futurs élèves..."
                    rows={4}
                    className="rounded-xl border-indigo-500/10 focus-visible:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="h-px bg-indigo-500/5 my-6" />

                <h3 className="font-bold text-lg">Changement de mot de passe</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pass">Nouveau mot de passe</Label>
                    <Input
                      id="pass"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="rounded-xl border-indigo-500/10 focus-visible:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPass">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPass"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="rounded-xl border-indigo-500/10 focus-visible:ring-indigo-500"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end p-6 border-t border-indigo-500/5 bg-accent/5">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md px-6 py-2 transition-all"
                >
                  {loading ? 'Enregistrement...' : 'Sauvegarder les modifications'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
