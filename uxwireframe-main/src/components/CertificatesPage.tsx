import React from "react";
import { Sidebar } from "./Sidebar";
import { 
  Award, 
  Download, 
  Eye, 
  Search, 
  Trophy, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from "lucide-react";

export default function CertificatesPage({ 
  onBackToDashboard, 
  onNavigate 
}: { 
  onBackToDashboard: () => void; 
  onNavigate?: (view: any) => void 
}) {
  const certificates = [
    {
      id: 1,
      title: "Copywriting avancé",
      date: "12 Mars 2026",
      score: "92%",
      status: "Validé",
    },
    {
      id: 2,
      title: "SEO stratégique",
      date: "28 Février 2026",
      score: "88%",
      status: "Validé",
    },
    {
      id: 3,
      title: "Tunnel de vente",
      date: "En cours",
      score: "--",
      status: "Non obtenu",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Mes certificats" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-6xl">
            {/* Header Section */}
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                  <Award className="h-3 w-3 text-slate-500" />
                  Certificats officiels
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Mes certificats</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  Retrouvez ici tous les certificats obtenus après validation des formations. Vous pouvez les consulter ou les télécharger pour valoriser vos compétences.
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher un diplôme..." 
                  className="w-full md:w-64 rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="relative flex flex-col rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <Clock className="h-3 w-3" />
                      {cert.date}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        cert.status === "Validé"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
                      }`}
                    >
                      {cert.status === "Validé" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {cert.status}
                    </span>
                  </div>

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-200">
                    <Trophy className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold leading-tight text-slate-900">
                    {cert.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4 text-sm">
                    <span className="font-medium text-slate-500">Score de réussite</span>
                    <span className={`font-bold ${cert.status === "Validé" ? "text-emerald-600" : "text-slate-400"}`}>
                      {cert.score}
                    </span>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700">
                      <Eye className="h-3.5 w-3.5" />
                      Voir
                    </button>
                    <button
                      disabled={cert.status !== "Validé"}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-bold ${
                        cert.status === "Validé"
                          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Télécharger
                    </button>
                  </div>
                </div>
              ))}

              {/* Next Achievement Placeholder */}
              <div className="flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Award className="h-7 w-7 text-slate-200" />
                </div>
                <h4 className="text-base font-bold text-slate-400">Prochain objectif</h4>
                <p className="mt-2 text-xs font-medium text-slate-400 leading-relaxed">
                  Continuez votre progression pour <br /> débloquer de nouveaux diplômes.
                </p>
                <button 
                  onClick={onBackToDashboard}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-slate-900"
                >
                  Reprendre les cours
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
