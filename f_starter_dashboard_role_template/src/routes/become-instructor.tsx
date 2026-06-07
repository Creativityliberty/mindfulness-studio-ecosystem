import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { HeaderVitrine } from '@/components/header-vitrine'
import { FooterVitrine } from '@/components/footer-vitrine'
import * as React from 'react'
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Laptop,
  Users,
  Gem,
  Sprout,
  TrendingUp,
  Star,
  Clock,
  Globe,
  BadgeCheck,
  CircleCheck,
  Zap,
  BookOpen,
  ChevronDown,
  Search,
  Sparkles,
} from 'lucide-react'

export const Route = createFileRoute('/become-instructor')({
  component: BecomeInstructorPage,
})

/* ─── DATA ──────────────────────────────────────────────── */

const stats = [
  { value: '400+', label: 'Étudiants inscrits', icon: Users },
  { value: '12', label: 'Formateurs agréés', icon: BadgeCheck },
  { value: '70 %', label: 'Reversés aux formateurs', icon: TrendingUp },
  { value: '48h', label: 'Délai de validation moyen', icon: Clock },
]

const benefits = [
  {
    icon: Laptop,
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/15 border-indigo-500/20',
    glow: 'hover:border-indigo-500/30',
    title: 'Studio de cours premium',
    description:
      'Importez vos vidéos, audios, manuels PDF et configurez des quiz interactifs en quelques clics. Interface pensée pour les créateurs de contenu.',
  },
  {
    icon: Users,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/15 border-violet-500/20',
    glow: 'hover:border-violet-500/30',
    title: 'Audience qualifiée & engagée',
    description:
      'Vos formations sont visibles par des centaines d\'étudiants en recherche active d\'initiation, d\'harmonie et de soins énergétiques.',
  },
  {
    icon: TrendingUp,
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/15 border-pink-500/20',
    glow: 'hover:border-pink-500/30',
    title: 'Revenus directs à 70 %',
    description:
      'Percevez 70 % de chaque vente directement sur votre compte. Versements automatiques chaque mois, zéro intermédiaire supplémentaire.',
  },
  {
    icon: Sprout,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15 border-emerald-500/20',
    glow: 'hover:border-emerald-500/30',
    title: 'Accompagnement bienveillant',
    description:
      'Bénéficiez d\'une validation personnelle par Fabienne pour garantir la vibration et le sérieux de vos formations. Vous n\'êtes jamais seul.',
  },
  {
    icon: Globe,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/15 border-cyan-500/20',
    glow: 'hover:border-cyan-500/30',
    title: 'Visibilité internationale',
    description:
      'Catalogue optimisé pour le référencement naturel. Vos formations sont accessibles depuis la France, le Québec, la Belgique et la Suisse.',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/15 border-amber-500/20',
    glow: 'hover:border-amber-500/30',
    title: 'Paiements 100 % sécurisés',
    description:
      'Traitement via Stripe avec certification PCI-DSS. Vos gains sont protégés, tracés en temps réel et versés sans délai.',
  },
]

const steps = [
  {
    number: '01',
    icon: Search,
    iconColor: 'text-indigo-400',
    bg: 'border-indigo-500/20 from-indigo-500/10 to-transparent',
    title: 'Complétez votre profil',
    description:
      'Renseignez vos spécialités, votre parcours et votre philosophie d\'enseignement. Vos futurs élèves choisiront le praticien qui leur correspond.',
  },
  {
    number: '02',
    icon: BookOpen,
    iconColor: 'text-violet-400',
    bg: 'border-violet-500/20 from-violet-500/10 to-transparent',
    title: 'Créez vos formations',
    description:
      'Bâtissez votre syllabus, organisez vos chapitres, téléversez vos supports multimédias et rédigez vos descriptions avec notre éditeur intuitif.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    iconColor: 'text-pink-400',
    bg: 'border-pink-500/20 from-pink-500/10 to-transparent',
    title: 'Validation par Fabienne',
    description:
      'Votre dossier est évalué avec soin sous 48h. Une fois validé, votre formation rejoint le catalogue officiel de l\'Académie Mindfulness.',
  },
  {
    number: '04',
    icon: Zap,
    iconColor: 'text-emerald-400',
    bg: 'border-emerald-500/20 from-emerald-500/10 to-transparent',
    title: 'Publiez & encaissez',
    description:
      'Votre formation est en ligne, visible par toute la communauté. Chaque inscription génère un versement mensuel automatique sur votre compte.',
  },
]

const instructors = [
  {
    name: 'Sophie M.',
    role: 'Praticienne LaHoChi certifiée',
    experience: '8 ans d\'expérience',
    students: 142,
    rating: 4.9,
    color: 'from-indigo-500 to-violet-600',
    initials: 'SM',
    bio: 'Spécialisée dans la guérison énergétique par les fréquences LaHoChi, Sophie accompagne ses élèves vers une reconnexion profonde à leur être intérieur.',
    courses: 3,
  },
  {
    name: 'Jean-Marc V.',
    role: 'Maître en Sonothérapie',
    experience: '12 ans d\'expérience',
    students: 98,
    rating: 5.0,
    color: 'from-violet-500 to-pink-600',
    initials: 'JV',
    bio: 'Certifié par l\'Institut International de Sonothérapie, Jean-Marc utilise les bols tibétains, la voix et les diapasons pour harmoniser les champs d\'énergie.',
    courses: 4,
  },
  {
    name: 'Amandine L.',
    role: 'Coach Pleine Conscience',
    experience: '6 ans d\'expérience',
    students: 215,
    rating: 4.8,
    color: 'from-pink-500 to-rose-600',
    initials: 'AL',
    bio: 'Formée à la MBSR (Mindfulness-Based Stress Reduction), Amandine guide ses participants vers une présence totale et une paix intérieure durable.',
    courses: 5,
  },
]

const courses = [
  {
    title: 'Initiation au LaHoChi',
    subtitle: 'Formation complète en 6 modules',
    price: '150 €',
    students: 87,
    rating: 4.9,
    color: 'from-indigo-500/20 to-transparent',
    icon: Sparkles,
    iconColor: 'text-indigo-400',
  },
  {
    title: 'Lithothérapie Vibratoire',
    subtitle: 'Le Pouvoir des Cristaux — 8 leçons',
    price: '95 €',
    students: 64,
    rating: 4.8,
    color: 'from-violet-500/20 to-transparent',
    icon: Gem,
    iconColor: 'text-violet-400',
  },
  {
    title: 'Mindfulness & Pleine Conscience',
    subtitle: 'Programme MBSR en 10 semaines',
    price: '89 €',
    students: 143,
    rating: 5.0,
    color: 'from-emerald-500/20 to-transparent',
    icon: HeartHandshake,
    iconColor: 'text-emerald-400',
  },
]

const testimonials = [
  {
    name: 'Sophie M.',
    role: 'Praticienne LaHoChi',
    content:
      'En trois mois, j\'ai publié ma première formation et généré mes premiers revenus stables. L\'accompagnement de Fabienne et la clarté de la plateforme m\'ont permis de me concentrer uniquement sur l\'enseignement.',
    rating: 5,
    initials: 'SM',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    name: 'Jean-Marc V.',
    role: 'Maître en Sonothérapie',
    content:
      'La plateforme est d\'une qualité remarquable. Les outils de création de cours sont intuitifs, le support technique réactif et les étudiants vraiment engagés. Je recommande à tous les thérapeutes sérieux.',
    rating: 5,
    initials: 'JV',
    color: 'from-violet-500 to-pink-600',
  },
  {
    name: 'Amandine L.',
    role: 'Coach en Pleine Conscience',
    content:
      'Ce qui m\'a séduite, c\'est l\'alignement éthique de l\'académie. Ici, on parle vraiment de transmission et d\'élévation — pas juste de vente. Ma communauté d\'élèves a triplé en six mois.',
    rating: 5,
    initials: 'AL',
    color: 'from-pink-500 to-rose-600',
  },
]

const faqs = [
  {
    q: 'Qui peut devenir formateur sur l\'académie ?',
    a: 'Tout praticien certifié ou expérimenté dans un domaine du bien-être holistique : méditation, sonothérapie, LaHoChi, lithothérapie, yoga, reiki, etc. Nous évaluons chaque dossier avec soin pour garantir la qualité de l\'expérience offerte aux étudiants.',
  },
  {
    q: 'Comment sont calculés mes revenus ?',
    a: 'Vous percevez 70 % du prix de vente de chaque formation. Le versement est automatique chaque mois via virement bancaire. Vous disposez d\'un tableau de bord en temps réel pour suivre vos ventes et revenus.',
  },
  {
    q: 'Combien de temps faut-il pour créer une formation ?',
    a: 'Cela dépend de votre contenu. En moyenne, nos formateurs créent leur premier cours en 2 à 4 semaines. Notre studio de cours est conçu pour être intuitif : import vidéo, organisation des chapitres et prévisualisation en temps réel.',
  },
  {
    q: 'Puis-je proposer plusieurs formations ?',
    a: 'Absolument. Il n\'y a pas de limite au nombre de formations que vous pouvez créer. Chaque nouvelle formation est soumise au processus de validation habituel avant publication.',
  },
  {
    q: 'La création de compte est-elle payante ?',
    a: 'Non. L\'inscription comme formateur est entièrement gratuite. Vous ne payez rien jusqu\'à votre première vente.',
  },
]

/* ─── COMPOSANTS ─────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-semibold text-white text-sm leading-relaxed">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */

function BecomeInstructorPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-violet-900/12 rounded-full blur-[160px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-pink-900/8 rounded-full blur-[160px]" />
      </div>

      <HeaderVitrine />

      {/* ══════════ HERO ══════════ */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-300">
            <Gem className="h-3.5 w-3.5 text-indigo-400" />
            Plateforme holistique française
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight">
            Connectez-vous à la<br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              bonne énergie.
            </span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Rejoignez l'Académie Vibratoire de Fabienne. Partagez vos formations holistiques avec
            une communauté engagée et transformez votre expertise en source de revenus stable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 hover:opacity-95 text-white px-8 h-14 text-base font-bold shadow-xl shadow-violet-900/30 border-0 transition-all hover:scale-105"
            >
              <Link to="/register-instructor" className="flex items-center gap-2">
                Devenir formateur <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 h-14 text-base font-semibold"
            >
              <a href="#comment-ca-marche" className="flex items-center gap-2">
                Découvrir le processus
              </a>
            </Button>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {[
              { icon: CircleCheck, text: 'Inscription gratuite' },
              { icon: CircleCheck, text: '70 % reversés aux formateurs' },
              { icon: CircleCheck, text: 'Validation en 48h' },
              { icon: CircleCheck, text: 'Sans engagement' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                <item.icon className="h-4 w-4 text-emerald-400 shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="relative py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="flex justify-center mb-3">
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                    <stat.icon className="h-5 w-5 text-violet-400" />
                  </div>
                </div>
                <p className="text-4xl font-black tracking-tight">{stat.value}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ COMMENT ÇA MARCHE ══════════ */}
      <section id="comment-ca-marche" className="py-28 px-6 bg-white/[0.015] border-y border-white/5">
        <div className="container mx-auto max-w-5xl space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="inline-block bg-pink-500/10 text-pink-300 border border-pink-500/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Comment ça fonctionne ?
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Un parcours simple et lumineux
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              De votre inscription à vos premiers revenus, chaque étape est guidée et sécurisée.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className={`relative rounded-3xl border bg-gradient-to-br ${step.bg} p-6 space-y-4 hover:border-opacity-50 transition-all hover:-translate-y-1 duration-300`}>
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/8`}>
                    <step.icon className={`h-5 w-5 ${step.iconColor}`} />
                  </div>
                  <span className="text-4xl font-black text-white/5 leading-none">{step.number}</span>
                </div>
                <h4 className="font-bold text-lg text-white">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ AVANTAGES ══════════ */}
      <section className="py-28 px-6">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="inline-block bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Vos avantages
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Pourquoi enseigner ici ?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Un écosystème haut de gamme conçu pour que vous puissiez vous concentrer uniquement
              sur ce qui compte : la transmission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`group rounded-3xl border border-white/5 bg-white/[0.025] p-7 space-y-4 transition-all duration-300 ${b.glow} hover:shadow-xl hover:-translate-y-1`}
              >
                <div className={`p-3 rounded-2xl border ${b.iconBg} w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <b.icon className={`h-5 w-5 ${b.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NOS FORMATEURS ══════════ */}
      <section className="py-28 px-6 bg-white/[0.015] border-y border-white/5">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="inline-block bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Nos formateurs
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Rencontrez nos enseignants
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Des praticiens certifiés et expérimentés qui ont choisi l'Académie pour partager
                leur savoir-faire vibratoire.
              </p>
            </div>
            <Link
              to="/register-instructor"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Voir tous les formateurs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instructors.map((inst, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/5 bg-white/[0.025] overflow-hidden hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Cover gradient */}
                <div className={`h-28 bg-gradient-to-br ${inst.color} opacity-80`} />

                <div className="p-6 space-y-4 -mt-10">
                  {/* Avatar */}
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-xl font-black text-white shadow-lg border-4 border-black`}>
                    {inst.initials}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white">{inst.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{inst.role}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{inst.experience}</p>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{inst.bio}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {inst.students} élèves
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" /> {inst.courses} cours
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-amber-400">{inst.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EXEMPLES DE COURS ══════════ */}
      <section className="py-28 px-6">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="inline-block bg-violet-500/10 text-violet-300 border border-violet-500/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Cours à la demande
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Développez vos connaissances
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Des exemples de formations publiées par nos formateurs — inspirez-vous pour créer
                votre propre programme.
              </p>
            </div>
            <a
              href="#"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Voir tous les cours <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <div
                key={i}
                className={`rounded-3xl border border-white/5 bg-gradient-to-br ${course.color} bg-white/[0.02] p-6 space-y-5 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/8 w-fit`}>
                  <course.icon className={`h-6 w-6 ${course.iconColor}`} />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-white leading-tight">{course.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{course.subtitle}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {course.rating}
                    </span>
                  </div>
                  <span className="text-lg font-black text-white">{course.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TÉMOIGNAGES ══════════ */}
      <section className="py-28 px-6 bg-white/[0.015] border-y border-white/5">
        <div className="container mx-auto max-w-5xl space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="inline-block bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Témoignages
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Nos formateurs témoignent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/5 bg-white/[0.025] p-7 space-y-5 hover:border-white/10 transition-all"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{t.content}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-black text-white`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="py-28 px-6">
        <div className="container mx-auto max-w-3xl space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-block bg-rose-500/10 text-rose-300 border border-rose-500/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Questions fréquentes
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Vous avez des questions ?
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA FINAL ══════════ */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/20 via-indigo-900/10 to-pink-900/10 p-12 md:p-16 text-center space-y-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-3xl pointer-events-none" />

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                <Gem className="h-3.5 w-3.5 text-violet-300" />
                Rejoignez l'académie
              </div>

              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                Prêt à commencer votre<br />
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  voyage d'enseignant ?
                </span>
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">
                Rejoignez nos formateurs vibratoires dès aujourd'hui. Partagez votre lumière,
                construisez votre communauté et transformez votre passion en revenus.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 hover:opacity-95 text-white px-10 h-14 text-base font-bold shadow-xl shadow-violet-900/40 border-0 transition-all hover:scale-105"
                >
                  <Link to="/register-instructor" className="flex items-center gap-2">
                    Créer mon espace enseignant <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 h-14 text-base font-semibold"
                >
                  <a href="#comment-ca-marche">Explorer le processus</a>
                </Button>
              </div>

              <p className="text-xs text-slate-500">
                Inscription gratuite · Validation sous 48h · Aucun engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterVitrine />
    </div>
  )
}
