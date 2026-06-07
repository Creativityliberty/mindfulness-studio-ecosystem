import { createFileRoute } from '@tanstack/react-router'
import { Shield, Building2, Globe, Mail, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/mentions-legales')({
  component: MentionsLegalesPage,
})

function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
            <FileText className="h-3.5 w-3.5" />
            Légal
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Mentions Légales</h1>
          <p className="text-muted-foreground">
            Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance en
            l'économie numérique.
          </p>
        </div>

        <div className="space-y-4">
          <Card className="rounded-2xl border-primary/10">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">Éditeur du site</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1.5">
              <p><strong className="text-foreground">Raison sociale :</strong> Mindfulness Studio SAS</p>
              <p><strong className="text-foreground">Capital social :</strong> 5 000 €</p>
              <p><strong className="text-foreground">Siège social :</strong> 12 Rue de la Paix, 75001 Paris, France</p>
              <p><strong className="text-foreground">SIRET :</strong> 123 456 789 00012</p>
              <p><strong className="text-foreground">N° TVA intracommunautaire :</strong> FR 12 123456789</p>
              <p><strong className="text-foreground">Directeur de la publication :</strong> Fabienne Dupont</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-primary/10">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Globe className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">Hébergeur</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1.5">
              <p><strong className="text-foreground">Société :</strong> OVH SAS</p>
              <p><strong className="text-foreground">Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
              <p>
                <strong className="text-foreground">Site web :</strong>{' '}
                <a href="https://www.ovh.com" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">
                  www.ovh.com
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-primary/10">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">Contact</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1.5">
              <p>
                <strong className="text-foreground">Email :</strong>{' '}
                <a href="mailto:contact@mindfulness-studio.com" className="text-primary underline hover:text-primary/80">
                  contact@mindfulness-studio.com
                </a>
              </p>
              <p><strong className="text-foreground">Téléphone :</strong> +33 1 23 45 67 89</p>
              <p><strong className="text-foreground">Horaires :</strong> Lundi – Vendredi, 9h – 18h</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-primary/10">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Shield className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                L'ensemble des contenus présents sur ce site est la propriété exclusive de Mindfulness Studio ou de ses
                partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction non autorisée est strictement interdite et pourra être poursuivie conformément aux
                dispositions du Code de Propriété Intellectuelle.
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Dernière mise à jour : Juin 2026
        </p>
      </div>
    </div>
  )
}
