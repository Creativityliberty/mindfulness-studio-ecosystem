import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { 
  Settings, 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  LogOut,
  Save,
  Trash2
} from "lucide-react";

export default function ProfileSettingsPage({ 
  onNavigate 
}: { 
  onNavigate?: (view: any) => void;
}) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Notifications email",
      description: "Recevoir les nouveautés, réponses et rappels de progression par email.",
      enabled: true,
    },
    {
      id: 2,
      title: "Annonces formateurs",
      description: "Recevoir les annonces publiées dans vos formations.",
      enabled: true,
    },
    {
      id: 3,
      title: "Rappels de reprise",
      description: "Recevoir un rappel si vous n’avez pas continué une formation depuis plusieurs jours.",
      enabled: false,
    },
    {
      id: 4,
      title: "Notifications quiz",
      description: "Recevoir une alerte quand un quiz ou un certificat est débloqué.",
      enabled: true,
    },
  ]);

  const toggleNotification = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const personalFields = [
    { label: "Prénom", value: "Lionel", icon: <User className="h-4 w-4" /> },
    { label: "Nom", value: "Nümtema", icon: <User className="h-4 w-4" /> },
    { label: "Email", value: "lionel@example.com", icon: <Mail className="h-4 w-4" /> },
    { label: "Téléphone", value: "+33 6 00 00 00 00", icon: <Phone className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Paramètres" onNavigate={onNavigate} />

        <main className="min-w-0 flex-1 px-8 py-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <Settings className="h-3 w-3 text-slate-500" />
                Profil & Paramètres
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Gérer votre compte</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                Ici, l’étudiant met à jour ses informations personnelles, change son mot de passe et choisit comment il souhaite être notifié.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/10">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </button>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <section className="space-y-6">
              {/* Personal Info */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-700 ring-1 ring-slate-200 shadow-inner">
                    L
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Lionel Nümtema</h3>
                    <p className="mt-1 text-sm font-medium text-slate-500">Étudiant actif • 3 formations en cours</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {personalFields.map((field) => (
                    <div key={field.label}>
                      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                        {field.icon}
                        {field.label}
                      </label>
                      <input
                        defaultValue={field.value}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Picture */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-slate-100">
                    <Camera className="h-5 w-5 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold">Photo de profil</h3>
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  Ajoutez ou modifiez votre avatar pour personnaliser votre espace étudiant.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">
                    Télécharger une photo
                  </button>
                  <button className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700">
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              {/* Security */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-slate-100">
                    <Lock className="h-5 w-5 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold">Sécurité</h3>
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  Changez votre mot de passe et gardez l’accès à votre compte sous contrôle.
                </p>

                <div className="mt-6 space-y-4">
                  <Field label="Mot de passe actuel" placeholder="••••••••••••" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nouveau mot de passe" placeholder="••••••••••••" />
                    <Field label="Confirmer le nouveau" placeholder="••••••••••••" />
                  </div>
                </div>

                <button className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white w-full sm:w-auto">
                  <Shield className="h-4 w-4" />
                  Mettre à jour le mot de passe
                </button>
              </div>

              {/* Notifications */}
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100">
                      <Bell className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Préférences de notification</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Décidez ce que vous voulez recevoir.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {notifications.length} réglages
                  </div>
                </div>

                <div className="space-y-3">
                  {notifications.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="max-w-md">
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent focus:outline-none ${
                          item.enabled ? "bg-slate-900" : "bg-slate-200"
                        }`}
                        role="switch"
                        aria-checked={item.enabled}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 ${
                            item.enabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Global Preferences */}
              <div className="rounded-[28px] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compte étudiant</p>
                      <h3 className="text-xl font-bold">Préférences globales</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    Vous pourrez ensuite ajouter ici la langue de l’interface, le fuseau horaire, les préférences d’accessibilité ou la gestion des sessions actives.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-900">
                      Enregistrer les paramètres
                    </button>
                    <button className="flex items-center gap-2 rounded-2xl bg-white/10 px-6 py-3 text-sm font-bold text-white">
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </button>
                  </div>
                </div>
                {/* Subtle background glow */}
                <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/5" />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
      <input
        type="password"
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none"
      />
    </div>
  );
}
