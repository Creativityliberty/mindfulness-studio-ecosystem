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
  Sparkles,
  HeadphonesIcon,
  BookOpen,
} from 'lucide-react'
import { ENV } from '@/config/env'

export const Route = createFileRoute('/_layout/contact')({
  head: () => ({
    meta: [
      { title: 'Contact — Mindfulness Studio' },
      {
        name: 'description',
        content:
          'Contactez l\'équipe Mindfulness Studio : support, questions sur les formations, partenariats. Réponse garantie sous 24h.',
      },
      { name: 'robots', content: 'index, follow' },
    ],
  }),
  component: ContactPage,
})

interface ContactCard {
  icon: React.ReactNode
  title: string
  value: string
  detail: string
  href?: string
  color: string
}

function ContactPage() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
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
    setStatus({
      type: 'success',
      message: 'Message envoyé avec succès ! Notre équipe vous répondra sous 24h.',
    })
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  const contactCards: ContactCard[] = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      value: 'contact@mindfulness-studio.com',
      detail: 'Réponse garantie sous 24h ouvrées',
      href: 'mailto:contact@mindfulness-studio.com',
      color: 'text-primary bg-primary/10',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      detail: 'Lun – Ven, 9h – 18h',
      href: 'tel:+33123456789',
      color: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Adresse',
      value: '12 Rue de la Paix',
      detail: '75001 Paris, France',
      color: 'text-amber-400 bg-amber-500/10',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Horaires',
      value: 'Lun – Ven : 9h – 18h',
      detail: 'Fermé les week-ends et jours fériés',
      color: 'text-violet-400 bg-violet-500/10',
    },
  ]

  const topics = [
    { icon: <HeadphonesIcon className="h-4 w-4" />, label: 'Support technique' },
    { icon: <BookOpen className="h-4 w-4" />, label: 'Questions sur les formations' },
    { icon: <MessageSquare className="h-4 w-4" />, label: 'Partenariat & Presse' },
    { icon: <Sparkles className="h-4 w-4" />, label: 'Devenir formateur' },
  ]

  return (
    <main className="min-h-screen bg-black text-slate-200">
      {/* Hero */}
      <div className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
            <MessageSquare className="h-3.5 w-3.5" />
            Nous sommes là pour vous
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Contactez-nous
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Une question sur une formation, un problème technique ou un projet de partenariat ?
            Notre équipe vous répond dans les meilleurs délais.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="container mx-auto px-6 max-w-5xl pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactCards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 hover:border-white/10 transition-colors space-y-3"
            >
              <div className={`p-2.5 rounded-xl w-fit ${card.color}`}>{card.icon}</div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{card.title}</p>
                {card.href ? (
                  <a href={card.href} className="text-white font-bold text-sm hover:underline block mt-1">
                    {card.value}
                  </a>
                ) : (
                  <p className="text-white font-bold text-sm mt-1">{card.value}</p>
                )}
                <p className="text-xs text-slate-500 mt-0.5">{card.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form + Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Topics */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Votre question concerne…</h2>
              <p className="text-sm text-slate-500">
                Sélectionnez un sujet dans le formulaire pour nous aider à mieux vous orienter.
              </p>
            </div>
            <div className="space-y-3">
              {topics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/20 hover:bg-primary/5 transition-all group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    {topic.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {topic.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5 space-y-2">
              <p className="text-sm font-semibold text-primary">💡 Déjà client ?</p>
              <p className="text-xs text-slate-400">
                Accédez directement à notre support depuis votre tableau de bord pour un traitement
                prioritaire.
              </p>
              <a
                href={`${ENV.PLATFORM_URL}/login`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mt-1"
              >
                Se connecter →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Envoyez-nous un message</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Remplissez le formulaire ci-dessous, nous vous répondrons sous 24h.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {status && (
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
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
                    <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jean@exemple.com"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
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
                  <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Décrivez votre demande en détail…"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                >
                  {loading ? (
                    <span className="animate-pulse">Envoi en cours…</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Envoyer le message
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-600 text-center">
                  En soumettant ce formulaire, vous acceptez notre{' '}
                  <a href="/confidentialite" className="text-slate-500 underline hover:text-slate-400">
                    Politique de Confidentialité
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
