import React from "react";
import { Sidebar } from "./Sidebar";
import { 
  HelpCircle, 
  MessageCircle, 
  Send, 
  ChevronRight, 
  LifeBuoy,
  Mail,
  MessageSquare
} from "lucide-react";

export default function SupportPage({ 
  onNavigate 
}: { 
  onNavigate?: (view: any) => void;
}) {
  const faqs = [
    {
      q: "Comment accéder à une formation après paiement ?",
      a: "Une fois le paiement validé, la formation est immédiatement disponible dans 'Mes formations'.",
    },
    {
      q: "Je n’arrive pas à lancer une vidéo, que faire ?",
      a: "Vérifiez votre connexion, rechargez la page ou essayez un autre navigateur. Si le problème persiste, contactez le support.",
    },
    {
      q: "Comment obtenir mon certificat ?",
      a: "Vous devez compléter toutes les leçons et réussir le quiz final du module ou de la formation.",
    },
    {
      q: "Puis-je télécharger les ressources ?",
      a: "Oui, les PDF et audios sont disponibles selon les leçons. Utilisez les onglets dans le lecteur.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Support" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                <LifeBuoy className="h-3 w-3 text-slate-500" />
                Aide & Support
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Besoin d'aide ?</h2>
              <p className="mt-3 text-slate-600 max-w-2xl text-base leading-7">
                Trouvez rapidement des réponses à vos questions ou contactez l’équipe pour une assistance personnalisée. Nous sommes là pour vous accompagner.
              </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
              {/* FAQ Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-200">
                    <HelpCircle className="h-5 w-5 text-slate-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Foire aux questions</h3>
                </div>
                
                <div className="space-y-4">
                  {faqs.map((item, i) => (
                    <div 
                      key={i} 
                      className="group rounded-[24px] border border-slate-200 bg-white p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-bold text-slate-900 text-lg">{item.q}</p>
                        <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Form Section */}
              <section className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-slate-900">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Contacter le support</h3>
                      <p className="text-sm text-slate-500">Réponse sous 24h ouvrées</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <Field label="Sujet de votre demande" placeholder="Ex: Problème d’accès à une formation" icon={<MessageCircle className="h-4 w-4" />} />
                    <Field label="Votre adresse email" placeholder="lionel@example.com" icon={<Mail className="h-4 w-4" />} />
                    
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Message détaillé</label>
                      <textarea
                        placeholder="Décrivez votre problème avec le plus de détails possible..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium outline-none h-40"
                      />
                    </div>

                    <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/10">
                      <Send className="h-4 w-4" />
                      Envoyer ma demande
                    </button>
                  </div>
                </div>

                {/* Direct Contact Info */}
                <div className="rounded-[32px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
                  <h4 className="text-lg font-bold">Assistance directe</h4>
                  <p className="mt-2 text-sm text-slate-400">
                    Vous pouvez également nous contacter directement par email pour les urgences techniques.
                  </p>
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                    <Mail className="h-5 w-5 text-slate-300" />
                    <span className="text-sm font-bold">support@numtema.com</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ label, placeholder, icon }: { label: string; placeholder: string; icon?: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
        {icon}
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none"
      />
    </div>
  );
}
