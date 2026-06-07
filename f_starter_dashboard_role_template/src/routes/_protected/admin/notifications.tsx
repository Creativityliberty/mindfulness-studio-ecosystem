import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, CheckCircle2, Info, AlertCircle, Trash2, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/notifications')({
  component: AdminNotificationsPage,
})

interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  type: 'info' | 'success' | 'alert'
  read: boolean
}

function AdminNotificationsPage() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Nouvelle candidature de formateur',
      description: "Jean-Marc P. a postulé en tant qu'instructeur en Méditation Zen et alignement énergétique.",
      time: 'Il y a 30 minutes',
      type: 'info',
      read: false,
    },
    {
      id: '2',
      title: 'Cours publié et synchronisé',
      description: 'Le cours "Initiation au Voyage Sonore" a été validé et poussé sur la vitrine publique.',
      time: 'Il y a 4 heures',
      type: 'success',
      read: false,
    },
    {
      id: '3',
      title: 'Alerte transaction financière',
      description: 'Un nouveau paiement de 89.00€ a été validé pour la formation "Méditation de Pleine Conscience".',
      time: 'Il y a 1 jour',
      type: 'success',
      read: true,
    },
    {
      id: '4',
      title: 'Rapport hebdomadaire disponible',
      description: "L'analyse d'activité de la plateforme montre une hausse de +15% de nouveaux étudiants.",
      time: 'Il y a 2 jours',
      type: 'info',
      read: true,
    },
  ])

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
            Centre de Notifications Admin
          </h1>
          <p className="text-muted-foreground">
            Suivi en temps réel de l'activité de l'académie (candidatures, nouveaux cours, transactions).
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="rounded-xl border-red-500/20 hover:bg-red-500/5 text-red-500 hover:text-red-600">
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card className="border-dashed border-red-500/20 p-12 text-center rounded-2xl bg-accent/5">
            <div className="max-w-md mx-auto space-y-4">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
              <h3 className="text-lg font-bold">Aucun événement récent</h3>
              <p className="text-sm text-muted-foreground">
                Aucune nouvelle alerte. La plateforme fonctionne à plein régime !
              </p>
            </div>
          </Card>
        ) : (
          notifications.map((item) => (
            <Card 
              key={item.id} 
              className={`border-primary/10 shadow-sm transition-all rounded-xl overflow-hidden hover:shadow-md ${
                !item.read ? 'border-l-4 border-l-red-500 bg-red-500/5' : 'bg-card'
              }`}
            >
              <CardHeader className="p-4 sm:p-5 flex flex-row items-start justify-between gap-4 pb-2">
                <div className="flex gap-3">
                  <div className="mt-1">
                    {item.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                    {item.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                    {item.type === 'alert' && <AlertCircle className="h-5 w-5 text-red-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-bold leading-tight">{item.title}</CardTitle>
                      {!item.read && (
                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-xs mt-0.5">{item.time}</CardDescription>
                  </div>
                </div>

                <Button 
                  onClick={() => deleteNotification(item.id)} 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-destructive shrink-0 rounded-xl"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-0 pl-12 text-sm text-muted-foreground leading-relaxed flex items-center justify-between">
                <span>{item.description}</span>
                {item.title.includes('candidature') && (
                  <Button size="sm" asChild variant="ghost" className="text-red-500 hover:text-red-600 font-bold ml-2">
                    <a href="/admin/instructors" className="flex items-center gap-1">Voir <ArrowRight className="h-3.5 w-3.5" /></a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
