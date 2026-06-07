import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Mail, Shield, CheckCircle, AlertCircle, Camera } from 'lucide-react'

export const Route = createFileRoute('/_protected/client/profile')({
  component: StudentProfilePage,
})

function StudentProfilePage() {
  const { user, setUser } = useAuthStore()
  
  const [name, setName] = React.useState(user?.name || '')
  const [email, setEmail] = React.useState(user?.email || '')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [avatarUrl, setAvatarUrl] = React.useState('')
  
  const [status, setStatus] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = React.useState(false)

  // Prepopulate if user details change
  React.useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)

    if (!name.trim() || !email.trim()) {
      setStatus({ type: 'error', message: 'Le nom et l\'adresse email sont requis.' })
      return
    }

    if (password && password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Les mots de passe ne correspondent pas.' })
      return
    }

    setLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (user) {
      const updatedUser = {
        ...user,
        name,
        email,
        updated_at: new Date().toISOString(),
      }

      // Save to localStorage for mock persistent session
      localStorage.setItem('mock_user', JSON.stringify(updatedUser))
      // Update state in Zustand
      setUser(updatedUser)
      
      setStatus({ type: 'success', message: 'Profil mis à jour avec succès !' })
      setPassword('')
      setConfirmPassword('')
    } else {
      setStatus({ type: 'error', message: 'Erreur lors de la mise à jour.' })
    }
    setLoading(false)
  }

  // Pre-configured mock avatars
  const mockAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop'
  ]

  const selectAvatar = (url: string) => {
    setAvatarUrl(url)
    if (user) {
      // Save avatar to localStorage simulation
      const key = `avatar_${user.id}`
      localStorage.setItem(key, url)
      setStatus({ type: 'success', message: 'Avatar sélectionné !' })
    }
  }

  // Retrieve saved avatar on mount
  React.useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`avatar_${user.id}`)
      if (saved) {
        setAvatarUrl(saved)
      }
    }
  }, [user])

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
          Mon Profil & Paramètres
        </h1>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles, votre avatar et configurez la sécurité de votre compte étudiant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar Card */}
        <div className="space-y-6">
          <Card className="border-primary/10 shadow-md rounded-2xl overflow-hidden bg-card">
            <CardHeader className="bg-gradient-to-b from-[#2f4ea8]/5 to-transparent pb-4 text-center">
              <CardTitle className="text-base font-bold">Votre Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg rounded-full">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback className="text-2xl font-bold bg-[#2f4ea8]/10 text-primary">
                    {name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white h-6 w-6" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-lg">{name || 'Utilisateur'}</h3>
                <span className="text-xs text-primary font-semibold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">
                  {user?.role === 'client' ? 'Compte Étudiant' : 'Administrateur'}
                </span>
              </div>

              <div className="w-full pt-4 border-t border-primary/5">
                <Label className="text-xs font-semibold text-muted-foreground block mb-2 text-center">
                  Choisir un avatar de démonstration
                </Label>
                <div className="flex justify-center gap-2">
                  {mockAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAvatar(url)}
                      className={`h-10 w-10 rounded-full overflow-hidden border-2 transition-all ${
                        avatarUrl === url ? 'border-primary scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                      }`}
                    >
                      <img src={url} alt={`Avatar ${idx}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm rounded-2xl bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>• Votre mot de passe doit faire au moins 8 caractères.</p>
              <p>• Ne partagez jamais vos accès de formation vibratoire.</p>
              <p>• Dernière connexion : Aujourd'hui.</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Form details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-md rounded-2xl bg-card">
            <CardHeader>
              <CardTitle className="font-bold text-xl">Informations Personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos coordonnées. Ces données servent à l'édition automatique de vos certificats de réussite.
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

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-1.5 font-semibold">
                      <User className="h-4 w-4 text-muted-foreground" /> Nom Complet
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1.5 font-semibold">
                      <Mail className="h-4 w-4 text-muted-foreground" /> Adresse Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@test.com"
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="h-px bg-primary/5 my-6" />

                <h3 className="font-bold text-lg">Changement de mot de passe</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Laissez ces champs vides si vous ne souhaitez pas modifier votre mot de passe actuel.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pass">Nouveau mot de passe</Label>
                    <Input
                      id="pass"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
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
                      className="rounded-xl border-primary/10 focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end p-6 border-t border-primary/5 bg-accent/5">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md px-6 py-2 transition-all"
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
