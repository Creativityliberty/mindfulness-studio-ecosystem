import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useCoursesStore } from '@/stores/courses-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Receipt, FileText, ShoppingBag, Calendar, User, ShieldCheck, Mail, Printer } from 'lucide-react'

export const Route = createFileRoute('/_protected/client/payment-history')({
  component: StudentPaymentHistoryPage,
})

function StudentPaymentHistoryPage() {
  const { user } = useAuthStore()
  const { transactions } = useCoursesStore()
  const [selectedTx, setSelectedTx] = React.useState<any>(null)

  // Filter transactions for this student based on email
  const myTransactions = React.useMemo(() => {
    if (!user) return []
    return transactions.filter((tx) => tx.studentEmail === user.email)
  }, [transactions, user])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
          Historique des Achats
        </h1>
        <p className="text-muted-foreground">
          Visualisez vos reçus d'achats de formations et téléchargez vos justificatifs.
        </p>
      </div>

      {myTransactions.length === 0 ? (
        <Card className="border-dashed border-primary/20 p-12 text-center rounded-2xl bg-accent/10">
          <div className="max-w-md mx-auto space-y-4">
            <ShoppingBag className="h-16 w-16 text-primary/70 mx-auto" />
            <h3 className="text-lg font-bold">Aucun achat enregistré</h3>
            <p className="text-sm text-muted-foreground">
              Vous n'avez effectué aucune transaction sur notre plateforme pour le moment.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl">
              <Link to="/client/catalog">Consulter le catalogue</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="border-primary/10 shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="bg-accent/5 border-b border-primary/5 p-5">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Vos transactions récentes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-primary/5 text-muted-foreground font-semibold">
                    <th className="p-4">Identifiant</th>
                    <th className="p-4">Formation</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Montant</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-500/5">
                  {myTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                    >
                      <td className="p-4 font-mono text-xs font-semibold text-muted-foreground">
                        #{tx.id}
                      </td>
                      <td className="p-4 font-bold text-foreground">
                        {tx.courseTitle}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-extrabold text-primary dark:text-primary">
                        {tx.amount}.00 €
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 border-none font-bold rounded-md"
                        >
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTx(tx)}
                          className="rounded-lg text-primary hover:text-primary hover:bg-accent/10"
                        >
                          <FileText className="h-4 w-4 mr-1" /> Reçu PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice Modal */}
      <Dialog open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
        <DialogContent className="max-w-2xl rounded-3xl p-6 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center font-bold">Aperçu du Reçu de Paiement</DialogTitle>
          </DialogHeader>

          {selectedTx && (
            <div className="space-y-6">
              {/* Receipt Visual Container */}
              <div id="print-area" className="border border-primary/10 p-8 rounded-2xl space-y-6 bg-card text-foreground relative shadow-md">
                {/* Header branding */}
                <div className="flex justify-between items-start pb-6 border-b border-primary/5">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent">
                      Académie Vibratoire
                    </h2>
                    <p className="text-xs text-muted-foreground">Mindfulness Studio</p>
                    <p className="text-xs text-muted-foreground">12 Rue du Calme, 75000 Paris</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                      Paiement {selectedTx.status}
                    </span>
                    <p className="text-xs font-mono text-muted-foreground mt-1">N° #{selectedTx.id}</p>
                  </div>
                </div>

                {/* Client / Date Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs py-2">
                  <div className="space-y-1">
                    <span className="font-bold text-muted-foreground block uppercase text-[10px]">Facturé à</span>
                    <p className="font-semibold flex items-center gap-1"><User className="h-3.5 w-3.5 text-primary" /> {user?.name}</p>
                    <p className="text-muted-foreground flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-muted-foreground" /> {selectedTx.studentEmail}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="font-bold text-muted-foreground block uppercase text-[10px]">Détails d'achat</span>
                    <p className="font-semibold flex items-center justify-end gap-1"><Calendar className="h-3.5 w-3.5 text-primary" /> {new Date(selectedTx.date).toLocaleDateString()}</p>
                    <p className="text-muted-foreground">Méthode: Carte Bancaire (Stripe)</p>
                  </div>
                </div>

                {/* Bill Table */}
                <div className="border border-primary/5 rounded-xl overflow-hidden text-xs">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/30 border-b border-primary/5 text-muted-foreground font-semibold">
                        <th className="p-3 text-left">Désignation de la formation</th>
                        <th className="p-3 text-right">Montant HT</th>
                        <th className="p-3 text-right">Total TTC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-primary/5">
                        <td className="p-3 font-bold">{selectedTx.courseTitle}</td>
                        <td className="p-3 text-right">{(selectedTx.amount / 1.2).toFixed(2)} €</td>
                        <td className="p-3 text-right">{selectedTx.amount}.00 €</td>
                      </tr>
                      <tr className="bg-muted/10 font-bold">
                        <td colSpan={2} className="p-3 text-right uppercase text-[10px] text-muted-foreground">Montant Total Payé</td>
                        <td className="p-3 text-right text-primary text-sm font-extrabold">{selectedTx.amount}.00 €</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-4 border-t border-primary/5">
                  <p className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Transaction sécurisée par Stripe</p>
                  <p>© {new Date().getFullYear()} Académie Vibratoire</p>
                </div>
              </div>

              {/* Action Buttons */}
              <DialogFooter className="flex gap-2">
                <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                  <Printer className="mr-1.5 h-4 w-4" /> Imprimer / Sauvegarder PDF
                </Button>
                <Button variant="outline" onClick={() => setSelectedTx(null)} className="rounded-xl">
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

