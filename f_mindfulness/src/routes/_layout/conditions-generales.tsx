import { createFileRoute } from '@tanstack/react-router'
import {
  Scale,
  ShoppingCart,
  RefreshCw,
  AlertTriangle,
  FileText,
  Users,
  CreditCard,
  ExternalLink,
  ChevronRight,
  CircleCheck,
} from 'lucide-react'

export const Route = createFileRoute('/_layout/conditions-generales')({
  head: () => ({
    meta: [
      { title: 'Conditions Générales de Vente — Mindfulness Studio' },
      {
        name: 'description',
        content:
          "CGV de Mindfulness Studio : modalités d'achat, de paiement, de remboursement et d'accès aux formations en ligne.",
      },
      { name: 'robots', content: 'index, follow' },
    ],
  }),
  component: ConditionsGeneralesPage,
})

interface SectionProps {
  number: number
  icon: React.ElementType
  iconColor: string
  iconBg: string
  accentColor: string
  title: string
  children: React.ReactNode
}

function Section({ number, icon: Icon, iconColor, iconBg, accentColor, title, children }: SectionProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.025] overflow-hidden hover:border-white/10 transition-colors">
      <div className={`h-1 ${accentColor}`} />
      <div className="p-7 md:p-9">
        <div className="flex items-start gap-5 mb-6">
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className={`p-3 rounded-2xl border border-white/10 ${iconBg}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <span className="text-3xl font-black text-white/5 leading-none">
              {String(number).padStart(2, '0')}
            </span>
          </div>
          <div className="pt-2 flex-1">
            <h2 className="text-xl font-bold text-white tracking-tight mb-5">{title}</h2>
            <div className="text-slate-400 text-sm leading-relaxed space-y-3">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConditionsGeneralesPage() {
  return (
    <main className="min-h-screen bg-black text-slate-200">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-teal-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <div className="relative pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <a href="/" className="hover:text-slate-300 transition-colors">Accueil</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Conditions Générales</span>
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">
              <Scale className="h-3.5 w-3.5 text-emerald-400" />
              CGV — Conditions Générales de Vente
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Conditions Générales
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des achats
              effectués sur la plateforme Mindfulness Studio.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 max-w-4xl pb-28 space-y-5">
        <Section
          number={1}
          icon={FileText}
          iconColor="text-indigo-400"
          iconBg="bg-indigo-500/20"
          accentColor="bg-gradient-to-r from-indigo-500/60 to-transparent"
          title="Identification & Objet"
        >
          <p>
            La société <strong className="text-slate-200">Mindfulness Studio SAS</strong> (SIRET 123 456 789 00012)
            commercialise des formations en ligne dans les domaines du bien-être, de la méditation
            et du développement personnel.
          </p>
          <p>
            Ces CGV s'appliquent à tout achat de formation réalisé sur mindfulness-studio.com ou via
            la plateforme applicative associée.
          </p>
        </Section>

        <Section
          number={2}
          icon={ShoppingCart}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/20"
          accentColor="bg-gradient-to-r from-violet-500/60 to-transparent"
          title="Processus de commande"
        >
          <p>L'achat d'une formation se déroule comme suit :</p>
          <div className="mt-3 space-y-2">
            {[
              'Sélection de la formation dans le catalogue',
              'Création ou connexion à votre compte Mindfulness Studio',
              'Validation du panier et saisie des informations de paiement',
              'Confirmation de commande par email dans les 5 minutes',
              'Accès immédiat depuis votre tableau de bord',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <CircleCheck className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          number={3}
          icon={CreditCard}
          iconColor="text-pink-400"
          iconBg="bg-pink-500/20"
          accentColor="bg-gradient-to-r from-pink-500/60 to-transparent"
          title="Prix & Paiement"
        >
          <p>
            Les prix affichés sont en <strong className="text-slate-200">Euros (€) TTC</strong> (TVA
            française incluse au taux en vigueur).
          </p>
          <p>
            Les paiements sont sécurisés via <strong className="text-slate-200">Stripe</strong>. Modes
            acceptés : Visa, Mastercard, American Express et PayPal.
          </p>
          <p>
            Aucune donnée bancaire n'est stockée sur nos serveurs. Toutes les transactions sont
            chiffrées selon les normes <strong className="text-slate-200">PCI-DSS</strong>.
          </p>
        </Section>

        <Section
          number={4}
          icon={RefreshCw}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/20"
          accentColor="bg-gradient-to-r from-emerald-500/60 to-transparent"
          title="Droit de rétractation & Remboursements"
        >
          <p>
            Conformément à l'article L.221-18 du Code de la consommation, vous disposez d'un délai
            de <strong className="text-slate-200">14 jours calendaires</strong> à compter de l'achat
            pour exercer votre droit de rétractation, à condition de n'avoir accédé à aucun contenu
            de la formation.
          </p>
          <p>
            Une fois la première leçon visionnée, le droit de rétractation ne peut plus être
            exercé (art. L.221-28 du Code de la consommation).
          </p>
          <p>
            Pour demander un remboursement, contactez-nous à{' '}
            <a
              href="mailto:contact@mindfulness-studio.com"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              contact@mindfulness-studio.com
            </a>{' '}
            en précisant votre numéro de commande.
          </p>
        </Section>

        <Section
          number={5}
          icon={Users}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/20"
          accentColor="bg-gradient-to-r from-amber-500/60 to-transparent"
          title="Accès aux formations & Durée"
        >
          <p>
            L'accès aux formations achetées est{' '}
            <strong className="text-slate-200">illimité dans le temps</strong> pour l'utilisateur
            ayant procédé à l'achat, sous réserve de maintien de la plateforme.
          </p>
          <p>
            Tout partage de compte ou revente est strictement interdit et pourra entraîner la
            résiliation du compte sans remboursement.
          </p>
        </Section>

        <Section
          number={6}
          icon={AlertTriangle}
          iconColor="text-rose-400"
          iconBg="bg-rose-500/20"
          accentColor="bg-gradient-to-r from-rose-500/60 to-transparent"
          title="Droit applicable & Litiges"
        >
          <p>
            Les présentes CGV sont soumises au <strong className="text-slate-200">droit français</strong>.
            En cas de litige, une solution amiable sera prioritairement recherchée. À défaut, les
            tribunaux compétents du ressort de Paris seront saisis.
          </p>
          <p>
            Vous pouvez également recourir à la plateforme européenne de résolution des litiges :{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </Section>

        <div className="flex items-center justify-center gap-2 pt-6 text-xs text-slate-600">
          <FileText className="h-3.5 w-3.5" />
          Dernière mise à jour : Juin 2026 — Susceptibles d'être modifiées
        </div>
      </div>
    </main>
  )
}
