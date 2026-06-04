import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle,
  AlertCircle
} from "lucide-react";

export default function QuizModulePage({ 
  onBack, 
  onNavigate,
  onComplete
}: { 
  onBack?: () => void; 
  onNavigate?: (view: any) => void;
  onComplete?: (result: any) => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showError, setShowError] = useState(false);

  const currentModule = {
    title: "Module 2 — Structurer une offre",
    totalQuestions: 5,
  };

  const questions = [
    {
      id: 1,
      question: "Quel est l’objectif principal d’une promesse ?",
      options: [
        "Être vague pour attirer tout le monde",
        "Être claire et spécifique",
        "Parler uniquement de soi",
        "Ajouter du jargon complexe",
      ],
      correct: 1,
    },
    {
      id: 2,
      question: "Une bonne offre doit être :",
      options: [
        "Confuse",
        "Difficile à comprendre",
        "Claire et orientée résultat",
        "Très longue sans structure",
      ],
      correct: 2,
    },
    {
      id: 3,
      question: "Quelle est la première étape pour structurer une offre ?",
      options: [
        "Définir le prix",
        "Identifier la douleur client",
        "Créer un logo",
        "Acheter de la publicité",
      ],
      correct: 1,
    },
    {
      id: 4,
      question: "Le copywriting sert principalement à :",
      options: [
        "Remplir du texte pour le SEO",
        "Convaincre et faire passer à l'action",
        "Écrire des romans",
        "Faire de la poésie",
      ],
      correct: 1,
    },
    {
      id: 5,
      question: "Un 'Call to Action' (CTA) efficace doit être :",
      options: [
        "Caché en bas de page",
        "Visible et incitatif",
        "Optionnel",
        "Écrit en tout petit",
      ],
      correct: 1,
    },
  ];

  const handleSelect = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
    setShowError(false);
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] === undefined) {
      setShowError(true);
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate results
      let correctCount = 0;
      questions.forEach((q, index) => {
        if (answers[index] === q.correct) {
          correctCount++;
        }
      });
      const score = Math.round((correctCount / questions.length) * 100);
      onComplete?.({
        score,
        passed: score >= 80,
        correct: correctCount,
        total: questions.length,
        module: currentModule.title
      });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Mes formations" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-4xl">
            <header className="mb-10 flex items-center justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  <HelpCircle className="h-3 w-3" />
                  Quiz du module
                </div>
                <h1 className="text-3xl font-black tracking-tight">{currentModule.title}</h1>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-400">Progression</div>
                <div className="mt-1 text-lg font-black text-slate-900">
                  {currentQuestionIndex + 1} <span className="text-slate-300">/</span> {questions.length}
                </div>
              </div>
            </header>

            {/* Progress Bar */}
            <div className="mb-10 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div 
                className="h-full bg-slate-900" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} 
              />
            </div>

            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
                    {currentQuestionIndex + 1}
                  </div>
                  <h2 className="text-2xl font-bold leading-snug text-slate-900">
                    {currentQuestion.question}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`group relative w-full overflow-hidden rounded-[24px] border-2 p-6 text-left ${
                        answers[currentQuestionIndex] === i
                          ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                          : "border-slate-100 bg-slate-50"
                      }`}
                    >
                      <div className="relative flex items-center gap-5">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          answers[currentQuestionIndex] === i
                            ? "bg-white/20 text-white"
                            : "bg-white text-slate-400"
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-lg font-bold">{option}</span>
                        {answers[currentQuestionIndex] === i && (
                          <div className="ml-auto">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {showError && (
                  <div className="mt-6 flex items-center gap-2 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-600">
                    <AlertCircle className="h-4 w-4" />
                    Veuillez sélectionner une réponse avant de continuer.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-600"
              >
                Quitter
              </button>
              
              <div className="flex gap-4">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-600"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Précédent
                  </button>
                )}
                
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-2xl bg-slate-900 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/20"
                >
                  {currentQuestionIndex === questions.length - 1 ? "Terminer le quiz" : "Suivant"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
