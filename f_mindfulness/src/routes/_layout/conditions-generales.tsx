import { createFileRoute } from '@tanstack/react-router'
import { FileText, ShoppingCart, UserCheck, AlertTriangle, Scale, RefreshCw } from 'lucide-react'

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

function Section({
  icon,
  title,
  number,
  children,
}: {
  icon: React.ReactNode
  title: string
  number: number
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 md:p-8 space-y-4 hover:border-white/10 transition-colors">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <span className="text-4xl font-black text-white/5 leading-none">
            {String(number).padStart(2, '0')}
          </span>
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">{icon}</div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
          <div className="text-slate-400 leading-relaxed space-y-2 text-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}

function ConditionsGeneralesPage() {
  return (
    <main className="min-h-screen bg-black text-slate-200">
      {/* Hero */}
      <div className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/20">
            <Scale className="h-3.5 w-3.5" />
            CGV — Conditions Générales de Vente
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Conditions Générales
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des achats
            effectués sur la plateforme Mindfulness Studio.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-4xl pb-24 space-y-5">
        <Section number={1} icon={<UserCheck className="h-4 w-4" />} title="Identification & Objet">
          <p>
            La société Mindfulness Studio SAS (SIRET 123 456 789 00012) commercialise des
            formations en ligne dans les domaines du bien-être, de la méditation et du
            développement personnel.
          </p>
          <p>
            Ces CGV s'appliquent à tout achat de formation réalisé sur le site
            mindfulness-studio.com ou via la plateforme applicative associée.
          </p>
        </Section>

        <Section number={2} icon={<ShoppingCart className="h-4 w-4" />} title="Processus de commande">
          <p>
            L'achat d'une formation se déroule comme suit :
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>Sélection de la formation dans le catalogue</li>
            <li>Création ou connexion à votre compte Mindfulness Studio</li>
            <li>Validation du panier et saisie des informations de paiement</li>
            <li>Confirmation de commande par email dans les 5 minutes</li>
            <li>Accès immédiat à la formation depuis votre tableau de bord</li>
          </ol>
        </Section>

        <Section number={3} icon={<FileText className="h-4 w-4" />} title="Prix & Paiement">
          <p>
            Les prix affichés sont en Euros (€) TTC (Taxe sur la Valeur Ajoutée applicable en
            France incluse au taux en vigueur).
          </p>
          <p>
            Les paiements sont sécurisés via Stripe. Nous acceptons : cartes Visa, Mastercard,
            American Express et PayPal.
          </p>
          <p>
            Aucune donnée bancaire n'est stockée sur nos serveurs. Toutes les transactions sont
            chiffrées selon les normes PCI-DSS.
          </p>
        </Section>

        <Section number={4} icon={<RefreshCw className="h-4 w-4" />} title="Droit de rétractation & Remboursements">
          <p>
            Conformément à l'article L. 221-18 du Code de la consommation, vous disposez d'un
            délai de <strong className="text-slate-200">14 jours calendaires</strong> à compter de
            l'achat pour exercer votre droit de rétractation, à condition de n'avoir accédé à
            aucun contenu de la formation.
          </p>
          <p>
            Une fois la formation commencée (première leçon visionnée), le droit de rétractation
            ne peut plus être exercé conformément à l'article L.221-28 du Code de la consommation.
          </p>
          <p>
            Pour demander un remboursement, contactez-nous à{' '}
            <a
              href="mailto:contact@mindfulness-studio.com"
              className="text-emerald-400 underline hover:text-emerald-300 transition-colors"
            >
              contact@mindfulness-studio.com
            </a>{' '}
            en précisant votre numéro de commande.
          </p>
        </Section>

        <Section number={5} icon={<AlertTriangle className="h-4 w-4" />} title="Accès aux formations & Durée">
          <p>
            L'accès aux formations achetées est <strong className="text-slate-200">illimité dans le temps</strong> pour l'utilisateur ayant procédé à l'achat, sous réserve de maintien de la plateforme.
          </p>
          <p>
            Les formations sont accessibles uniquement sur le compte ayant procédé à l'achat. Tout
            partage de compte ou revente est strictement interdit et pourra entraîner la résiliation
            du compte sans remboursement.
          </p>
        </Section>

        <Section number={6} icon={<Scale className="h-4 w-4" />} title="Droit applicable & Litiges">
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, une solution
            amiable sera recherchée en priorité. À défaut, les tribunaux compétents du ressort de
            Paris seront saisis.
          </p>
          <p>
            Conformément au règlement européen, vous pouvez également recourir à la plateforme de
            règlement des litiges en ligne :{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              className="text-emerald-400 underline hover:text-emerald-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </Section>

        <div className="text-center text-xs text-slate-600 pt-4">
          Dernière mise à jour : Juin 2026 — Ces CGV sont susceptibles d'être modifiées. Consultez
          régulièrement cette page.
        </div>
      </div>
    </main>
  )
}
