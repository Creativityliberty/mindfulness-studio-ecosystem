import * as React from 'react'
import {
  Mail,
  ArrowRight,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Shield,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import logoTypo from '../assets/logo-typo.png'
import { ENV } from '@/config/env'

export function FooterVitrine({ className = '' }: { className?: string }) {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const brandName = 'Mindfulness Studio'
  const brandDescription =
    'Votre destination pour un éveil de conscience, un rééquilibrage énergétique et une vie plus sereine.'

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    if (!email.trim() || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Veuillez saisir une adresse email valide.' })
      return
    }
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setStatus({ type: 'success', message: 'Inscription à la newsletter réussie !' })
    setEmail('')
    setLoading(false)
  }

  const columns = [
    {
      title: 'Nos Formations',
      links: [
        { label: 'Tous les cours', href: `${ENV.VITRINE_URL}/formations` },
        { label: 'Méditation de Pleine Conscience', href: `${ENV.VITRINE_URL}/formations` },
        { label: 'Initiation au LaHoChi', href: `${ENV.VITRINE_URL}/formations` },
        { label: 'Voyages Sonores & Vibratoires', href: `${ENV.VITRINE_URL}/formations` },
      ],
    },
    {
      title: 'Académie',
      links: [
        { label: 'À propos de nous', href: `${ENV.VITRINE_URL}/` },
        { label: 'Espace Membre', href: '/login' },
        { label: 'Devenir Formateur', href: '/become-instructor' },
        { label: 'Notre Démarche', href: `${ENV.VITRINE_URL}/` },
      ],
    },
    {
      title: 'Légal & Support',
      links: [
        { label: 'Mentions Légales', href: `${ENV.VITRINE_URL}/mentions-legales` },
        { label: 'Conditions Générales', href: `${ENV.VITRINE_URL}/conditions-generales` },
        { label: 'Politique de Confidentialité', href: `${ENV.VITRINE_URL}/confidentialite` },
        { label: 'Contact', href: `${ENV.VITRINE_URL}/contact` },
      ],
    },
  ]

  return (
    <footer className={`relative border-t border-white/10 bg-black text-slate-200 mt-32 py-16 ${className}`}>
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 pb-12 border-b border-white/5">

          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <a href={`${ENV.VITRINE_URL}/`} className="inline-block">
                <img
                  src={logoTypo}
                  alt={brandName}
                  className="h-14 w-auto object-contain filter brightness-110"
                />
              </a>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                {brandDescription}
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Abonnez-vous à la newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 h-11 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-sm text-white placeholder:text-slate-600 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5 shrink-0 transition-all disabled:opacity-60"
                >
                  {loading ? '...' : <><span className="hidden sm:inline">S'abonner</span><ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
              {status && (
                <div className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${
                  status.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {status.type === 'success'
                    ? <CheckCircle2 className="h-4 w-4 shrink-0" />
                    : <AlertCircle className="h-4 w-4 shrink-0" />}
                  <span>{status.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-6">
            {columns.map((column, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider">
                  {column.title}
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {column.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-slate-600" />
            <p>© {new Date().getFullYear()} {brandName}. Tous droits réservés.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="h-[18px] w-[18px]" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Twitter className="h-[18px] w-[18px]" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Youtube className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
