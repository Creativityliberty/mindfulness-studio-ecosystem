import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  User, 
  CheckCheck,
  Clock,
  MessageSquare,
  Paperclip,
  Smile
} from "lucide-react";

export default function MessagingPage({ 
  onNavigate 
}: { 
  onNavigate?: (view: any) => void;
}) {
  const [activeConv, setActiveConv] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Formateur — Copywriting",
      lastMessage: "Bonne question, regarde la leçon 3 👍",
      time: "10:24",
      unread: true,
      avatar: "FC",
      online: true
    },
    {
      id: 2,
      name: "Support Technique",
      lastMessage: "Votre problème a été résolu",
      time: "Hier",
      unread: false,
      avatar: "ST",
      online: false
    },
    {
      id: 3,
      name: "Communauté SEO",
      lastMessage: "Quel outil utilisez-vous ?",
      time: "2j",
      unread: false,
      avatar: "CS",
      online: true
    },
  ];

  const [messages, setMessages] = useState([
    { from: "them", text: "Salut ! Tu as une question ?", time: "10:15" },
    { from: "me", text: "Oui, sur la structure d’offre", time: "10:18" },
    { from: "them", text: "Regarde la leçon 2 et 3, c’est détaillé", time: "10:20" },
    { from: "me", text: "D'accord, je vais regarder ça tout de suite. Merci !", time: "10:22" },
    { from: "them", text: "Bonne question, regarde la leçon 3 👍", time: "10:24" },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages([...messages, { from: "me", text: newMessage, time }]);
    setNewMessage("");
  };

  const currentConv = conversations.find(c => c.id === activeConv);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeItem="Messages" onNavigate={onNavigate} />

        {/* MESSAGING LAYOUT */}
        <div className="flex flex-1 overflow-hidden">
          {/* CONVERSATIONS LIST */}
          <aside className="flex w-80 flex-col border-r border-slate-200 bg-white">
            <div className="p-6">
              <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="w-full rounded-xl border border-slate-100 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-6">
              <div className="space-y-1">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConv(conv.id)}
                    className={`group w-full rounded-2xl p-4 text-left ${
                      activeConv === conv.id 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${
                          activeConv === conv.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                        }`}>
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="truncate text-sm font-bold">{conv.name}</span>
                          <span className={`text-[10px] font-medium ${activeConv === conv.id ? "text-white/60" : "text-slate-400"}`}>
                            {conv.time}
                          </span>
                        </div>
                        <p className={`mt-1 truncate text-xs ${activeConv === conv.id ? "text-white/70" : "text-slate-500"}`}>
                          {conv.lastMessage}
                        </p>
                      </div>
                      {conv.unread && activeConv !== conv.id && (
                        <div className="h-2 w-2 rounded-full bg-slate-900" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* CHAT AREA */}
          <main className="flex flex-1 flex-col bg-slate-50">
            {/* Chat Header */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                  {currentConv?.avatar}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{currentConv?.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${currentConv?.online ? "bg-emerald-500" : "bg-slate-300"}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {currentConv?.online ? "En ligne" : "Hors ligne"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-xl p-2.5 text-slate-400">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="rounded-xl p-2.5 text-slate-400">
                  <Video className="h-5 w-5" />
                </button>
                <button className="rounded-xl p-2.5 text-slate-400">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </header>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex justify-center">
                <span className="rounded-full bg-slate-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Aujourd'hui
                </span>
              </div>

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] space-y-1`}>
                    <div
                      className={`rounded-[24px] px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                        msg.from === "me"
                          ? "bg-slate-900 text-white rounded-tr-none"
                          : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold text-slate-400 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                      <Clock className="h-3 w-3" />
                      {msg.time}
                      {msg.from === "me" && <CheckCheck className="h-3 w-3 text-emerald-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-2 pl-4">
                <button className="text-slate-400">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Écrire un message..."
                  className="flex-1 bg-transparent py-2 text-sm font-medium outline-none placeholder:text-slate-400"
                />
                <button className="text-slate-400">
                  <Smile className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
