import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  HeadphonesIcon,
  BookOpen,
  Users,
  Gem,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { ENV } from '@/config/env'

export const Route = createFileRoute('/_layout/contact')({
  head: () => ({
    meta: [
      { title: 'Contact — Mindfulness Studio' },
      {
        name: 'description',
        content:
          "Contactez l'équipe Mindfulness Studio : support, questions sur les formations, partenariats. Réponse garantie sous 24h.",
      },
      { name: 'robots', content: 'index, follow' },
    ],
  }),
  component: ContactPage,
})

const contactCards = [
  {
    icon: Mail,
    label: 'Email support',
    value: 'contact@mindfulness-studio.com',
    detail: 'Réponse sous 24h ouvrées',
    href: 'mailto:contact@mindfulness-studio.com',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/15 border-indigo-500/20',
    accent: 'from-indigo-500/10',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+33 1 23 45 67 89',
    detail: 'Lun – Ven, 9h – 18h',
    href: 'tel:+33123456789',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15 border-emerald-500/20',
    accent: 'from-emerald-500/10',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: '12 Rue de la Paix',
    detail: '75001 Paris, France',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/15 border-amber-500/20',
    accent: 'from-amber-500/10',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun – Ven : 9h – 18h',
    detail: 'Fermé week-ends & jours fériés',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/15 border-rose-500/20',
    accent: 'from-rose-500/10',
  },
]

const topics = [
  { icon: HeadphonesIcon, label: 'Support technique', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  { icon: BookOpen, label: 'Questions sur les formations', color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  { icon: Users, label: 'Partenariat & Presse', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { icon: Gem, label: 'Devenir formateur', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
]

function ContactPage() {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Veuillez remplir tous les champs obligatoires.' })
      return
    }
    if (!form.email.includes('@')) {
      setStatus({ type: 'error', message: 'Adresse email invalide.' })
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setStatus({ type: 'success', message: 'Message envoyé ! Notre équipe vous répondra sous 24h.' })
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-slate-200">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[140px]" />
      </div>

      {/* Hero */}
      <div className="relative pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <a href="/" className="hover:text-slate-300 transition-colors">Accueil</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-300">Contact</span>
          </div>

          <div className="space-y-5 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">
              <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
              Nous sommes là pour vous
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Contactez-nous
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Une question sur une formation, un problème technique ou un projet de partenariat ?
              Notre équipe vous répond dans les meilleurs délais.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="relative container mx-auto px-6 max-w-5xl pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((card, i) => (
            <div
              key={i}
              className={`rounded-3xl border border-white/5 bg-gradient-to-br ${card.accent} to-transparent p-6 space-y-4 hover:border-white/10 transition-all`}
            >
              <div className={`p-3 rounded-2xl border ${card.iconBg} w-fit`}>
                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">{card.label}</p>
                {card.href ? (
                  <a href={card.href} className="text-white font-bold text-sm hover:underline block">
                    {card.value}
                  </a>
                ) : (
                  <p className="text-white font-bold text-sm">{card.value}</p>
                )}
                <p className="text-xs text-slate-600 mt-0.5">{card.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form + Topics */}
      <div className="relative container mx-auto px-6 max-w-5xl pb-28 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar topics */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Votre question concerne…</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sélectionnez un sujet dans le formulaire pour nous aider à vous orienter plus rapidement.
              </p>
            </div>

            <div className="space-y-3">
              {topics.map((topic, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3.5 p-4 rounded-2xl border hover:scale-[1.02] transition-all cursor-default ${topic.color}`}
                >
                  <topic.icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-semibold text-slate-200">{topic.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-indigo-500/10 bg-indigo-500/5 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/20">
                  <Users className="h-4 w-4 text-indigo-400" />
                </div>
                <p className="text-sm font-bold text-indigo-300">Déjà client ?</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accédez directement à notre support depuis votre tableau de bord pour un traitement prioritaire.
              </p>
              <a
                href={`${ENV.PLATFORM_URL}/login`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors mt-1"
              >
                Se connecter
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/5 bg-white/[0.025] overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-indigo-500/60 via-violet-500/40 to-transparent" />
              <div className="p-8 md:p-10 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Envoyez-nous un message</h2>
                  <p className="text-sm text-slate-500 mt-1">Réponse garantie sous 24h ouvrées.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {status && (
                    <div
                      className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        status.type === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm font-medium">{status.message}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Nom complet <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/8 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jean@exemple.com"
                        className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/8 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/8 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all appearance-none"
                    >
                      <option value="" className="bg-zinc-900">— Choisissez un sujet —</option>
                      <option value="support" className="bg-zinc-900">Support technique</option>
                      <option value="formations" className="bg-zinc-900">Questions sur les formations</option>
                      <option value="partenariat" className="bg-zinc-900">Partenariat & Presse</option>
                      <option value="formateur" className="bg-zinc-900">Devenir formateur</option>
                      <option value="facturation" className="bg-zinc-900">Facturation & Paiements</option>
                      <option value="autre" className="bg-zinc-900">Autre</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Décrivez votre demande en détail…"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/8 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-13 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:opacity-90 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/30 hover:scale-[1.02]"
                  >
                    {loading ? (
                      <span className="animate-pulse">Envoi en cours…</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-600 text-center">
                    En soumettant ce formulaire, vous acceptez notre{' '}
                    <a href="/confidentialite" className="text-slate-500 underline hover:text-slate-400 transition-colors">
                      Politique de Confidentialité
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
