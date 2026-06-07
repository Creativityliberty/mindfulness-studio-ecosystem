import { createFileRoute } from '@tanstack/react-router'
import { Scale, ShoppingCart, RefreshCw, AlertTriangle, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/conditions-generales')({
  component: ConditionsGeneralesPage,
})

function ConditionsGeneralesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/20">
            <Scale className="h-3.5 w-3.5" />
            CGV
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Conditions Générales de Vente</h1>
          <p className="text-muted-foreground">
            Les présentes CGV régissent l'ensemble des achats effectués sur la plateforme Mindfulness Studio.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: <FileText className="h-4 w-4" />,
              title: '1. Identification & Objet',
              content: 'La société Mindfulness Studio SAS (SIRET 123 456 789 00012) commercialise des formations en ligne dans les domaines du bien-être, de la méditation et du développement personnel. Ces CGV s\'appliquent à tout achat réalisé sur mindfulness-studio.com ou via la plateforme applicative associée.',
            },
            {
              icon: <ShoppingCart className="h-4 w-4" />,
              title: '2. Processus de commande',
              content: 'L\'achat se déroule en 5 étapes : sélection de la formation, connexion au compte, validation du panier, paiement sécurisé, puis accès immédiat à la formation depuis le tableau de bord. Une confirmation est envoyée par email dans les 5 minutes.',
            },
            {
              icon: <FileText className="h-4 w-4" />,
              title: '3. Prix & Paiement',
              content: 'Tous les prix sont en Euros (€) TTC. Les paiements sont sécurisés via Stripe (Visa, Mastercard, American Express, PayPal). Aucune donnée bancaire n\'est stockée sur nos serveurs — chiffrement PCI-DSS.',
            },
            {
              icon: <RefreshCw className="h-4 w-4" />,
              title: '4. Droit de rétractation & Remboursements',
              content: 'Vous disposez de 14 jours calendaires à compter de l\'achat pour exercer votre droit de rétractation, à condition de n\'avoir accédé à aucun contenu. Une fois la première leçon visionnée, le droit de rétractation ne peut plus être exercé (art. L.221-28 Code de la consommation). Contact : contact@mindfulness-studio.com',
            },
            {
              icon: <AlertTriangle className="h-4 w-4" />,
              title: '5. Accès aux formations',
              content: 'L\'accès aux formations est illimité dans le temps pour le compte ayant procédé à l\'achat. Tout partage ou revente de compte est interdit et peut entraîner la résiliation sans remboursement.',
            },
            {
              icon: <Scale className="h-4 w-4" />,
              title: '6. Droit applicable & Litiges',
              content: 'Les présentes CGV sont soumises au droit français. En cas de litige non résolu à l\'amiable, les tribunaux compétents du ressort de Paris seront saisis. Plateforme de résolution en ligne : ec.europa.eu/consumers/odr',
            },
          ].map((section, i) => (
            <Card key={i} className="rounded-2xl border-primary/10">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  {section.icon}
                </div>
                <CardTitle className="text-base">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {section.content}
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Dernière mise à jour : Juin 2026
        </p>
      </div>
    </div>
  )
}
