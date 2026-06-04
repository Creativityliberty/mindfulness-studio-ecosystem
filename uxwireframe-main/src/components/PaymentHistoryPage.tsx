import { Sidebar } from "./Sidebar";
import { 
  FileText, 
  Download, 
  Search, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowLeft
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  amount: string;
  status: "completed" | "pending" | "failed";
  courseTitle: string;
  method: string;
  invoiceUrl: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TRX-982341",
    date: "12 Mars 2024",
    amount: "149.00 €",
    status: "completed",
    courseTitle: "Formation Complète : Devenir Freelance",
    method: "Visa •••• 4242",
    invoiceUrl: "#",
  },
  {
    id: "TRX-982105",
    date: "05 Février 2024",
    amount: "99.00 €",
    status: "completed",
    courseTitle: "Maîtriser la Vente & Négociation",
    method: "PayPal (lionel@example.com)",
    invoiceUrl: "#",
  },
  {
    id: "TRX-981990",
    date: "20 Janvier 2024",
    amount: "199.00 €",
    status: "failed",
    courseTitle: "Copywriting Avancé",
    method: "Mastercard •••• 5555",
    invoiceUrl: "#",
  },
];

export default function PaymentHistoryPage({ 
  onBackToDashboard,
  onNavigate 
}: { 
  onBackToDashboard: () => void;
  onNavigate?: (view: any) => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activeItem="Historique" onNavigate={onNavigate} />

        <main className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-5xl">
            {/* Breadcrumbs */}
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <button 
                onClick={onBackToDashboard}
                className="flex items-center gap-1 text-slate-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </button>
              <span>/</span>
              <span className="text-slate-900 font-medium">Historique des paiements</span>
            </div>

            {/* Header */}
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Historique des paiements</h1>
                <p className="mt-1 text-slate-500">Consultez vos transactions et téléchargez vos factures.</p>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher une facture..." 
                  className="rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Stats Summary */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total investi</p>
                <p className="mt-2 text-2xl font-bold">248.00 €</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Formations actives</p>
                <p className="mt-2 text-2xl font-bold">2</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dernière facture</p>
                <p className="mt-2 text-2xl font-bold">12 Mars 2024</p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Transaction</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Formation</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Montant</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Statut</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Facture</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockTransactions.map((trx) => (
                      <tr key={trx.id} className="group bg-white">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold">{trx.id}</p>
                              <p className="text-xs text-slate-500">{trx.method}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-medium text-slate-700 line-clamp-1 max-w-[200px]">
                            {trx.courseTitle}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            {trx.date}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm font-bold">
                          {trx.amount}
                        </td>
                        <td className="px-6 py-5">
                          {trx.status === "completed" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                              <CheckCircle2 className="h-3 w-3" />
                              Réussi
                            </span>
                          )}
                          {trx.status === "pending" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                              <Clock className="h-3 w-3" />
                              En attente
                            </span>
                          )}
                          {trx.status === "failed" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 ring-1 ring-rose-200">
                              <AlertCircle className="h-3 w-3" />
                              Échoué
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            disabled={trx.status !== "completed"}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-10 rounded-[32px] bg-slate-900 p-8 text-white">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Besoin d'une facture spécifique ?</h3>
                    <p className="mt-1 text-slate-400">
                      Si vous avez besoin de modifier vos informations de facturation ou si vous avez une question sur un paiement.
                    </p>
                  </div>
                </div>
                <button className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-900">
                  Contacter le support
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
