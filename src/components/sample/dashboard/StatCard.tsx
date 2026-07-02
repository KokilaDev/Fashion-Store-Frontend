import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Card, CardContent } from "../ui/card"

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  hint,
}: {
  label: string
  value: string
  delta?: string
  trend?: "up" | "down"
  icon: LucideIcon
  hint?: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
          <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
            <Icon className="size-4.5" />
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            {value}
          </span>
          <div className="flex items-center gap-2">
            {delta ? (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-medium",
                  trend === "up" ? "text-emerald-600" : "text-destructive"
                )}
              >
                {trend === "up" ? (
                  <ArrowUpRight className="size-3.5" />
                ) : (
                  <ArrowDownRight className="size-3.5" />
                )}
                {delta}
              </span>
            ) : null}
            {hint ? (
              <span className="text-xs text-muted-foreground">{hint}</span>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
