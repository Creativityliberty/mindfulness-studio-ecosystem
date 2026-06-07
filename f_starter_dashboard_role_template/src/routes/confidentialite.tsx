import { createFileRoute } from '@tanstack/react-router'
import { Lock, Database, Eye, UserX, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/confidentialite')({
  component: ConfidentialitePage,
})

function ConfidentialitePage() {
  const sections = [
    {
      icon: <Database className="h-4 w-4" />,
      title: 'Données collectées',
      color: 'bg-violet-500/10 text-violet-500',
      content: (
        <div className="space-y-1.5">
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Données d'identité : nom, prénom, email</li>
            <li>Données de connexion : IP, navigateur, horodatage</li>
            <li>Données de paiement : référence de transaction uniquement (carte gérée par Stripe)</li>
            <li>Données de progression : leçons suivies, certificats obtenus</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Eye className="h-4 w-4" />,
      title: 'Finalités du traitement',
      color: 'bg-violet-500/10 text-violet-500',
      content: (
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Gestion de votre compte et de vos formations</li>
          <li>Émission de factures et reçus</li>
          <li>Envoi de notifications relatives à vos cours</li>
          <li>Amélioration de nos services via statistiques anonymisées</li>
          <li>Respect de nos obligations légales</li>
        </ul>
      ),
    },
    {
      icon: <Globe className="h-4 w-4" />,
      title: 'Partage des données',
      color: 'bg-violet-500/10 text-violet-500',
      content: (
        <div className="space-y-2">
          <p>Nous ne vendons jamais vos données. Elles sont partagées uniquement avec :</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { name: 'Stripe', role: 'Paiement', country: '🇺🇸' },
              { name: 'OVH', role: 'Hébergement', country: '🇫🇷' },
              { name: 'Mailgun', role: 'Emails', country: '🇪🇺' },
              { name: 'Sentry', role: 'Monitoring', country: '🇺🇸' },
            ].map((p) => (
              <div key={p.name} className="p-2 rounded-lg border border-primary/10 bg-accent/30 text-xs">
                <span className="font-bold text-foreground">{p.country} {p.name}</span>
                <br />{p.role}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: <Lock className="h-4 w-4" />,
      title: 'Conservation & Sécurité',
      color: 'bg-violet-500/10 text-violet-500',
      content: (
        <p>
          Vos données sont conservées pendant la durée de votre compte actif, plus <strong>3 ans</strong> après
          votre dernière activité (10 ans pour les données de facturation — obligation légale).
          Sécurité : chiffrement TLS, accès restreint par rôle, sauvegardes chiffrées.
        </p>
      ),
    },
    {
      icon: <UserX className="h-4 w-4" />,
      title: 'Vos droits RGPD',
      color: 'bg-violet-500/10 text-violet-500',
      content: (
        <div className="space-y-2">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {[
              'Accès', 'Rectification', 'Effacement',
              'Opposition', 'Portabilité', 'Limitation',
            ].map((right) => (
              <div key={right} className="p-2 rounded-lg border border-violet-500/10 bg-violet-500/5 text-xs text-center font-semibold text-violet-400">
                {right}
              </div>
            ))}
          </div>
          <p className="text-xs mt-2">
            Contact DPO :{' '}
            <a href="mailto:dpo@mindfulness-studio.com" className="text-primary underline hover:text-primary/80">
              dpo@mindfulness-studio.com
            </a>
            {' '}— Recours possible auprès de la{' '}
            <a href="https://www.cnil.fr" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">CNIL</a>
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-500/20">
            <Lock className="h-3.5 w-3.5" />
            RGPD Conforme
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Politique de Confidentialité</h1>
          <p className="text-muted-foreground">
            Découvrez comment Mindfulness Studio protège et utilise vos données personnelles.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, i) => (
            <Card key={i} className="rounded-2xl border-primary/10">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <div className={`p-2 rounded-xl ${section.color}`}>{section.icon}</div>
                <CardTitle className="text-base">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{section.content}</CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Dernière mise à jour : Juin 2026 — Mindfulness Studio SAS, Responsable du traitement
        </p>
      </div>
    </div>
  )
}
