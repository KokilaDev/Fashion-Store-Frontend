import { cn } from "../../../lib/utils"
import type { OrderStatus } from "../../../types/Order"

const styles: Record<OrderStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
  Shipped: "bg-sky-500/10 text-sky-600 ring-sky-500/20",
  Delivered: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
  Cancelled: "bg-destructive/10 text-destructive ring-destructive/20",
}

export function StatusBadge({ shippingStatus }: { shippingStatus: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[shippingStatus]
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {shippingStatus}
    </span>
  )
}
