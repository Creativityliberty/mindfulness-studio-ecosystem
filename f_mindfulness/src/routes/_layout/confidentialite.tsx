import { createFileRoute } from '@tanstack/react-router'
import { Lock, Database, Eye, Bell, UserX, Globe, Mail } from 'lucide-react'

export const Route = createFileRoute('/_layout/confidentialite')({
  head: () => ({
    meta: [
      { title: 'Politique de Confidentialité — Mindfulness Studio' },
      {
        name: 'description',
        content:
          'Découvrez comment Mindfulness Studio collecte, utilise et protège vos données personnelles conformément au RGPD.',
      },
      { name: 'robots', content: 'index, follow' },
    ],
  }),
  component: ConfidentialitePage,
})

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 md:p-8 space-y-4 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">{icon}</div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="text-slate-400 leading-relaxed space-y-3 text-sm">{children}</div>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
      <span className="text-slate-300 font-semibold shrink-0 w-48">{label}</span>
      <span className="text-slate-400">{value}</span>
    </div>
  )
}

function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-black text-slate-200">
      {/* Hero */}
      <div className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-500/20">
            <Lock className="h-3.5 w-3.5" />
            RGPD Conforme
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Politique de Confidentialité
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            La protection de vos données personnelles est au cœur de notre engagement. Voici
            comment nous les traitons, en toute transparence.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-4xl pb-24 space-y-6">
        <Section icon={<Database className="h-5 w-5" />} title="Données collectées">
          <p>Nous collectons les données suivantes lors de votre utilisation de nos services :</p>
          <div className="space-y-2 pl-2 border-l-2 border-violet-500/20 mt-3">
            <DataRow label="Données d'identité" value="Nom, prénom, adresse email" />
            <DataRow label="Données de connexion" value="Adresse IP, date et heure de connexion, navigateur utilisé" />
            <DataRow label="Données de paiement" value="Référence de transaction (les numéros de carte sont gérés par Stripe, non stockés par nous)" />
            <DataRow label="Données de progression" value="Leçons suivies, temps de visionnage, certificats obtenus" />
            <DataRow label="Données de communication" value="Emails échangés avec notre support" />
          </div>
        </Section>

        <Section icon={<Eye className="h-5 w-5" />} title="Finalités du traitement">
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul className="list-none space-y-2 mt-2">
            {[
              'La gestion de votre compte utilisateur et de vos formations',
              "L'émission de vos factures et reçus de paiement",
              "L'envoi de notifications relatives à vos cours (nouveautés, rappels)",
              "L'amélioration de nos services via des statistiques anonymisées",
              'Le respect de nos obligations légales et réglementaires',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-violet-400 mt-0.5">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<Globe className="h-5 w-5" />} title="Partage des données">
          <p>
            Nous ne vendons jamais vos données personnelles. Nous les partageons uniquement avec les
            prestataires strictement nécessaires à nos services :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {[
              { name: 'Stripe', role: 'Paiement sécurisé', country: '🇺🇸 USA (Privacy Shield)' },
              { name: 'OVH', role: 'Hébergement des données', country: '🇫🇷 France' },
              { name: 'Mailgun', role: "Envoi d'emails transactionnels", country: '🇪🇺 UE' },
              { name: 'Sentry', role: 'Surveillance des erreurs techniques', country: '🇺🇸 USA (SCCs)' },
            ].map((partner) => (
              <div
                key={partner.name}
                className="p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-1"
              >
                <p className="font-semibold text-slate-200">{partner.name}</p>
                <p className="text-xs">{partner.role}</p>
                <p className="text-xs text-slate-500">{partner.country}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={<Lock className="h-5 w-5" />} title="Conservation & Sécurité">
          <p>
            Vos données sont conservées pendant la durée de votre compte actif, plus{' '}
            <strong className="text-slate-200">3 ans</strong> après votre dernière activité (obligations légales
            comptables : 10 ans pour les données de facturation).
          </p>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées : chiffrement
            TLS, accès restreint par rôle, sauvegardes chiffrées et journaux d'accès.
          </p>
        </Section>

        <Section icon={<UserX className="h-5 w-5" />} title="Vos droits (RGPD)">
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE
            2016/679), vous disposez des droits suivants :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              { right: 'Droit d\'accès', desc: 'Obtenir une copie de vos données' },
              { right: 'Droit de rectification', desc: 'Corriger des données inexactes' },
              { right: 'Droit à l\'effacement', desc: 'Supprimer votre compte et vos données' },
              { right: 'Droit d\'opposition', desc: 'S\'opposer au traitement marketing' },
              { right: 'Droit à la portabilité', desc: 'Recevoir vos données en format lisible' },
              { right: 'Droit de limitation', desc: 'Limiter l\'utilisation de vos données' },
            ].map((item) => (
              <div key={item.right} className="p-3 rounded-xl border border-violet-500/10 bg-violet-500/5">
                <p className="font-semibold text-violet-300 text-xs">{item.right}</p>
                <p className="text-xs mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            Pour exercer ces droits, contactez notre DPO à{' '}
            <a
              href="mailto:dpo@mindfulness-studio.com"
              className="text-violet-400 underline hover:text-violet-300 transition-colors"
            >
              dpo@mindfulness-studio.com
            </a>{' '}
            ou écrivez à Mindfulness Studio, 12 rue de la Paix, 75001 Paris.
          </p>
          <p>
            En cas de réclamation non résolue, vous pouvez saisir la{' '}
            <a
              href="https://www.cnil.fr"
              className="text-violet-400 underline hover:text-violet-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              CNIL
            </a>{' '}
            (Commission Nationale de l'Informatique et des Libertés).
          </p>
        </Section>

        <Section icon={<Bell className="h-5 w-5" />} title="Cookies">
          <p>
            Notre site utilise des cookies essentiels au fonctionnement de la plateforme (session,
            préférences de thème). Ces cookies ne nécessitent pas de consentement préalable.
          </p>
          <p>
            Nous n'utilisons pas de cookies publicitaires ou de tracking tiers à des fins
            commerciales. Les analyses de trafic sont réalisées via des outils anonymisés (sans IP
            stockée).
          </p>
          <p>
            Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela
            peut affecter certaines fonctionnalités du site.
          </p>
        </Section>

        <div className="text-center text-xs text-slate-600 pt-4">
          Dernière mise à jour : Juin 2026 — Mindfulness Studio SAS, Responsable du traitement
        </div>
      </div>
    </main>
  )
}
