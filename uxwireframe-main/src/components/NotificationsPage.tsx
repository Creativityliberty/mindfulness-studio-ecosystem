import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { 
  Bell, 
  Megaphone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  Check,
  Clock
} from "lucide-react";

export default function NotificationsPage({ 
  onNavigate 
}: { 
  onNavigate?: (view: any) => void;
}) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Annonce",
      title: "Nouveau module disponible",
      message: "Le module 3 de Copywriting avancé est maintenant disponible.",
      date: "Aujourd’hui",
      unread: true,
      icon: <Megaphone className="h-4 w-4" />
    },
    {
      id: 2,
      type: "Discussion",
      title: "Réponse à votre question",
      message: "Le formateur a répondu à votre question sur la leçon 2.",
      date: "Hier",
      unread: true,
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      id: 3,
      type: "Quiz",
      title: "Quiz débloqué",
      message: "Vous pouvez maintenant passer le quiz du module 2.",
      date: "Il y a 2 jours",
      unread: false,
      icon: <CheckCircle2 className="h-4 w-4" />
    },
    {
      id: 4,
      type: "Système",
      title: "Paiement confirmé",
      message: "Votre achat a bien été validé. Accès débloqué.",
      date: "Il y a 5 jours",
      unread: false,
      icon: <ShieldCheck className="h-4 w-4" />
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Notifications" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                <Bell className="h-3 w-3 text-slate-500" />
                Notifications
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Centre de notifications</h2>
              <p className="mt-3 text-slate-600 max-w-2xl text-base leading-7">
                Suivez les annonces des formateurs, les réponses aux discussions et les mises à jour importantes de vos formations.
              </p>
            </div>

            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm"
            >
              <Check className="h-4 w-4" />
              Tout marquer comme lu
            </button>
          </div>

          <div className="space-y-4 max-w-4xl">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`relative rounded-[28px] border p-6 ${
                  notif.unread
                    ? "border-slate-900 bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5"
                    : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    notif.unread ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"
                  }`}>
                    {notif.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {notif.type}
                      </span>
                      {notif.unread && (
                        <span className="flex h-2 w-2 rounded-full bg-slate-900" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{notif.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{notif.message}</p>
                    
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700">
                        <Eye className="h-3.5 w-3.5" />
                        Voir les détails
                      </button>
                      {notif.unread && (
                        <button 
                          onClick={() => markAsRead(notif.id)}
                          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Marquer comme lu
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    {notif.date}
                  </div>
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-slate-200 bg-white py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                  <Bell className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Aucune notification</h3>
                <p className="mt-2 text-sm text-slate-500">Vous êtes à jour ! Revenez plus tard pour de nouvelles annonces.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
