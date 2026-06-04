import React from "react";
import { Sidebar } from "./Sidebar";
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Globe, 
  CheckCircle2, 
  Lock, 
  Play, 
  Layout, 
  FileText, 
  Headphones,
  Sparkles,
  Receipt
} from "lucide-react";

export default function CheckoutCoursePage({ 
  onBackToDashboard,
  onNavigate 
}: { 
  onBackToDashboard: () => void;
  onNavigate?: (view: any) => void;
}) {
  const course = {
    title: "Copywriting avancé",
    subtitle:
      "Apprenez à structurer une offre, écrire une promesse forte et créer des pages qui convertissent.",
    price: "149 €",
    fullPrice: "199 €",
    instructor: "Nümtema",
    duration: "5h 20",
    modules: 4,
    lessons: 12,
    lives: 3,
    pdfs: 9,
    audios: 6,
  };

  const included = [
    "Accès immédiat à toute la formation",
    "Lives et replays inclus selon les modules",
    "Supports PDF téléchargeables",
    "Versions audio sur certaines leçons",
    "Quiz par module",
    "Certificat de fin de parcours",
  ];

  const paymentMethods = [
    {
      id: "polar",
      name: "Polar Checkout",
      description:
        "Paiement principal intégré pour carte bancaire et gestion propre du checkout.",
      icon: <CreditCard className="h-6 w-6" />,
      recommended: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      description:
        "Paiement rapide avec compte PayPal ou selon disponibilité locale.",
      icon: <span className="text-xl font-bold italic text-blue-600">P</span>,
      recommended: false,
    },
  ];

  const reassurance = [
    {
      icon: <Lock className="h-5 w-5 text-slate-600" />,
      title: "Paiement sécurisé",
      text: "Checkout protégé avec flux de paiement externe fiable.",
    },
    {
      icon: <Zap className="h-5 w-5 text-slate-600" />,
      title: "Accès immédiat",
      text: "La formation est débloquée juste après validation du paiement.",
    },
    {
      icon: <Globe className="h-5 w-5 text-slate-600" />,
      title: "Paiement flexible",
      text: "Carte bancaire et alternative PayPal selon votre préférence.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Dashboard" onNavigate={onNavigate} />

        <main className="min-w-0 flex-1 px-8 py-8">
          <div className="mb-6 flex items-center gap-3 text-sm text-slate-500">
            <button 
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 font-medium text-slate-700 shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au dashboard
            </button>
            <span>/</span>
            <span className="text-slate-900 font-medium">Achat formation</span>
          </div>

          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Checkout formation
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Finaliser l’achat</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                Un écran de paiement propre, rassurant et simple. L’idée : l’utilisateur choisit son mode de paiement, vérifie ce qu’il obtient, puis passe sur Polar ou PayPal sans friction.
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
                <div className="grid gap-6 lg:grid-cols-[160px_1fr] lg:items-center">
                  <div className="flex h-40 items-center justify-center rounded-[24px] bg-slate-200 text-sm font-medium text-slate-500 overflow-hidden relative">
                    <img 
                      src="https://picsum.photos/seed/copywriting/400/400" 
                      alt="Cover" 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/10" />
                  </div>
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge icon={<Zap className="h-3 w-3" />} label="Offre en promotion" />
                      <Badge icon={<Play className="h-3 w-3" />} label={`${course.lessons} leçons`} subtle />
                      <Badge icon={<Layout className="h-3 w-3" />} label={`${course.modules} modules`} subtle />
                    </div>
                    <h3 className="text-2xl font-bold">{course.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{course.subtitle}</p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <MiniInfo icon={<Play className="h-4 w-4" />} label="Durée" value={course.duration} />
                      <MiniInfo icon={<Layout className="h-4 w-4" />} label="Modules" value={`${course.modules}`} />
                      <MiniInfo icon={<FileText className="h-4 w-4" />} label="PDF" value={`${course.pdfs}`} />
                      <MiniInfo icon={<Headphones className="h-4 w-4" />} label="Audios" value={`${course.audios}`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">Choisir le paiement</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Le bouton final redirige ensuite vers le flux du provider choisi.
                    </p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    2 méthodes disponibles
                  </div>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`rounded-[24px] border p-5 cursor-pointer ${
                        method.recommended
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-900"
                      }`}
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                              method.recommended ? "bg-white/10" : "bg-white shadow-sm"
                            }`}
                          >
                            {method.icon}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-lg font-semibold">{method.name}</h4>
                              {method.recommended && (
                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/10">
                                  Recommandé
                                </span>
                              )}
                            </div>
                            <p className={`mt-2 text-sm leading-6 ${method.recommended ? "text-slate-200" : "text-slate-600"}`}>
                              {method.description}
                            </p>
                          </div>
                        </div>

                        <button
                          className={`rounded-2xl px-5 py-3 text-sm font-bold ${
                            method.recommended
                              ? "bg-white text-slate-900"
                              : "border border-slate-300 bg-white text-slate-800"
                          }`}
                        >
                          Payer avec {method.name}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {reassurance.map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-lg">
                      {item.icon}
                    </div>
                    <h4 className="text-base font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Résumé de commande</h3>
                  <Receipt className="h-5 w-5 text-slate-400" />
                </div>

                <div className="space-y-4">
                  <Row label="Formation" value={course.title} />
                  <Row label="Formateur" value={course.instructor} />
                  <Row label="Prix initial" value={course.fullPrice} muted />
                  <Row label="Prix aujourd’hui" value={course.price} strong />
                </div>

                <div className="my-5 border-t border-dashed border-slate-200" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Total à payer</p>
                    <p className="mt-1 text-3xl font-bold">{course.price}</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                    Économie de 50 €
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Ce qui est inclus</h3>
                <div className="mt-4 space-y-3">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-600 shrink-0" />
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">Paiement</p>
                      <h3 className="text-xl font-bold">Passage sécurisé</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    Dans le produit final, ce bouton peut ouvrir Polar en priorité, puis proposer PayPal en alternative selon le scénario choisi.
                  </p>
                  <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-900">
                    <CreditCard className="h-4 w-4" />
                    Continuer vers le paiement
                  </button>
                </div>
                {/* Subtle background glow */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function Badge({
  label,
  subtle = false,
  icon,
}: {
  label: string;
  subtle?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        subtle
          ? "border border-slate-200 bg-white text-slate-600 shadow-sm"
          : "bg-slate-900 text-white"
      }`}
    >
      {icon}
      {label}
    </span>
  );
}

function MiniInfo({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 ring-1 ring-slate-200 shadow-sm">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Row({
  label,
  value,
  muted = false,
  strong = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={`text-sm ${
          strong
            ? "font-bold text-slate-900"
            : muted
            ? "font-medium text-slate-400 line-through"
            : "font-semibold text-slate-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
