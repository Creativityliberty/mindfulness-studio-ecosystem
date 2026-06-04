import React from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  BarChart3, 
  Award, 
  History, 
  Bell, 
  MessageSquare, 
  Settings, 
  LifeBuoy, 
  LogOut,
  ChevronRight
} from "lucide-react";

export function Sidebar({ activeItem, onNavigate }: { activeItem?: string; onNavigate?: (item: string) => void }) {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-6 py-8">
      <div className="mb-10 flex items-center gap-4 px-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-lg shadow-slate-900/20">
          NL
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-900">Nümtema</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Learning Hub</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        <SidebarItem 
          icon={<LayoutDashboard className="h-5 w-5" />} 
          label="Dashboard" 
          active={activeItem === "Dashboard"} 
          onClick={() => onNavigate?.("dashboard")} 
        />
        <SidebarItem 
          icon={<BookOpen className="h-5 w-5" />} 
          label="Catalogue" 
          active={activeItem === "Catalogue"} 
          onClick={() => onNavigate?.("catalog")} 
        />
        <SidebarItem 
          icon={<GraduationCap className="h-5 w-5" />} 
          label="Mes formations" 
          active={activeItem === "Mes formations"} 
          onClick={() => onNavigate?.("dashboard")} 
        />
        <SidebarItem 
          icon={<BarChart3 className="h-5 w-5" />} 
          label="Progression" 
          active={activeItem === "Progression"} 
          onClick={() => onNavigate?.("dashboard")} 
        />
        <SidebarItem 
          icon={<Award className="h-5 w-5" />} 
          label="Certificats" 
          active={activeItem === "Mes certificats"} 
          onClick={() => onNavigate?.("certificates")} 
        />
        <SidebarItem 
          icon={<History className="h-5 w-5" />} 
          label="Historique" 
          active={activeItem === "Historique"} 
          onClick={() => onNavigate?.("payment-history")} 
        />
        <SidebarItem 
          icon={<Bell className="h-5 w-5" />} 
          label="Notifications" 
          active={activeItem === "Notifications"} 
          onClick={() => onNavigate?.("notifications")} 
        />
        <SidebarItem 
          icon={<MessageSquare className="h-5 w-5" />} 
          label="Messages" 
          active={activeItem === "Messages"} 
          onClick={() => onNavigate?.("messaging")} 
        />
      </nav>

      <div className="mt-8 border-t border-slate-100 pt-8">
        <p className="mb-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          Support & Réglages
        </p>
        <div className="space-y-1.5">
          <SidebarItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Paramètres" 
            active={activeItem === "Paramètres"} 
            onClick={() => onNavigate?.("profile")} 
          />
          <SidebarItem 
            icon={<LifeBuoy className="h-5 w-5" />} 
            label="Support" 
            active={activeItem === "Support"} 
            onClick={() => onNavigate?.("support")} 
          />
        </div>
      </div>

      <div className="mt-auto pt-10">
        <div 
          onClick={() => onNavigate?.("profile")}
          className="group relative flex items-center gap-4 rounded-[24px] border border-slate-100 bg-slate-50/50 p-4 cursor-pointer"
        >
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
              L
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate font-bold text-slate-900">Lionel</p>
            <p className="text-xs font-medium text-slate-500">Étudiant Premium</p>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </div>
        
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-600">
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ 
  label, 
  icon, 
  active = false, 
  onClick 
}: { 
  label: string; 
  icon: React.ReactNode; 
  active?: boolean; 
  onClick?: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left ${
        active
          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
          : "text-slate-500"
      }`}
    >
      <div className={`${active ? "text-white" : "text-slate-400"}`}>
        {icon}
      </div>
      <span className="text-sm font-bold tracking-tight">{label}</span>
      {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />}
    </button>
  );
}
