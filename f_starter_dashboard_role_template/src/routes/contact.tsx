import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

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

  const contactInfo = [
    { icon: <Mail className="h-4 w-4" />, label: 'Email', value: 'contact@mindfulness-studio.com', href: 'mailto:contact@mindfulness-studio.com' },
    { icon: <Phone className="h-4 w-4" />, label: 'Téléphone', value: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
    { icon: <MapPin className="h-4 w-4" />, label: 'Adresse', value: '12 Rue de la Paix, 75001 Paris' },
    { icon: <Clock className="h-4 w-4" />, label: 'Horaires', value: 'Lun – Ven, 9h – 18h' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
            <MessageSquare className="h-3.5 w-3.5" />
            Support
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Contactez-nous</h1>
          <p className="text-muted-foreground max-w-xl">
            Notre équipe est disponible pour répondre à toutes vos questions. Réponse garantie sous 24h ouvrées.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {contactInfo.map((info, i) => (
            <Card key={i} className="rounded-2xl border-primary/10">
              <CardHeader className="pb-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary w-fit mb-1">{info.icon}</div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{info.label}</p>
              </CardHeader>
              <CardContent className="pt-0">
                {info.href ? (
                  <a href={info.href} className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-foreground">{info.value}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form */}
        <Card className="rounded-2xl border-primary/10 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Envoyez-nous un message</CardTitle>
            <p className="text-sm text-muted-foreground">Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {status && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-destructive/10 border-destructive/20 text-destructive'
                }`}>
                  {status.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" /> : <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />}
                  <span className="text-sm font-medium">{status.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.com"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">— Choisissez un sujet —</option>
                  <option value="support">Support technique</option>
                  <option value="formations">Questions sur les formations</option>
                  <option value="partenariat">Partenariat & Presse</option>
                  <option value="formateur">Devenir formateur</option>
                  <option value="facturation">Facturation & Paiements</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Décrivez votre demande en détail…"
                  className="rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl flex items-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Envoi en cours…</span>
                ) : (
                  <><Send className="h-4 w-4" /> Envoyer le message</>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                En soumettant ce formulaire, vous acceptez notre{' '}
                <a href="/confidentialite" className="underline hover:text-foreground transition-colors">
                  Politique de Confidentialité
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
