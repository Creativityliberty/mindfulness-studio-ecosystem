import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, CheckCircle2, Info, AlertCircle, Trash2, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/_protected/instructor/notifications')({
  component: InstructorNotificationsPage,
})

interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  type: 'info' | 'success' | 'alert'
  read: boolean
}

function InstructorNotificationsPage() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Nouvel élève inscrit à votre cours',
      description: 'Sophie Martin a rejoint la formation "Méditation de Pleine Conscience - Session Intermédiaire".',
      time: 'Il y a 10 minutes',
      type: 'success',
      read: false,
    },
    {
      id: '2',
      title: 'Votre cours a été approuvé !',
      description: 'Félicitations, l\'administrateur a validé la publication de "Initiation au Voyage Sonore".',
      time: 'Il y a 2 heures',
      type: 'success',
      read: false,
    },
    {
      id: '3',
      title: 'Nouveau commentaire étudiant',
      description: 'Pierre a posé une question sur la leçon 3 : "Quelle est la durée idéale de l\'assise ?"',
      time: 'Il y a 1 jour',
      type: 'info',
      read: true,
    },
    {
      id: '4',
      title: 'Versement mensuel programmé',
      description: 'Votre solde accumulé de ce mois (289.80€) a été validé pour transfert automatique.',
      time: 'Il y a 3 jours',
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
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Vos Notifications Formateur
          </h1>
          <p className="text-muted-foreground">
            Suivez les inscriptions à vos cours, les retours des étudiants et vos gains en direct.
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="rounded-xl border-indigo-500/20 hover:bg-indigo-500/5 text-indigo-500 hover:text-indigo-600">
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card className="border-dashed border-indigo-500/20 p-12 text-center rounded-2xl bg-accent/5">
            <div className="max-w-md mx-auto space-y-4">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
              <h3 className="text-lg font-bold">Aucun message pour le moment</h3>
              <p className="text-sm text-muted-foreground">
                Dès qu'un nouvel élève s'inscrira ou posera une question, l'alerte s'affichera ici.
              </p>
            </div>
          </Card>
        ) : (
          notifications.map((item) => (
            <Card 
              key={item.id} 
              className={`border-primary/10 shadow-sm transition-all rounded-xl overflow-hidden hover:shadow-md ${
                !item.read ? 'border-l-4 border-l-indigo-600 bg-indigo-500/5' : 'bg-card'
              }`}
            >
              <CardHeader className="p-4 sm:p-5 flex flex-row items-start justify-between gap-4 pb-2">
                <div className="flex gap-3">
                  <div className="mt-1">
                    {item.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                    {item.type === 'info' && <Info className="h-5 w-5 text-indigo-500" />}
                    {item.type === 'alert' && <AlertCircle className="h-5 w-5 text-red-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-bold leading-tight">{item.title}</CardTitle>
                      {!item.read && (
                        <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
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
                {item.title.includes('élève') && (
                  <Button size="sm" asChild variant="ghost" className="text-indigo-500 hover:text-indigo-600 font-bold ml-2">
                    <a href="/instructor/dashboard" className="flex items-center gap-1">Voir <ArrowRight className="h-3.5 w-3.5" /></a>
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
