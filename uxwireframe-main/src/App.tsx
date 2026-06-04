import { useState, useRef } from "react";
import StudentDashboardWireframe from "./components/StudentDashboardWireframe";
import LessonResourceView from "./components/LessonResourceView";
import CourseDetailPage from "./components/CourseDetailPage";
import LessonPlayerPage from "./components/LessonPlayerPage";
import QuizModulePage from "./components/QuizModulePage";
import CertificatesPage from "./components/CertificatesPage";
import PaymentHistoryPage from "./components/PaymentHistoryPage";
import CheckoutCoursePage from "./components/CheckoutCoursePage";
import CourseCatalogPage from "./components/CourseCatalogPage";
import ProfileSettingsPage from "./components/ProfileSettingsPage";
import NotificationsPage from "./components/NotificationsPage";
import SupportPage from "./components/SupportPage";
import MessagingPage from "./components/MessagingPage";
import QuizResultPage from "./components/QuizResultPage";

export default function App() {
  const [view, setView] = useState<"dashboard" | "lesson" | "course" | "player" | "quiz" | "certificates" | "payment-history" | "checkout" | "catalog" | "profile" | "notifications" | "support" | "messaging" | "quiz-result">("dashboard");
  const [lastQuizResult, setLastQuizResult] = useState<any>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const exportHTML = async () => {
    if (componentRef.current) {
      // Collect all styles from the current document
      const styleTags = Array.from(document.getElementsByTagName('style'))
        .map(style => style.outerHTML)
        .join('\n');
      
      // Fetch and inline external stylesheets for portability
      const linkElements = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
      let inlinedStyles = '';
      
      for (const link of linkElements) {
        try {
          const response = await fetch(link.href);
          if (response.ok) {
            const cssText = await response.text();
            inlinedStyles += `<style>\n${cssText}\n</style>\n`;
          } else {
            // Fallback to original link tag if fetch fails
            inlinedStyles += link.outerHTML + '\n';
          }
        } catch (e) {
          console.error('Failed to inline stylesheet:', link.href, e);
          inlinedStyles += link.outerHTML + '\n';
        }
      }

      // Create a clean clone of the component to export
      const clone = componentRef.current.cloneNode(true) as HTMLElement;
      
      const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nümtema Learn - ${view.charAt(0).toUpperCase() + view.slice(1)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  ${inlinedStyles}
  ${styleTags}
  <style>
    :root {
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    }
    body { 
      margin: 0; 
      padding: 0; 
      font-family: var(--font-sans);
      background-color: #f1f5f9;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    * { box-sizing: border-box; }
    #export-root {
      min-height: 100vh;
    }
    /* Remove any remaining transitions/animations in export */
    * { 
      transition: none !important; 
      animation: none !important; 
      transform: none !important; 
    }
  </style>
</head>
<body>
  <div id="export-root">
    ${clone.innerHTML}
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      a.href = url;
      a.download = `numtema-learn-${view}-${timestamp}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const [showVercelModal, setShowVercelModal] = useState(false);

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return <StudentDashboardWireframe onViewCourse={() => setView("course")} onNavigate={setView} />;
      case "lesson":
        return <LessonResourceView onBack={() => setView("player")} onNavigate={setView} />;
      case "course":
        return <CourseDetailPage onBack={() => setView("dashboard")} onStart={() => setView("player")} onNavigate={setView} />;
      case "player":
        return <LessonPlayerPage onOpenQuiz={() => setView("quiz")} onOpenResources={() => setView("lesson")} onNavigate={setView} />;
      case "quiz":
        return (
          <QuizModulePage 
            onBack={() => setView("player")} 
            onNavigate={setView} 
            onComplete={(result) => {
              setLastQuizResult(result);
              setView("quiz-result");
            }} 
          />
        );
      case "quiz-result":
        return (
          <QuizResultPage 
            result={lastQuizResult} 
            onNavigate={setView} 
            onRetry={() => setView("quiz")} 
          />
        );
      case "certificates":
        return <CertificatesPage onBackToDashboard={() => setView("dashboard")} onNavigate={setView} />;
      case "payment-history":
        return <PaymentHistoryPage onBackToDashboard={() => setView("dashboard")} onNavigate={setView} />;
      case "checkout":
        return <CheckoutCoursePage onBackToDashboard={() => setView("dashboard")} onNavigate={setView} />;
      case "catalog":
        return <CourseCatalogPage onNavigate={setView} />;
      case "profile":
        return <ProfileSettingsPage onNavigate={setView} />;
      case "notifications":
        return <NotificationsPage onNavigate={setView} />;
      case "support":
        return <SupportPage onNavigate={setView} />;
      case "messaging":
        return <MessagingPage onNavigate={setView} />;
      default:
        return <StudentDashboardWireframe onViewCourse={() => setView("course")} onNavigate={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-black shadow-lg shadow-slate-900/20">
            NL
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900">Nümtema Learn</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Preview</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <NavButton active={view === "dashboard"} onClick={() => setView("dashboard")} label="Dashboard" />
          <NavButton active={view === "player"} onClick={() => setView("player")} label="Player" />
          <NavButton active={view === "catalog"} onClick={() => setView("catalog")} label="Catalogue" />
          <NavButton active={view === "messaging"} onClick={() => setView("messaging")} label="Messages" />
          <NavButton active={view === "quiz"} onClick={() => setView("quiz")} label="Quiz" />
          <NavButton active={view === "certificates"} onClick={() => setView("certificates")} label="Certificats" />
          <NavButton active={view === "profile"} onClick={() => setView("profile")} label="Profil" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVercelModal(true)}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black uppercase tracking-widest text-slate-900 ring-1 ring-slate-200"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 22.525H0L12 1.475L24 22.525Z" />
            </svg>
            Publier
          </button>
          <button
            onClick={exportHTML}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-slate-900/20"
          >
            Exporter HTML
          </button>
        </div>
      </header>

      <div ref={componentRef} className="relative">
        {renderView()}
      </div>

      {/* Vercel Deployment Modal */}
      {showVercelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-6">
          <div className="w-full max-w-md overflow-hidden rounded-[40px] bg-white shadow-2xl">
            <div className="bg-slate-900 p-10 text-white">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                  <path d="M24 22.525H0L12 1.475L24 22.525Z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black tracking-tight">Publier sur Vercel</h3>
              <p className="mt-4 text-slate-400 font-medium leading-relaxed">
                Prêt à mettre votre plateforme en ligne ? Voici comment procéder :
              </p>
            </div>
            
            <div className="p-10 space-y-8">
              <div className="space-y-6">
                <Step number="1" text="Exportez votre projet au format ZIP via le menu Paramètres de l'éditeur." />
                <Step number="2" text="Importez le dossier sur votre compte GitHub." />
                <Step number="3" text="Connectez votre dépôt GitHub à Vercel." />
                <Step number="4" text="Vercel détectera automatiquement la configuration Vite et publiera votre site." />
              </div>

              <div className="rounded-3xl bg-slate-50 p-6 text-sm font-medium text-slate-600 ring-1 ring-slate-100">
                <strong>Note :</strong> L'export HTML inclut désormais tout le CSS (inliné) pour garantir un affichage parfait, même hors ligne ou sur un autre serveur.
              </div>

              <button
                onClick={() => setShowVercelModal(false)}
                className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-black uppercase tracking-widest text-white"
              >
                Compris
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest ${
        active 
          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
          : "text-slate-400"
      }`}
    >
      {label}
    </button>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-900">
        {number}
      </div>
      <p className="text-sm font-bold leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}
