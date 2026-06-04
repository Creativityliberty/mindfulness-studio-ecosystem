import { createFileRoute } from '@tanstack/react-router'
import {
  Building2,
  Globe,
  Mail,
  Shield,
  FileText,
  Scale,
  Phone,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

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

interface InfoRowProps {
  label: string
  value: string | React.ReactNode
}
function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-3 border-b border-white/5 last:border-0">
      <span className="text-slate-500 text-sm font-medium shrink-0 sm:w-52">{label}</span>
      <span className="text-slate-200 text-sm font-semibold">{value}</span>
    </div>
  )
}

interface SectionProps {
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  children: React.ReactNode
}
function Section({ icon: Icon, iconColor, iconBg, title, children }: SectionProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.025] overflow-hidden transition-colors hover:border-white/10">
      <div className={`h-1 ${iconBg} opacity-60`} />
      <div className="p-7 md:p-9 space-y-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl border border-white/10 ${iconBg} bg-opacity-20`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        <div className="text-slate-400 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-black text-slate-200">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <div className="relative pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <a href="/" className="hover:text-slate-300 transition-colors">Accueil</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Mentions légales</span>
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">
              <Scale className="h-3.5 w-3.5 text-indigo-400" />
              Légal
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Mentions Légales
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance en l'économie
              numérique.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 max-w-4xl pb-28 space-y-5">
        <Section
          icon={Building2}
          iconColor="text-indigo-400"
          iconBg="bg-indigo-500/20"
          title="Éditeur du site"
        >
          <div className="divide-y divide-white/5">
            <InfoRow label="Raison sociale" value="Mindfulness Studio SAS" />
            <InfoRow label="Capital social" value="5 000 €" />
            <InfoRow label="Siège social" value="12 Rue de la Paix, 75001 Paris, France" />
            <InfoRow label="SIRET" value="123 456 789 00012" />
            <InfoRow label="N° TVA intracommunautaire" value="FR 12 123456789" />
            <InfoRow label="Directeur de la publication" value="Fabienne Dupont" />
          </div>
        </Section>

        <Section
          icon={Globe}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/20"
          title="Hébergeur"
        >
          <div className="divide-y divide-white/5">
            <InfoRow label="Société" value="OVH SAS" />
            <InfoRow label="Adresse" value="2 rue Kellermann, 59100 Roubaix, France" />
            <InfoRow
              label="Site web"
              value={
                <a
                  href="https://www.ovh.com"
                  className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.ovh.com <ExternalLink className="h-3 w-3" />
                </a>
              }
            />
          </div>
        </Section>

        <Section
          icon={Mail}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/20"
          title="Contact"
        >
          <div className="divide-y divide-white/5">
            <InfoRow
              label="Email"
              value={
                <a
                  href="mailto:contact@mindfulness-studio.com"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  contact@mindfulness-studio.com
                </a>
              }
            />
            <InfoRow
              label="Téléphone"
              value={
                <a href="tel:+33123456789" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  +33 1 23 45 67 89
                </a>
              }
            />
            <InfoRow label="Horaires" value="Lundi – Vendredi, 9h – 18h" />
          </div>
        </Section>

        <Section
          icon={Shield}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/20"
          title="Propriété intellectuelle"
        >
          <div className="space-y-4">
            <p>
              L'ensemble des contenus présents sur ce site — textes, images, vidéos, logos, sons et
              logiciels — est la propriété exclusive de Mindfulness Studio ou de ses partenaires,
              protégé par les lois françaises et internationales relatives à la propriété
              intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation ou modification sans autorisation écrite préalable
              de Mindfulness Studio est strictement interdite et poursuivie conformément aux articles
              L.335-2 et suivants du Code de Propriété Intellectuelle.
            </p>
          </div>
        </Section>

        <Section
          icon={FileText}
          iconColor="text-rose-400"
          iconBg="bg-rose-500/20"
          title="Responsabilité"
        >
          <div className="space-y-4">
            <p>
              Les informations contenues sur ce site sont aussi précises que possible et le site est
              régulièrement mis à jour. Mindfulness Studio ne saurait être tenu responsable des
              inexactitudes, omissions ou lacunes pouvant subsister.
            </p>
            <p>
              Des espaces interactifs sont mis à disposition des utilisateurs. Mindfulness Studio se
              réserve le droit de supprimer, sans mise en demeure préalable, tout contenu
              contrevenant à la législation applicable en France.
            </p>
          </div>
        </Section>

        <div className="flex items-center justify-center gap-2 pt-6 text-xs text-slate-600">
          <FileText className="h-3.5 w-3.5" />
          Dernière mise à jour : Juin 2026
        </div>
      </div>
    </main>
  )
}
