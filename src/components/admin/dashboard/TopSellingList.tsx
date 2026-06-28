import React from "react"

import { currency, topSelling } from "../../../lib/data"

export function TopSellingList() {
  const max = Math.max(...topSelling.map((p) => p.units))

  return (
    <ul className="flex flex-col gap-1">
      {topSelling.map((item, index) => (
        <li
          key={item.name}
          className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted/60"
        >
          <span className="w-4 text-sm font-medium text-muted-foreground tabular-nums">
            {index + 1}
          </span>
          <div className="relative size-11 shrink-0 overflow-hidden rounded-md bg-muted">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium">{item.name}</span>
              <span className="shrink-0 text-sm font-medium tabular-nums">
                {currency(item.revenue)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(item.units / max) * 100}%` }}
                />
              </div>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {item.units} sold
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
