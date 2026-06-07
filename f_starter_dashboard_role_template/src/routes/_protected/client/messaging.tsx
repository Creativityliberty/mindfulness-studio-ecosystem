import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  CheckCheck,
  Clock,
  MessageSquare,
  Paperclip,
  Smile
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_protected/client/messaging')({
  component: StudentMessagingPage,
})

interface Conversation {
  id: number
  name: string
  lastMessage: string
  time: string
  unread: boolean
  avatar: string
  online: boolean
}

interface Message {
  from: 'me' | 'them'
  text: string
  time: string
}

function StudentMessagingPage() {
  const [activeConv, setActiveConv] = React.useState(1)
  const [newMessage, setNewMessage] = React.useState('')

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Fabienne — Formations & Énergie",
      lastMessage: "Bonjour ! Prends le temps d'intégrer le soin énergétique d'aujourd'hui.",
      time: "10:24",
      unread: true,
      avatar: "FD",
      online: true
    },
    {
      id: 2,
      name: "Support Technique",
      lastMessage: "Votre accès au cours a bien été débloqué.",
      time: "Hier",
      unread: false,
      avatar: "ST",
      online: false
    },
    {
      id: 3,
      name: "Salon d'Échange Harmonieux",
      lastMessage: "Quel pendule conseillez-vous pour débuter ?",
      time: "2j",
      unread: false,
      avatar: "SE",
      online: true
    },
  ]

  const [messages, setMessages] = React.useState<Message[]>([
    { from: 'them', text: "Bienvenue dans votre espace d'échange avec Fabienne. Comment se passe votre initiation au LaHoChi ?", time: "10:15" },
    { from: 'me', text: "Bonjour ! C'est absolument magique, j'ai ressenti énormément de chaleur dans mes mains.", time: "10:18" },
    { from: 'them', text: "C'est tout à fait normal, l'énergie circule intensément lors des premières séances.", time: "10:20" },
    { from: 'me', text: "Est-ce que je peux pratiquer le soin sur mes proches dès maintenant ?", time: "10:22" },
    { from: 'them', text: "Bonjour ! Prends le temps d'intégrer le soin énergétique d'aujourd'hui.", time: "10:24" },
  ])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
    setMessages([...messages, { from: 'me', text: newMessage, time }])
    setNewMessage('')
  }

  const currentConv = conversations.find(c => c.id === activeConv)

  return (
    <div className="container mx-auto p-4 md:p-6 h-[85vh] flex flex-col">
      {/* Header */}
      <div className="pb-4 shrink-0 flex items-center justify-between border-b border-primary/10">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Messagerie Privée
          </h1>
          <p className="text-xs text-muted-foreground">
            Échangez en direct avec Fabienne et la communauté de l'Académie.
          </p>
        </div>
      </div>

      {/* Main chat UI */}
      <div className="flex-1 flex overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-md mt-6">
        
        {/* Left Side: Conversations */}
        <aside className="w-80 flex flex-col border-r border-slate-100 shrink-0">
          <div className="p-4 border-b border-slate-50">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher une discussion..." 
                className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                className={`w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all ${
                  activeConv === conv.id 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${
                    activeConv === conv.id ? "bg-white/20 text-white" : "bg-accent/10 text-primary"
                  }`}>
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-xs font-bold">{conv.name}</span>
                    <span className={`text-[9px] ${activeConv === conv.id ? "text-white/60" : "text-slate-400"}`}>
                      {conv.time}
                    </span>
                  </div>
                  <p className={`mt-0.5 truncate text-[10px] ${activeConv === conv.id ? "text-white/70" : "text-slate-500"}`}>
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread && activeConv !== conv.id && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Right Side: Chat Window */}
        <main className="flex-1 flex flex-col bg-slate-50/50">
          
          {/* Chat Header */}
          <header className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-3.5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-primary font-bold text-xs">
                {currentConv?.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">{currentConv?.name}</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${currentConv?.online ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    {currentConv?.online ? "En ligne" : "Hors ligne"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            <div className="flex justify-center mb-2">
              <span className="bg-slate-200/50 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Aujourd'hui
              </span>
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[75%] space-y-1">
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed shadow-sm ${
                      msg.from === 'me'
                        ? 'bg-slate-900 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-1 text-[9px] text-slate-400 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <Clock className="h-3 w-3" />
                    {msg.time}
                    {msg.from === 'me' && <CheckCheck className="h-3 w-3 text-emerald-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="border-t border-slate-100 bg-white p-4 shrink-0">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 p-1.5 pl-3">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 shrink-0">
                <Paperclip className="h-4.5 w-4.5" />
              </Button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Écrire un message à Fabienne..."
                className="flex-1 bg-transparent py-1.5 text-xs md:text-sm outline-none placeholder:text-slate-400 text-slate-800"
              />
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 shrink-0">
                <Smile className="h-4.5 w-4.5" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                className="h-8 w-8 rounded-lg bg-slate-900 text-white shadow-sm flex items-center justify-center shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
