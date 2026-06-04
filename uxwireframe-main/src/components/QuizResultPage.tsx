import React from "react";
import { Sidebar } from "./Sidebar";
import { 
  Trophy, 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Award,
  ChevronRight,
  Star
} from "lucide-react";

interface QuizResult {
  score: number;
  passed: boolean;
  correct: number;
  total: number;
  module: string;
}

export default function QuizResultPage({ 
  result,
  onNavigate,
  onRetry
}: { 
  result?: QuizResult;
  onNavigate?: (view: any) => void;
  onRetry?: () => void;
}) {
  // Fallback if result is missing
  const finalResult = result || {
    score: 0,
    passed: false,
    correct: 0,
    total: 5,
    module: "Module inconnu",
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Mes formations" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8 flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="relative overflow-hidden rounded-[40px] bg-white p-12 shadow-xl border border-slate-200 text-center">
              {/* Decorative background elements */}
              <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-10 ${finalResult.passed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <div className={`absolute -left-20 -bottom-20 h-64 w-64 rounded-full blur-3xl opacity-10 ${finalResult.passed ? 'bg-blue-500' : 'bg-orange-500'}`} />

              {/* RESULT ICON */}
              <div className="relative mb-8 flex justify-center">
                {finalResult.passed ? (
                  <div className="relative">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                      <Trophy className="h-12 w-12" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <XCircle className="h-12 w-12" />
                  </div>
                )}
              </div>

              {/* TITLE & MODULE */}
              <div className="relative mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight">
                  {finalResult.passed ? "Félicitations !" : "Pas tout à fait..."}
                </h1>
                <p className="mt-3 text-lg font-medium text-slate-500">
                  {finalResult.passed ? "Vous avez brillamment réussi le quiz." : "Vous n'avez pas atteint le score minimum requis."}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-bold text-slate-600">
                  <Award className="h-4 w-4" />
                  {finalResult.module}
                </div>
              </div>

              {/* SCORE CARD */}
              <div className="relative mb-10 grid grid-cols-2 gap-6">
                <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                  <div className={`text-5xl font-black ${finalResult.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {finalResult.score}%
                  </div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Score obtenu</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                  <div className="text-5xl font-black text-slate-900">
                    {finalResult.correct}/{finalResult.total}
                  </div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Réponses correctes</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="relative flex flex-wrap justify-center gap-4">
                {!finalResult.passed && (
                  <button 
                    onClick={onRetry}
                    className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Refaire le quiz
                  </button>
                )}

                {finalResult.passed && (
                  <button 
                    onClick={() => onNavigate?.("certificates")}
                    className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20"
                  >
                    <Award className="h-4 w-4" />
                    Voir le certificat
                  </button>
                )}

                <button 
                  onClick={() => onNavigate?.("dashboard")}
                  className="flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/20"
                >
                  Continuer
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* NEXT STEP BANNER */}
            {finalResult.passed && (
              <div className="mt-8 flex items-center justify-between rounded-[32px] bg-slate-900 p-8 text-white shadow-xl">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Module validé avec succès</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Félicitations. Vous avez débloqué la suite de la formation.
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-slate-600" />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
