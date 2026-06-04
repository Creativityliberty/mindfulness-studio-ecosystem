import { createFileRoute } from '@tanstack/react-router'
import {
  Lock,
  Database,
  Eye,
  Bell,
  UserX,
  Globe,
  Shield,
  FileText,
  ExternalLink,
  ChevronRight,
  Server,
} from 'lucide-react'

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

interface SectionProps {
  icon: React.ElementType
  iconColor: string
  iconBg: string
  accentColor: string
  title: string
  children: React.ReactNode
}

function Section({ icon: Icon, iconColor, iconBg, accentColor, title, children }: SectionProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.025] overflow-hidden hover:border-white/10 transition-colors">
      <div className={`h-1 ${accentColor}`} />
      <div className="p-7 md:p-9 space-y-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl border border-white/10 ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        <div className="text-slate-400 text-sm leading-relaxed space-y-4">{children}</div>
      </div>
    </div>
  )
}

const partners = [
  { name: 'Stripe', role: 'Paiement sécurisé', country: 'États-Unis (Privacy Shield)', icon: Shield },
  { name: 'OVH', role: 'Hébergement des données', country: 'France (UE)', icon: Server },
  { name: 'Mailgun', role: "Envoi d'emails transactionnels", country: 'Union Européenne', icon: Bell },
  { name: 'Sentry', role: 'Surveillance des erreurs techniques', country: 'États-Unis (SCCs)', icon: Eye },
]

const rights = [
  { right: "Droit d'accès", desc: "Obtenir une copie de vos données" },
  { right: "Droit de rectification", desc: "Corriger des données inexactes" },
  { right: "Droit à l'effacement", desc: "Supprimer votre compte et données" },
  { right: "Droit d'opposition", desc: "S'opposer au traitement marketing" },
  { right: "Droit à la portabilité", desc: "Recevoir vos données en format lisible" },
  { right: "Droit de limitation", desc: "Limiter l'utilisation de vos données" },
]

function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-black text-slate-200">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <div className="relative pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <a href="/" className="hover:text-slate-300 transition-colors">Accueil</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Politique de confidentialité</span>
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">
              <Lock className="h-3.5 w-3.5 text-violet-400" />
              RGPD Conforme
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Politique de Confidentialité
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              La protection de vos données personnelles est au cœur de notre engagement. Voici
              comment nous les traitons, en toute transparence.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 max-w-4xl pb-28 space-y-5">
        <Section
          icon={Database}
          iconColor="text-indigo-400"
          iconBg="bg-indigo-500/20"
          accentColor="bg-gradient-to-r from-indigo-500/60 to-transparent"
          title="Données collectées"
        >
          <p>Nous collectons les données suivantes lors de votre utilisation de nos services :</p>
          <div className="mt-2 rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
            {[
              { label: "Données d'identité", value: "Nom, prénom, adresse email" },
              { label: "Données de connexion", value: "Adresse IP, date/heure de connexion, navigateur utilisé" },
              { label: "Données de paiement", value: "Référence de transaction (carte gérée par Stripe, non stockée)" },
              { label: "Données de progression", value: "Leçons suivies, temps de visionnage, certificats obtenus" },
              { label: "Données de communication", value: "Emails échangés avec notre support" },
            ].map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-1 p-3 text-xs">
                <span className="text-slate-300 font-semibold sm:w-52 shrink-0">{row.label}</span>
                <span className="text-slate-500">{row.value}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          icon={Eye}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/20"
          accentColor="bg-gradient-to-r from-violet-500/60 to-transparent"
          title="Finalités du traitement"
        >
          <p>Vos données sont utilisées exclusivement pour :</p>
          <div className="space-y-2">
            {[
              "La gestion de votre compte et de vos formations",
              "L'émission de vos factures et reçus de paiement",
              "L'envoi de notifications relatives à vos cours",
              "L'amélioration de nos services via des statistiques anonymisées",
              "Le respect de nos obligations légales et réglementaires",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          icon={Globe}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/20"
          accentColor="bg-gradient-to-r from-emerald-500/60 to-transparent"
          title="Partage des données"
        >
          <p>
            Nous ne vendons jamais vos données personnelles. Elles sont partagées uniquement avec
            les prestataires strictement nécessaires à nos services :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-3"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 shrink-0">
                  <partner.icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-slate-200 text-sm">{partner.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{partner.role}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{partner.country}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          icon={Lock}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/20"
          accentColor="bg-gradient-to-r from-amber-500/60 to-transparent"
          title="Conservation & Sécurité"
        >
          <p>
            Vos données sont conservées pendant la durée de votre compte actif, plus{' '}
            <strong className="text-slate-200">3 ans</strong> après votre dernière activité
            (obligations légales comptables :{' '}
            <strong className="text-slate-200">10 ans</strong> pour les données de facturation).
          </p>
          <p>
            Mesures de sécurité mises en œuvre : chiffrement TLS, accès restreint par rôle,
            sauvegardes chiffrées et journaux d'accès horodatés.
          </p>
        </Section>

        <Section
          icon={UserX}
          iconColor="text-rose-400"
          iconBg="bg-rose-500/20"
          accentColor="bg-gradient-to-r from-rose-500/60 to-transparent"
          title="Vos droits (RGPD)"
        >
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE
            2016/679), vous disposez des droits suivants :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rights.map((item) => (
              <div
                key={item.right}
                className="p-4 rounded-2xl border border-rose-500/10 bg-rose-500/5 space-y-1"
              >
                <p className="text-xs font-bold text-rose-300">{item.right}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
            <p>
              Pour exercer ces droits, contactez notre DPO à{' '}
              <a
                href="mailto:dpo@mindfulness-studio.com"
                className="text-rose-400 hover:text-rose-300 transition-colors"
              >
                dpo@mindfulness-studio.com
              </a>
            </p>
            <p>
              Recours possible auprès de la{' '}
              <a
                href="https://www.cnil.fr"
                className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                CNIL <ExternalLink className="h-3 w-3" />
              </a>
              {' '}(Commission Nationale de l'Informatique et des Libertés).
            </p>
          </div>
        </Section>

        <Section
          icon={Bell}
          iconColor="text-cyan-400"
          iconBg="bg-cyan-500/20"
          accentColor="bg-gradient-to-r from-cyan-500/60 to-transparent"
          title="Cookies"
        >
          <p>
            Notre site utilise des cookies essentiels au fonctionnement de la plateforme
            (session, préférences de thème). Ces cookies ne nécessitent pas de consentement
            préalable.
          </p>
          <p>
            Nous n'utilisons pas de cookies publicitaires ou de tracking tiers. Les analyses de
            trafic sont réalisées via des outils anonymisés (sans IP stockée).
          </p>
          <p>
            Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela
            peut affecter certaines fonctionnalités.
          </p>
        </Section>

        <div className="flex items-center justify-center gap-2 pt-6 text-xs text-slate-600">
          <FileText className="h-3.5 w-3.5" />
          Dernière mise à jour : Juin 2026 — Mindfulness Studio SAS, Responsable du traitement
        </div>
      </div>
    </main>
  )
}
