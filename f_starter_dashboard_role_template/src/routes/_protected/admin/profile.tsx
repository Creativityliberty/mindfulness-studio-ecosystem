import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Mail, Shield, CheckCircle, AlertCircle, Camera, Key } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/profile')({
  component: AdminProfilePage,
})

function AdminProfilePage() {
  const { user, setUser } = useAuthStore()
  
  const [name, setName] = React.useState(user?.name || '')
  const [email, setEmail] = React.useState(user?.email || '')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [avatarUrl, setAvatarUrl] = React.useState('')
  
  const [status, setStatus] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = React.useState(false)

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
      setUser(updatedUser)
      
      setStatus({ type: 'success', message: 'Profil administrateur mis à jour avec succès !' })
      setPassword('')
      setConfirmPassword('')
    } else {
      setStatus({ type: 'error', message: 'Erreur lors de la mise à jour.' })
    }
    setLoading(false)
  }

  const mockAvatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop'
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
        setAvatarUrl(mockAvatars[2]) // default admin avatar selection
      }
    }
  }, [user])

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent dark:from-red-400 dark:to-orange-400">
          Profil Administrateur
        </h1>
        <p className="text-muted-foreground">
          Gérez vos informations de compte Super Admin et accédez aux paramètres de sécurité globale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="space-y-6">
          <Card className="border-red-500/10 shadow-md rounded-2xl overflow-hidden bg-card">
            <CardHeader className="bg-gradient-to-b from-red-500/5 to-transparent pb-4 text-center">
              <CardTitle className="text-base font-bold">Avatar Administrateur</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg rounded-full">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback className="text-2xl font-bold bg-red-500/10 text-red-500">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white h-6 w-6" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-lg">{name || 'Administrateur'}</h3>
                <span className="text-xs text-red-500 font-semibold uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded-full">
                  Super Admin
                </span>
              </div>

              <div className="w-full pt-4 border-t border-red-500/5">
                <Label className="text-xs font-semibold text-muted-foreground block mb-2 text-center">
                  Choisir une photo d'administration
                </Label>
                <div className="flex justify-center gap-2">
                  {mockAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAvatar(url)}
                      className={`h-10 w-10 rounded-full overflow-hidden border-2 transition-all ${
                        avatarUrl === url ? 'border-red-500 scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                      }`}
                    >
                      <img src={url} alt={`Avatar ${idx}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/10 shadow-sm rounded-2xl bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500" /> Droits d'Accès
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Gestion complète des cours</p>
              <p className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Approbation de formateurs</p>
              <p className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Audit financier global</p>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-red-500/10 shadow-md rounded-2xl bg-card">
            <CardHeader>
              <CardTitle className="font-bold text-xl">Paramètres du Compte</CardTitle>
              <CardDescription>
                Modifiez les accès principaux de l'administrateur principal de l'Académie Mindfulness.
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
                      placeholder="Fabienne"
                      className="rounded-xl border-red-500/10 focus-visible:ring-red-500"
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
                      placeholder="admin@test.com"
                      className="rounded-xl border-red-500/10 focus-visible:ring-red-500"
                    />
                  </div>
                </div>

                <div className="h-px bg-red-500/5 my-6" />

                <div className="flex items-center gap-2 text-foreground font-bold text-lg mb-2">
                  <Key className="h-5 w-5 text-amber-500" />
                  <h3>Changement de mot de passe administrateur</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pass">Nouveau mot de passe</Label>
                    <Input
                      id="pass"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="rounded-xl border-red-500/10 focus-visible:ring-red-500"
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
                      className="rounded-xl border-red-500/10 focus-visible:ring-red-500"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end p-6 border-t border-red-500/5 bg-accent/5">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-md px-6 py-2 transition-all"
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
