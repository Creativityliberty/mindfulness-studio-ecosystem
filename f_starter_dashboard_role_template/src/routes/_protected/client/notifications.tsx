import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCircle2, Info, BookOpen, AlertCircle, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/_protected/client/notifications')({
  component: StudentNotificationsPage,
})

interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  type: 'info' | 'success' | 'alert'
  read: boolean
}

function StudentNotificationsPage() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Bienvenue sur l\'Académie Vibratoire',
      description: 'Découvrez vos modules de cours, votre progression et commencez dès aujourd\'hui votre parcours.',
      time: 'Il y a 2 heures',
      type: 'info',
      read: false,
    },
    {
      id: '2',
      title: 'Inscription confirmée !',
      description: 'Votre inscription au cours "Introduction à la Méditation de Pleine Conscience" a été validée avec succès.',
      time: 'Il y a 1 jour',
      type: 'success',
      read: true,
    },
    {
      id: '3',
      title: 'Nouveau contenu disponible',
      description: 'De nouvelles ressources audio guidées ont été ajoutées dans le module de pleine conscience.',
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-[#2f4ea8] to-[#79c9db] bg-clip-text text-transparent">
            Centre de Notifications
          </h1>
          <p className="text-muted-foreground">
            Restez informé de l'activité de vos formations, des messages de vos tuteurs et des certificats débloqués.
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="rounded-xl border-primary/20 hover:bg-primary/5">
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card className="border-dashed border-primary/20 p-12 text-center rounded-2xl bg-accent/5">
            <div className="max-w-md mx-auto space-y-4">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
              <h3 className="text-lg font-bold">Aucune notification</h3>
              <p className="text-sm text-muted-foreground">
                Vous êtes complètement à jour ! De nouvelles notifications apparaîtront ici quand vos formateurs publieront des annonces ou quand vous débloquerez des certificats.
              </p>
            </div>
          </Card>
        ) : (
          notifications.map((item) => (
            <Card 
              key={item.id} 
              className={`border-primary/10 shadow-sm transition-all rounded-xl overflow-hidden hover:shadow-md ${
                !item.read ? 'border-l-4 border-l-[#2f4ea8] bg-[#2f4ea8]/5' : 'bg-card'
              }`}
            >
              <CardHeader className="p-4 sm:p-5 flex flex-row items-start justify-between gap-4 pb-2">
                <div className="flex gap-3">
                  <div className="mt-1">
                    {item.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                    {item.type === 'info' && <Info className="h-5 w-5 text-primary" />}
                    {item.type === 'alert' && <AlertCircle className="h-5 w-5 text-destructive" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-bold leading-tight">{item.title}</CardTitle>
                      {!item.read && (
                        <Badge className="bg-[#2f4ea8] text-white hover:bg-[#2f4ea8]/90 text-[10px] px-1.5 py-0.5 rounded-full">
                          Nouveau
                        </Badge>
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
              <CardContent className="p-4 sm:p-5 pt-0 pl-12 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Recommended catalog box */}
      <Card className="border-primary/10 bg-gradient-to-br from-[#2f4ea8]/5 to-[#79c9db]/5 rounded-2xl overflow-hidden">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h3 className="font-bold text-lg">Envie de continuer à apprendre ?</h3>
              <p className="text-sm text-muted-foreground">Découvrez nos autres ateliers immersifs et méditations énergétiques.</p>
            </div>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl">
            <a href="/client/catalog">Voir le catalogue</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
