import * as React from 'react'
import { Mail, ArrowRight, Instagram, Linkedin, Twitter, Youtube, Shield, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ENV } from '@/config/env'

import logoTypo from '../../assets/logo-typo.png'

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  brandName?: string
  brandDescription?: string
  className?: string
}

export const Footer = ({
  brandName = 'Académie Vibratoire',
  brandDescription = 'Votre espace de reconnexion, de pleine conscience et d’épanouissement personnel.',
  className = '',
}: FooterProps) => {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null)

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
        { label: 'Tous les cours', href: '/formations' },
        { label: 'Méditation de Pleine Conscience', href: '/formations' },
        { label: 'Initiation au LaHoChi', href: '/formations' },
        { label: 'Voyages Sonores & Vibratoires', href: '/formations' },
      ],
    },
    {
      title: 'Académie',
      links: [
        { label: 'À propos de nous', href: '/' },
        { label: 'Espace Membre', href: `${ENV.PLATFORM_URL}/login` },
        { label: 'Devenir Formateur', href: `${ENV.PLATFORM_URL}/become-instructor` },
        { label: 'Notre Démarche', href: '/' },
      ],
    },
    {
      title: 'Légal & Support',
      links: [
        { label: 'Mentions Légales', href: '/mentions-legales' },
        { label: 'Conditions Générales', href: '/conditions-generales' },
        { label: 'Politique de Confidentialité', href: '/confidentialite' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ]

  return (
    <footer className={`relative border-t border-white/10 bg-black text-slate-200 mt-32 py-16 ${className}`}>
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2f4ea8]/40 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 pb-12 border-b border-white/5">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <a href="/" className="inline-block">
                <img src={logoTypo} alt={brandName} className="h-12 w-auto object-contain filter brightness-110" />
              </a>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                {brandDescription}
              </p>
            </div>

            {/* Newsletter form */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Abonnez-vous à la newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-white/5 border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-sm text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium flex items-center gap-1.5 shrink-0 transition-all"
                >
                  {loading ? '...' : <><span className="hidden sm:inline">S'abonner</span> <ArrowRight className="h-4 w-4" /></>}
                </Button>
              </form>
              {status && (
                <div className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${
                  status.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Spacer for big screens */}
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
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Twitter className="h-4.5 w-4.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Youtube className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
