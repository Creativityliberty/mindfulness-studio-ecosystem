import { useState } from "react";
import { Sidebar } from "./Sidebar";

type LessonResourceKey = "live" | "pdf" | "audio";

export default function LessonResourceView({ onBack, onNavigate }: { onBack?: () => void; onNavigate?: (view: any) => void }) {
  const [activeTab, setActiveTab] = useState<LessonResourceKey>("live");

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Mes formations" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-5xl">
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500"
            >
              ← Retour à la leçon
            </button>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Module 2 — Structurer une offre</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">Leçon : Structurer une offre</h1>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-3">
              <Tab label="Live" active={activeTab === "live"} onClick={() => setActiveTab("live")} />
              <Tab label="PDF" active={activeTab === "pdf"} onClick={() => setActiveTab("pdf")} />
              <Tab label="Audio" active={activeTab === "audio"} onClick={() => setActiveTab("audio")} />
            </div>

            {/* CONTENT */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              {/* LIVE VIEW */}
              {activeTab === "live" && (
                <div>
                  <h2 className="mb-4 text-xl font-bold">Session live / replay</h2>
                  <div className="flex aspect-video items-center justify-center rounded-[24px] bg-slate-200 text-sm font-medium text-slate-500">
                    Player Live / Replay
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                      Rejoindre le live
                    </button>
                    <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700">
                      Voir le replay
                    </button>
                  </div>
                </div>
              )}

              {/* PDF VIEW */}
              {activeTab === "pdf" && (
                <div>
                  <h2 className="mb-4 text-xl font-bold">Support PDF</h2>
                  <div className="flex h-[600px] items-center justify-center rounded-[24px] bg-slate-200 text-sm font-medium text-slate-500">
                    Viewer PDF
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                      Télécharger
                    </button>
                    <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700">
                      Ouvrir en plein écran
                    </button>
                  </div>
                </div>
              )}

              {/* AUDIO VIEW */}
              {activeTab === "audio" && (
                <div>
                  <h2 className="mb-4 text-xl font-bold">Version audio</h2>
                  <div className="flex items-center justify-center rounded-[24px] bg-slate-200 p-10 text-sm font-medium text-slate-500">
                    Player Audio
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                      Télécharger audio
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-6 py-2.5 text-sm font-semibold ${
        active ? "bg-slate-900 text-white shadow-md shadow-slate-200" : "bg-slate-200 text-slate-600"
      }`}
    >
      {label}
    </button>
  );
}
