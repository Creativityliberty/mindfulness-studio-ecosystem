import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { authService } from '@/services/auth-service'
import type { User } from '@/types/user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Search, Award, Clock, Check, Ban, Eye, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/instructors')({
  component: AdminInstructorsPage,
})

function AdminInstructorsPage() {
  const [instructors, setInstructors] = React.useState<User[]>([])
  const [search, setSearch] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [selectedInstructor, setSelectedInstructor] = React.useState<User | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)

  const loadInstructors = React.useCallback(async () => {
    setLoading(true)
    try {
      const data = await authService.getInstructors()
      setInstructors(data)
    } catch (err) {
      toast.error('Impossible de charger les formateurs.')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadInstructors()
  }, [loadInstructors])

  const handleUpdateStatus = async (email: string, newStatus: 'en_attente' | 'approuve' | 'suspendu') => {
    try {
      await authService.updateInstructorStatus(email, newStatus)
      toast.success(
        newStatus === 'approuve' 
          ? 'Compte formateur approuvé avec succès.' 
          : newStatus === 'suspendu'
          ? 'Compte formateur mis en pause.'
          : 'Compte remis en attente.'
      )
      loadInstructors()
      if (selectedInstructor && selectedInstructor.email === email) {
        setSelectedInstructor(prev => prev ? { ...prev, status: newStatus } : null)
      }
    } catch (err) {
      toast.error('Erreur lors de la mise à jour du statut.')
    }
  }

  const handleDeleteInstructor = async (email: string) => {
    if (confirm('Voulez-vous vraiment supprimer définitivement ce compte formateur ?')) {
      try {
        await authService.deleteInstructor(email)
        toast.success('Le compte formateur a été supprimé.')
        loadInstructors()
      } catch (err) {
        toast.error('Erreur lors de la suppression.')
      }
    }
  }

  const filteredInstructors = instructors.filter(inst => {
    const term = search.toLowerCase()
    return (
      inst.name.toLowerCase().includes(term) ||
      inst.email.toLowerCase().includes(term) ||
      (inst.speciality || '').toLowerCase().includes(term)
    )
  })

  const stats = React.useMemo(() => {
    const total = instructors.length
    const pending = instructors.filter(i => i.status === 'en_attente' || !i.status).length
    const approved = instructors.filter(i => i.status === 'approuve').length
    const suspended = instructors.filter(i => i.status === 'suspendu').length
    return { total, pending, approved, suspended }
  }, [instructors])

  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case 'approuve':
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:bg-emerald-50 rounded-full font-semibold px-2.5 py-0.5">
            <Check className="h-3.5 w-3.5 mr-1" /> Actif
          </Badge>
        )
      case 'suspendu':
        return (
          <Badge className="bg-rose-50 text-rose-700 border border-rose-200/50 hover:bg-rose-50 rounded-full font-semibold px-2.5 py-0.5">
            <Ban className="h-3.5 w-3.5 mr-1" /> Suspendu
          </Badge>
        )
      case 'en_attente':
      default:
        return (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200/50 hover:bg-amber-50 rounded-full font-semibold px-2.5 py-0.5">
            <Clock className="h-3.5 w-3.5 mr-1" /> En attente
          </Badge>
        )
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Award className="h-8 w-8 text-primary" /> Modération des Formateurs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez les candidatures d'instructeurs et modérez leur statut d'enseignement pour Bien-être Studio.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/5 shadow-sm rounded-2xl bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-muted-foreground">Total Enseignants</CardDescription>
            <CardTitle className="text-2xl font-black">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-amber-500/10 shadow-sm rounded-2xl bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-amber-600 dark:text-amber-400">En attente</CardDescription>
            <CardTitle className="text-2xl font-black text-amber-600 dark:text-amber-400">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-emerald-500/10 shadow-sm rounded-2xl bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-emerald-600 dark:text-emerald-400">Actifs</CardDescription>
            <CardTitle className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.approved}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-rose-500/10 shadow-sm rounded-2xl bg-card">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-rose-600 dark:text-rose-400">Suspendus</CardDescription>
            <CardTitle className="text-2xl font-black text-rose-600 dark:text-rose-400">{stats.suspended}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-primary/5 shadow-md rounded-3xl overflow-hidden bg-card">
        <CardHeader className="pb-3 border-b border-primary/5 bg-accent/5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="font-bold text-lg">Candidats & Formateurs</CardTitle>
              <CardDescription>Consultez les biographies et gérez les permissions de cours.</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email, titre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl border-primary/10 focus-visible:ring-primary bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">Chargement des formateurs...</div>
          ) : filteredInstructors.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">Aucun formateur trouvé.</div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="font-semibold text-foreground">Nom / Contact</TableHead>
                  <TableHead className="font-semibold text-foreground">Spécialité</TableHead>
                  <TableHead className="font-semibold text-foreground">Statut</TableHead>
                  <TableHead className="font-semibold text-foreground">Date d'inscription</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstructors.map((inst) => (
                  <TableRow key={inst.email} className="hover:bg-muted/10 transition-colors">
                    <TableCell>
                      <div className="font-bold text-foreground">{inst.name}</div>
                      <div className="text-xs text-muted-foreground">{inst.email}</div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {inst.speciality || <span className="text-xs text-muted-foreground italic">Non spécifiée</span>}
                    </TableCell>
                    <TableCell>{renderStatusBadge(inst.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(inst.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg"
                          onClick={() => {
                            setSelectedInstructor(inst)
                            setIsDetailsOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        {inst.status !== 'approuve' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-lg border-emerald-200 hover:bg-emerald-50 text-emerald-700 font-semibold"
                            onClick={() => handleUpdateStatus(inst.email, 'approuve')}
                          >
                            Approuver
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-lg border-rose-200 hover:bg-rose-50 text-rose-700 font-semibold"
                            onClick={() => handleUpdateStatus(inst.email, 'suspendu')}
                          >
                            Suspendre
                          </Button>
                        )}

                        {inst.email !== 'instructor@test.com' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                            onClick={() => handleDeleteInstructor(inst.email)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Details/Moderation Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              Profil Formateur : {selectedInstructor?.name}
            </DialogTitle>
            <DialogDescription>
              Informations détaillées transmises lors du dossier d'inscription.
            </DialogDescription>
          </DialogHeader>

          {selectedInstructor && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-xs text-muted-foreground font-semibold uppercase">Email</span>
                  <span className="font-medium text-foreground">{selectedInstructor.email}</span>
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground font-semibold uppercase">Statut actuel</span>
                  <span className="mt-1 block">{renderStatusBadge(selectedInstructor.status)}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs text-muted-foreground font-semibold uppercase mb-1">Spécialité</span>
                <div className="p-3 bg-muted/30 rounded-xl font-semibold text-foreground border border-muted-foreground/5">
                  {selectedInstructor.speciality || 'Non spécifiée'}
                </div>
              </div>

              <div>
                <span className="block text-xs text-muted-foreground font-semibold uppercase mb-1">Présentation</span>
                <div className="p-4 bg-muted/30 rounded-xl text-sm leading-relaxed text-foreground border border-muted-foreground/5 max-h-48 overflow-y-auto whitespace-pre-line">
                  {selectedInstructor.presentation || 'Aucune biographie rédigée.'}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            {selectedInstructor && selectedInstructor.status !== 'approuve' && (
              <Button
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold"
                onClick={() => {
                  handleUpdateStatus(selectedInstructor.email, 'approuve')
                  setIsDetailsOpen(false)
                }}
              >
                Approuver l'enseignant
              </Button>
            )}

            {selectedInstructor && selectedInstructor.status === 'approuve' && (
              <Button
                variant="destructive"
                className="rounded-xl font-bold"
                onClick={() => {
                  handleUpdateStatus(selectedInstructor.email, 'suspendu')
                  setIsDetailsOpen(false)
                }}
              >
                Suspendre l'enseignant
              </Button>
            )}

            <Button
              variant="outline"
              className="rounded-xl font-semibold"
              onClick={() => setIsDetailsOpen(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
