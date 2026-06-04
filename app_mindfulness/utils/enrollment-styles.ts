export const ENROLLMENT_STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  active: "bg-green-500/10 text-green-600 border border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border border-red-500/20",
};

export const PAYMENT_STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  paid: "bg-green-500/10 text-green-600 border border-green-500/20",
  failed: "bg-red-500/10 text-red-600 border border-red-500/20",
  refunded: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
};
