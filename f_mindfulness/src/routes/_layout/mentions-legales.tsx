import { createFileRoute } from '@tanstack/react-router'
import { Shield, Building2, Globe, Mail, Phone, FileText } from 'lucide-react'

export const Route = createFileRoute('/_layout/mentions-legales')({
  head: () => ({
    meta: [
      { title: 'Mentions Légales — Mindfulness Studio' },
      {
        name: 'description',
        content:
          'Mentions légales de Mindfulness Studio : éditeur du site, hébergeur, propriété intellectuelle et responsabilité.',
      },
      { name: 'robots', content: 'index, follow' },
    ],
  }),
  component: MentionsLegalesPage,
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
        <div className="p-2 rounded-xl bg-primary/10 text-primary">{icon}</div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="text-slate-400 leading-relaxed space-y-2 text-sm">{children}</div>
    </div>
  )
}

function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-black text-slate-200">
      {/* Hero */}
      <div className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
            <FileText className="h-3.5 w-3.5" />
            Transparence & Légalité
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Mentions Légales
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance en
            l'économie numérique.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-4xl pb-24 space-y-6">
        <Section icon={<Building2 className="h-5 w-5" />} title="Éditeur du site">
          <p>
            <strong className="text-slate-200">Raison sociale :</strong> Mindfulness Studio SAS
          </p>
          <p>
            <strong className="text-slate-200">Capital social :</strong> 5 000 €
          </p>
          <p>
            <strong className="text-slate-200">Siège social :</strong> 12 Rue de la Paix, 75001
            Paris, France
          </p>
          <p>
            <strong className="text-slate-200">SIRET :</strong> 123 456 789 00012
          </p>
          <p>
            <strong className="text-slate-200">N° TVA intracommunautaire :</strong> FR 12 123456789
          </p>
          <p>
            <strong className="text-slate-200">Directeur de la publication :</strong> Fabienne
            Dupont
          </p>
        </Section>

        <Section icon={<Globe className="h-5 w-5" />} title="Hébergeur">
          <p>
            <strong className="text-slate-200">Société :</strong> OVH SAS
          </p>
          <p>
            <strong className="text-slate-200">Adresse :</strong> 2 rue Kellermann, 59100 Roubaix,
            France
          </p>
          <p>
            <strong className="text-slate-200">Site web :</strong>{' '}
            <a
              href="https://www.ovh.com"
              className="text-primary underline hover:text-primary/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.ovh.com
            </a>
          </p>
        </Section>

        <Section icon={<Mail className="h-5 w-5" />} title="Contact">
          <p>
            Pour toute question relative au présent site, vous pouvez nous contacter aux
            coordonnées suivantes :
          </p>
          <p>
            <strong className="text-slate-200">Email :</strong>{' '}
            <a
              href="mailto:contact@mindfulness-studio.com"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              contact@mindfulness-studio.com
            </a>
          </p>
          <p>
            <strong className="text-slate-200">Téléphone :</strong> +33 1 23 45 67 89
          </p>
          <p>
            <strong className="text-slate-200">Horaires :</strong> Lundi – Vendredi, 9h – 18h
          </p>
        </Section>

        <Section icon={<Shield className="h-5 w-5" />} title="Propriété intellectuelle">
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, icônes,
            sons, logiciels, etc.) est la propriété exclusive de Mindfulness Studio ou de ses
            partenaires, et est protégé par les lois françaises et internationales relatives à la
            propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou
            partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
            interdite, sauf autorisation écrite préalable de Mindfulness Studio.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de l'un quelconque de ces éléments qu'il
            contient sera considérée comme constitutive d'une contrefaçon et poursuivie
            conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété
            Intellectuelle.
          </p>
        </Section>

        <Section icon={<FileText className="h-5 w-5" />} title="Responsabilité">
          <p>
            Les informations contenues sur ce site sont aussi précises que possible et le site est
            périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des
            omissions ou des lacunes.
          </p>
          <p>
            Mindfulness Studio ne saurait être tenu responsable de l'utilisation faite de ces
            informations, et de tout préjudice direct ou indirect pouvant en découler.
          </p>
          <p>
            Des espaces interactifs sont à la disposition des utilisateurs. Mindfulness Studio se
            réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans
            cet espace qui contreviendrait à la législation applicable en France.
          </p>
        </Section>

        <div className="text-center text-xs text-slate-600 pt-4">
          Dernière mise à jour : Juin 2026
        </div>
      </div>
    </main>
  )
}
